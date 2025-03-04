import {
  createRouter,
  createRoute,
  createRootRoute,
  Link,
  Outlet,
} from '@tanstack/react-router'
import Root from './routes/root'
import Index from './routes/index'
import Review from './routes/review'
import AddIngredients from './routes/add-ingredients'
import Recipes from './routes/recipes'
import RecipesNew from './routes/recipe-new'
import IngredientDetail from './routes/ingredient-detail'
import RecipeDetail from './routes/recipe-detail'
import IngredientsList from './routes/ingredients'
import AuthedLayout from './authed-layout'
import ErrorPage from './error-page'
import { preloadShape } from '@electric-sql/react'
import { shapeConfigs } from './hooks/use-shapes'

// Create a root route
const rootRoute = createRootRoute({
  component: Root,
  errorComponent: ErrorPage,
  notFoundComponent: () => {
    return (
      <div style={{ padding: 20 }}>
        <h2>Page Not Found</h2>
        <p>Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/">Return Home</Link>
      </div>
    )
  },
})

// Create an authenticated layout route
const authedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authed',
  component: Root,
  errorComponent: ErrorPage,
})

// Create the index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || undefined,
    }
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    // Preload the shapes we need
    await Promise.all([
      preloadShape(shapeConfigs.recipes),
      preloadShape(shapeConfigs.ingredients),
      preloadShape(shapeConfigs.photos),
    ])
    return { q }
  },
})

// Create other routes
const ingredientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ingredients',
  component: IngredientsList,
  loader: () => {
    return preloadShape(shapeConfigs.ingredients)
  }
})

const uploadPhotosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload-photos',
  component: AddIngredients,
})

const reviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/review',
  component: Review,
})

const recipesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipes',
  component: Recipes,
  loader: () => {
    return preloadShape(shapeConfigs.recipes)
  }
})

const recipesNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipes/new',
  component: RecipesNew,
  loader: () => {
    return preloadShape(shapeConfigs.recipes)
  }
})

const ingredientDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ingredients/$id',
  component: IngredientDetail,
  loader: () => {
    return preloadShape(shapeConfigs.ingredients)
  }
})

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipes/$id',
  component: RecipeDetail,
  loader: () => {
    return preloadShape(shapeConfigs.recipes)
  }
})

// Create the router configuration
const routeTree = rootRoute.addChildren([
  indexRoute,
  ingredientsRoute,
  uploadPhotosRoute,
  reviewRoute,
  recipesRoute,
  recipesNewRoute,
  ingredientDetailRoute,
  recipeDetailRoute,
])

// Create and export the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => (
    <div style={{ padding: 20 }}>Loading...</div>
  ),
  defaultErrorComponent: ErrorPage,
})

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
