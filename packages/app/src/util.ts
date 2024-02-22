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
