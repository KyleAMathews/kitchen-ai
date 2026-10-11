import { ServiceError } from "./context.server"

function getDateString(date?: Date) {
  const targetDate = date || new Date()
  const year = targetDate.getFullYear()
  const month = (targetDate.getMonth() + 1).toString().padStart(2, `0`)
  const day = targetDate.getDate().toString().padStart(2, `0`)
  return `Shopping ${year}/${month}/${day}`
}

type TrelloCard = { id: string; name: string; desc: string }
type TrelloChecklist = { id: string; name: string }

async function findRecentShoppingCard(listId: string) {
  const cards = await makeTrelloRequest<TrelloCard[]>({
    url: `https://api.trello.com/1/lists/${listId}/cards`,
  })

  const today = new Date()
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Filter cards that match the Shopping YYYY/MM/DD pattern from the last week
  const shoppingCardPattern = /^Shopping \d{4}\/\d{2}\/\d{2}$/
  const recentShoppingCards = cards
    .filter((card: TrelloCard) => shoppingCardPattern.test(card.name))
    .filter((card: TrelloCard) => {
      // Extract date from card name
      const dateMatch = card.name.match(/(\d{4})\/(\d{2})\/(\d{2})/)
      if (!dateMatch) return false

      const [, year, month, day] = dateMatch
      const cardDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      )

      return cardDate >= oneWeekAgo && cardDate <= today
    })
    .sort((a: TrelloCard, b: TrelloCard) => b.name.localeCompare(a.name)) // Sort by date descending (most recent first)

  return recentShoppingCards[0]
}

const makeTrelloRequest = async <T = unknown>({
  url,
  method = `GET`,
  body = null,
  queryParams = {},
}: {
  url: string
  method?: string
  body?: unknown
  queryParams?: Record<string, unknown>
}) => {
  const trelloKey = process.env.TRELLO_KEY
  const trelloToken = process.env.TRELLO_TOKEN

  if (!trelloKey || !trelloToken) {
    throw new ServiceError({
      code: `INTERNAL_SERVER_ERROR`,
      message: `Trello credentials not configured`,
    })
  }

  const params = new URLSearchParams({
    key: trelloKey,
    token: trelloToken,
    ...queryParams,
  })

  const options = {
    method,
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`,
    },
    body: body ? JSON.stringify(body) : null,
  }

  const fullUrl = `${url}?${params.toString()}`
  const response = await fetch(fullUrl, options)

  if (!response.ok) {
    throw new ServiceError({
      code: `INTERNAL_SERVER_ERROR`,
      message: `Trello API error: ${response.status}`,
    })
  }

  return response.json() as Promise<T>
}

const findCardByName = async (listId: string, cardName: string) => {
  const cards = await makeTrelloRequest<TrelloCard[]>({
    url: `https://api.trello.com/1/lists/${listId}/cards`,
    queryParams: {
      fields: [`name`, `id`, `desc`],
    },
  })
  return cards.find((card: TrelloCard) => card.name === cardName)
}

const createCard = async (listId: string, cardName: string, url?: string) => {
  return makeTrelloRequest<TrelloCard>({
    url: `https://api.trello.com/1/cards`,
    method: `POST`,
    queryParams: {
      name: cardName,
      desc: url ? `- ${url}` : ``,
      idList: listId,
    },
  })
}

const updateCard = async (cardId: string, updates: Record<string, unknown>) => {
  return makeTrelloRequest<TrelloCard>({
    url: `https://api.trello.com/1/cards/${cardId}`,
    method: `PUT`,
    queryParams: {
      ...updates,
    },
  })
}

const findChecklistOnCard = async (cardId: string, checklistTitle: string) => {
  const checklists = await makeTrelloRequest<TrelloChecklist[]>({
    url: `https://api.trello.com/1/cards/${cardId}/checklists`,
  })
  return checklists.find((checklist) => checklist.name === checklistTitle)
}

const createChecklist = async (cardId: string, checklistTitle: string) => {
  return makeTrelloRequest<TrelloChecklist>({
    url: `https://api.trello.com/1/checklists`,
    method: `POST`,
    queryParams: {
      idCard: cardId,
      name: checklistTitle,
    },
  })
}

const updateChecklistItems = async (checklistId: string, items: string[]) => {
  await Promise.all(
    items.map((item) =>
      makeTrelloRequest({
        url: `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
        method: `POST`,
        queryParams: {
          name: item,
          checked: `false`,
        },
      })
    )
  )
}

type CardDetails = {
  cardName: string
  url?: string
  checklists: Record<string, string[]>
}

const createOrUpdateCardWithChecklists = async (
  listId: string,
  cardDetails: CardDetails
) => {
  const { cardName, url, checklists } = cardDetails

  // First, check if there's a card with today's date
  let card = await findCardByName(listId, cardName)

  // If no card for today, check for a recent shopping card from the last week
  if (!card) {
    card = await findRecentShoppingCard(listId)

    // If we found a recent card, we'll use it
    if (card && url) {
      card = await updateCard(card.id, { desc: card.desc + `\n- ${url}` })
    }
  } else if (url) {
    // Card exists for today, just update it
    card = await updateCard(card.id, { desc: card.desc + `\n- ${url}` })
  }

  // If still no card (no card today and no recent cards), create a new one
  if (!card) {
    card = await createCard(listId, cardName, url)
  }

  for (const [checklistTitle, items] of Object.entries(checklists)) {
    const title = checklistTitle.replace(`__`, ` `).replace(`_`, `/`)
    let checklist = await findChecklistOnCard(card.id, title)
    if (!checklist) {
      checklist = await createChecklist(card.id, title)
    }

    await updateChecklistItems(checklist.id, items)
  }

  return card
}

export async function addShoppingCard(input: {
  url?: string
  checklists: Record<string, string[]>
}) {
  const listId = process.env.TRELLO_LIST_ID || `5c01a492714a091d514fde21`
  return createOrUpdateCardWithChecklists(listId, {
    cardName: getDateString(),
    url: input.url,
    checklists: input.checklists,
  })
}
