import OpenAI from "openai"

// Centralized lazy initialization of OpenAI client to avoid issues during build/prerender
let openai: OpenAI | null = null

export function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY
    if (!apiKey) {
      throw new Error(
        `OpenAI API key is required. Please set OPENAI_API_KEY or OPENAI_KEY environment variable.`
      )
    }
    openai = new OpenAI({ apiKey })
  }
  return openai
}
