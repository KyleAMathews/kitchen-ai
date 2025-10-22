import { router, authedProcedure } from "@/lib/trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { db } from "@/db/connection"
import { ingredients } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

function getDateString(date?: Date) {
  const targetDate = date || new Date()
  const year = targetDate.getFullYear()
  const month = (targetDate.getMonth() + 1).toString().padStart(2, `0`)
  const day = targetDate.getDate().toString().padStart(2, `0`)
  return `Shopping ${year}/${month}/${day}`
}

async function findRecentShoppingCard(listId: string) {
  const cards = await makeTrelloRequest<
    { id: string; name: string; desc: string }[]
  >({
    url: `https://api.trello.com/1/lists/${listId}/cards`,
  })

  const today = new Date()
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Filter cards that match the Shopping YYYY/MM/DD pattern from the last week
  const shoppingCardPattern = /^Shopping \d{4}\/\d{2}\/\d{2}$/
  const recentShoppingCards = cards
    .filter((card) => shoppingCardPattern.test(card.name))
    .filter((card) => {
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
    .sort((a, b) => b.name.localeCompare(a.name)) // Sort by date descending (most recent first)

  return recentShoppingCards.length > 0 ? recentShoppingCards[0] : null
}

const makeTrelloRequest = async ({
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
  return cards.find(
    (card: unknown) => (card as { name: string }).name === cardName
  )
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

const updateCard = async (cardId: string, updates: Record<string, unknown>) => {
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
  return checklists.find(
    (checklist: unknown) =>
      (checklist as { name: string }).name === checklistTitle
  )
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

export const shoppingListRouter = router({
  addToShoppingList: authedProcedure
    .input(
      z.object({
        recipeName: z.string(),
        url: z.string().optional(),
        checklists: z.record(z.string(), z.array(z.string())),
        ingredientIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, _ctx }) => {
      const listId = process.env.TRELLO_LIST_ID || `5c01a492714a091d514fde21`

      const cardDetails = {
        cardName: getDateString(),
        url: input.url,
        checklists: input.checklists,
      }

      try {
        const card = await createOrUpdateCardWithChecklists(listId, cardDetails)

        // Track ingredient additions by incrementing trello_add_count (fire-and-forget)
        if (input.ingredientIds && input.ingredientIds.length > 0) {
          // Increment counter for each ingredient atomically
          // Don't await - this is best effort tracking
          Promise.all(
            input.ingredientIds.map((ingredientId) =>
              db
                .update(ingredients)
                .set({
                  trello_add_count: sql`${ingredients.trello_add_count} + 1`,
                })
                .where(eq(ingredients.id, ingredientId))
            )
          ).catch((err) => {
            // Log but don't fail the request if tracking fails
            console.error(`Failed to update ingredient tracking:`, err)
          })
        }

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
