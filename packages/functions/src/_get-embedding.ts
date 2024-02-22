import OpenAI from "openai"
import { Config } from "sst/node/config"

const openai = new OpenAI({ apiKey: Config.OPENAI_KEY })

export async function getEmbedding(text) {
  const result = await openai.embeddings.create({
    input: text,
    model: `text-embedding-3-small`,
    dimensions: 256,
  })

  return result.data[0].embedding
}
