import {
  avg,
  count,
  createLiveQueryCollection,
  eq,
  isNull,
  max,
  not,
} from "@tanstack/react-db"
import { recipeCommentsCollection, recipesCollection } from "@/lib/collections"

/**
 * Shared recipe-card data. Keeping the aggregates here means every recipe list
 * uses one live query rather than asking each card to subscribe to comments.
 */
export const recipeCardsCollection = createLiveQueryCollection({
  id: `recipe-cards`,
  query: (q) => {
    const madeStats = q
      .from({ comment: recipeCommentsCollection })
      .where(({ comment }) => eq(comment.made_it, true))
      .groupBy(({ comment }) => comment.recipe_id)
      .select(({ comment }) => ({
        recipe_id: comment.recipe_id,
        times_made: count(comment.id),
        last_made_at: max(comment.created_at),
      }))

    const ratingStats = q
      .from({ comment: recipeCommentsCollection })
      .where(({ comment }) => not(isNull(comment.rating)))
      .groupBy(({ comment }) => comment.recipe_id)
      .select(({ comment }) => ({
        recipe_id: comment.recipe_id,
        rating_count: count(comment.rating),
        avg_rating: avg(comment.rating),
      }))

    return q
      .from({ recipe: recipesCollection })
      .leftJoin({ made: madeStats }, ({ recipe, made }) =>
        eq(recipe.id, made.recipe_id)
      )
      .leftJoin({ ratings: ratingStats }, ({ recipe, ratings }) =>
        eq(recipe.id, ratings.recipe_id)
      )
      .select(({ recipe, made, ratings }) => ({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        url: recipe.url,
        user_id: recipe.user_id,
        created_at: recipe.created_at,
        updated_at: recipe.updated_at,
        times_made: made?.times_made,
        last_made_at: made?.last_made_at,
        rating_count: ratings?.rating_count,
        avg_rating: ratings?.avg_rating,
      }))
      .orderBy(({ $selected }) => $selected.last_made_at, {
        direction: `desc`,
        nulls: `last`,
      })
      .orderBy(({ $selected }) => $selected.times_made, `desc`)
  },
})
