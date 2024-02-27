import { APIGatewayProxyHandler } from "aws-lambda"
import { Config } from "sst/node/config"
import fetch from "node-fetch"
import { z } from "zod"

// Helper function to make API requests
const makeTrelloRequest = async ({
  url,
  method = `GET`,
  body = null,
  queryParams = {},
}) => {
  // Combine the API key and token with any additional query parameters
  const params = new URLSearchParams({
    key: Config.TRELLO_KEY,
    token: Config.TRELLO_TOKEN,
    ...queryParams, // Spread any additional query parameters into the search params
  })

  const options = {
    method,
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`,
    },
    body: body ? JSON.stringify(body) : null,
  }
  // Append the query parameters to the URL
  const fullUrl = `${url}?${params.toString()}`

  console.log(fullUrl)
  const response = await fetch(`${fullUrl}`, options)
  if (!response.ok) {
    console.log(response)
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

// Find a card by name within a specific board
const findCardByName = async (listId, cardName) => {
  const cards = await makeTrelloRequest({
    url: `https://api.trello.com/1/lists/${listId}/cards`,
    queryParams: {
      fields: [`name`, `id`, `desc`],
    },
  })
  return cards.find((card) => card.name === cardName)
}

// Create a new card
const createCard = async (listId, cardName, url) => {
  return makeTrelloRequest({
    url: `https://api.trello.com/1/cards`,
    method: `POST`,
    queryParams: {
      name: cardName,
      desc: `- ${url}`,
      idList: listId,
    },
  })
}

const updateCard = async (cardId, updates) => {
  return makeTrelloRequest({
    url: `https://api.trello.com/1/cards/${cardId}`,
    method: `PUT`,
    queryParams: {
      ...updates,
    },
  })
}

// Find a checklist on a card
const findChecklistOnCard = async (cardId, checklistTitle) => {
  const checklists = await makeTrelloRequest({
    url: `https://api.trello.com/1/cards/${cardId}/checklists`,
  })
  return checklists.find((checklist) => checklist.name === checklistTitle)
}

// Create a checklist on a card
const createChecklist = async (cardId, checklistTitle) => {
  return makeTrelloRequest({
    url: `https://api.trello.com/1/checklists`,
    method: `POST`,
    queryParams: {
      idCard: cardId,
      name: checklistTitle,
    },
  })
}

// Update checklist items
const updateChecklistItems = async (checklistId, items) => {
  for (const item of items) {
    makeTrelloRequest({
      url: `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
      method: `POST`,
      queryParams: {
        name: item,
        checked: `false`,
      },
    })
  }
}

// Main function to create or update card with checklists
const createOrUpdateCardWithChecklists = async (listId, cardDetails) => {
  const { cardName, url, checklists } = cardDetails

  let card = await findCardByName(listId, cardName)
  if (!card) {
    card = await createCard(listId, cardName, url)
  } else {
    card = await updateCard(card.id, { desc: card.desc + `\n- ${url}` })
  }

  for (const [checklistTitle, items] of Object.entries(checklists)) {
    let checklist = await findChecklistOnCard(card.id, checklistTitle)
    if (!checklist) {
      checklist = await createChecklist(card.id, checklistTitle)
    } else {
      // Optionally, clear existing items here if needed
    }
    await updateChecklistItems(checklist.id, items)
  }
}

const cardSchema = z.object({
  cardName: z.string().min(10).startsWith(`Shopping`),
  url: z.string().min(1),
  checklists: z.record(z.string(), z.array(z.string().min(3))),
})

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log(event.body)
    const cardDetails = cardSchema.parse(JSON.parse(event.body))
    console.log(cardDetails)
    await createOrUpdateCardWithChecklists(listId, cardDetails)

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.log(`error`, error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    }
  }
}

// Example usage
const listId = `5c01a492714a091d514fde21`
const boardId = `g2FLZ6pd`
const cardDetails = {
  cardName: `Shopping Feb 26, 2024`,
  description: `
# Recipes

- [Hearty Tuscan Bean Stew](https://www.americastestkitchen.com/recipes/4136-hearty-tuscan-bean-stew)
- [Tomato Rice with Smoked Sausage and Peas](https://www.177milkstreet.com/recipes/tomato-rice-smoked-sausage-peas)
- [Pakistani Chicken Karahi](https://www.177milkstreet.com/recipes/pakistani-chicken-karahi-spicy-tomato-chicken-curry)`,
  checklists: {
    Produce: [
      `1 large onion, chopped medium (about 1 1/2 cups)`,
      `1 poblano chili, stemmed, seeded and chopped`,
      `1 medium yellow onion, chopped`,
      `8 medium garlic cloves, finely grated`,
      `1/4 cup lightly packed fresh mint, chopped`,
      `4 medium garlic cloves, chopped`,
      `1 pound plum tomatoes, halved and grated, cut side down, on the large holes of a box grater, skins discarded`,
      `3 serrano chilies, 2 stemmed, seeded and chopped, 1 sliced into thin rings, reserved separately`,
      `8 medium garlic cloves, peeled and crushed`,
      `Lemon wedges, to serve`,
      `2 medium celery ribs, cut into 1/2-inch pieces (about 3/4 cup)`,
      `2 medium carrots, peeled and cut into 1/2-inch pieces (about 1 cup)`,
      `1 tablespoon finely grated fresh ginger`,
      `1 bunch kale, or collard greens (about 1 pound), stems trimmed and leaves chopped into 1-inch pieces (about 8 cups loosely packed)`,
    ],
    "Canned Foods": [`3 tablespoons tomato paste`, `1 tablespoon tomato paste`],
    "Spices / Herbs": [`1 teaspoon garam masala`],
    Bakery: [
      `8 slices country white bread, each 1 1/4 inches thick, broiled until golden brown on both sides and rubbed with garlic clove (optional)`,
    ],
    "Frozen Foods": [`1 cup frozen peas`],
    "Dry Goods": [
      `1/2 teaspoon white sugar`,
      `1 pound dried cannellini beans (about 2 cups), rinsed and picked over`,
    ],
    "Meat / Seafood": [
      `1½ pounds boneless, skinless, chicken thighs, trimmed and cut into 1- to 2-inch pieces`,
      `6 ounces pancetta, cut into 1/4-inch pieces (see note)`,
      `1 pound kielbasa sausage, sliced ½ inch thick`,
    ],
    "Other Aisles": [`2 tablespoons grapeseed or other neutral oil, divided`],
    "Dairy / Eggs": [`1/4 cup plain whole-milk yogurt`],
  },
}

// createOrUpdateCardWithChecklists(listId, cardDetails).then(() =>
// console.log(`Done`)
// )
