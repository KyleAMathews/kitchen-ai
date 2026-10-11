import { createOpenaiChat, createOpenaiEmbedding } from "@tanstack/ai-openai"

export const KITCHEN_AI_MODEL = `gpt-6-luna` as const

function getOpenAIApiKey() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY

  if (!apiKey) {
    throw new Error(
      `Kitchen AI requires OPENAI_API_KEY (or the legacy OPENAI_KEY alias).`
    )
  }

  return apiKey
}

export function getKitchenAIAdapter() {
  return createOpenaiChat(KITCHEN_AI_MODEL, getOpenAIApiKey())
}

export function getIngredientEmbeddingAdapter() {
  return createOpenaiEmbedding(`text-embedding-3-small`, getOpenAIApiKey())
}
