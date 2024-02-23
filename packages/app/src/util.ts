import { Electric, Jobs } from "../generated/client"

// Function to calculate cosine similarity between two embeddings
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error(`Vectors must be of the same length`)
  }
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i]
    normA += Math.pow(vec1[i], 2)
    normB += Math.pow(vec2[i], 2)
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

type FetchFunction = (url: string, options?: any) => Promise<any>
export async function createJob({
  id,
  type,
  target_id = null,
  fetchFn,
  db,
}: {
  id: string
  type: string
  target_id?: string | null
  fetchFn: FetchFunction
  db: Electric[`db`]
}) {
  const job = await db.jobs.create({
    data: {
      id,
      type,
      state: `working`,
      target_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  // Start fetch and then update job when done.
  fetchFn()
    .then(async (res) => {
      if (!response.ok) {
        return db.jobs.update({
          data: {
            updated_at: new Date(),
            state: `error`,
            error: { error: `Network response was not ok` },
          },
          where: {
            id: job.id,
          },
        })
      }

      const data = await res.json()

      return db.jobs.update({
        data: {
          updated_at: new Date(),
          state: `done`,
          result: data,
        },
        where: {
          id: job.id,
        },
      })
    })
    .catch((error) => {
      return db.jobs.update({
        data: {
          updated_at: new Date(),
          state: `error`,
          error,
        },
        where: {
          id: job.id,
        },
      })
    })
}
