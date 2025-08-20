import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

// Only add locale if it hasn't been added yet
try {
  TimeAgo.addDefaultLocale(en)
} catch (error) {
  // Locale already added, ignore
}

// Create formatter (English).
export const timeAgo = new TimeAgo(`en-US`)

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

// Helper functions for ingredient status
export function isRunningLow(ingredient: any): boolean {
  // Pantry staples are never running low
  if (ingredient.tracking_type === `pantry_staple`) {
    return false
  }

  return ingredient.tracking_type === `fill_level`
    ? ingredient.fill_level < 33
    : ingredient.count < 2
}

export function isExpiredSoon(ingredient: any): boolean {
  // Pantry staples never expire
  if (ingredient.tracking_type === `pantry_staple`) {
    return false
  }

  const expiredDate = new Date(ingredient.expiration_date)
  const oneMonthFromNow = new Date()
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)
  return oneMonthFromNow > expiredDate
}
