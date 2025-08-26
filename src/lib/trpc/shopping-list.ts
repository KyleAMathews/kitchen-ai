import { router, authedProcedure } from "@/lib/trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

function getDateString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, `0`)
  const day = today.getDate().toString().padStart(2, `0`)
  return `Shopping ${year}/${month}/${day}`
}

const cardSchema = z.object({
  cardName: z.string().min(10).startsWith(`Shopping`).default(getDateString()),
  url: z.string().optional(),
  checklists: z.record(z.string(), z.array(z.string().min(3))),
})

const makeTrelloRequest = async ({
  url,
  method = `GET`,
  body = null,
  queryParams = {},
}: {
  url: string
  method?: string
  body?: any
  queryParams?: Record<string, any>
}) => {
  const trelloKey = process.env.TRELLO_KEY
  const trelloToken = process.env.TRELLO_TOKEN

  if (!trelloKey || !trelloToken) {
    throw new TRPCError({
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
    throw new TRPCError({
      code: `INTERNAL_SERVER_ERROR`,
      message: `Trello API error: ${response.status}`,
    })
  }

  return response.json()
}

const findCardByName = async (listId: string, cardName: string) => {
  const cards = await makeTrelloRequest({
    url: `https://api.trello.com/1/lists/${listId}/cards`,
    queryParams: {
      fields: [`name`, `id`, `desc`],
    },
  })
  return cards.find((card: any) => card.name === cardName)
}

const createCard = async (listId: string, cardName: string, url?: string) => {
  await makeTrelloRequest({
    url: `https://api.trello.com/1/cards`,
    method: `POST`,
    queryParams: {
      name: cardName,
      desc: url ? `- ${url}` : ``,
      idList: listId,
    },
  })

  let card = null
  while (card === null) {
    card = await findCardByName(listId, cardName)
    if (card) {
      return card
    } else {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 250))
    }
  }
}

const updateCard = async (cardId: string, updates: any) => {
  return makeTrelloRequest({
    url: `https://api.trello.com/1/cards/${cardId}`,
    method: `PUT`,
    queryParams: {
      ...updates,
    },
  })
}

const findChecklistOnCard = async (cardId: string, checklistTitle: string) => {
  const checklists = await makeTrelloRequest({
    url: `https://api.trello.com/1/cards/${cardId}/checklists`,
  })
  return checklists.find((checklist: any) => checklist.name === checklistTitle)
}

const createChecklist = async (cardId: string, checklistTitle: string) => {
  await makeTrelloRequest({
    url: `https://api.trello.com/1/checklists`,
    method: `POST`,
    queryParams: {
      idCard: cardId,
      name: checklistTitle,
    },
  })

  let checklist = null
  while (checklist === null) {
    checklist = await findChecklistOnCard(cardId, checklistTitle)
    if (checklist) {
      return checklist
    } else {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 250))
    }
  }
}

const updateChecklistItems = async (checklistId: string, items: string[]) => {
  for (const item of items) {
    await makeTrelloRequest({
      url: `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
      method: `POST`,
      queryParams: {
        name: item,
        checked: `false`,
      },
    })
  }
}

const createOrUpdateCardWithChecklists = async (
  listId: string,
  cardDetails: z.infer<typeof cardSchema>
) => {
  const { cardName, url, checklists } = cardDetails

  let card = await findCardByName(listId, cardName)
  if (!card) {
    card = await createCard(listId, cardName, url)
  } else if (url) {
    card = await updateCard(card.id, { desc: card.desc + `\n- ${url}` })
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

export const shoppingListRouter = router({
  addToShoppingList: authedProcedure
    .input(
      z.object({
        recipeName: z.string(),
        url: z.string().optional(),
        checklists: z.record(z.string(), z.array(z.string())),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const listId = process.env.TRELLO_LIST_ID || `5c01a492714a091d514fde21`

      const cardDetails = {
        cardName: getDateString(),
        url: input.url,
        checklists: input.checklists,
      }

      try {
        const card = await createOrUpdateCardWithChecklists(listId, cardDetails)
        return {
          success: true,
          cardId: card.id,
          cardName: card.name,
        }
      } catch (error) {
        console.error(`Error creating shopping list:`, error)
        throw new TRPCError({
          code: `INTERNAL_SERVER_ERROR`,
          message: `Failed to create shopping list`,
        })
      }
    }),
})
