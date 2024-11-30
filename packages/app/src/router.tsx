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
import { Electric } from './generated/client'
import { electricSqlLoader } from 'electric-query'

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <Outlet />
  ),
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
// const authedRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   id: 'authed',
//   component: Root,
//   errorComponent: ErrorPage,
// })

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
    const key = '/' + (q ? `?q=${q}` : '')
    console.log({ key })
    // await electricSqlLoader<Electric>({
    //   key,
    //   shapes: ({ db }) => [
    //     {
    //       shape: db.ingredients_photo_uploads.sync({
    //         include: { ingredients: true, users: true },
    //       }),
    //       isReady: async () =>
    //         !!(await db.rawQuery({
    //           sql: `select id from ingredients_photo_uploads limit 1`,
    //         })),
    //     },
    //     {
    //       shape: db.recipes.sync({
    //         include: { recipe_ingredients: true, users: true },
    //       }),
    //       isReady: async () =>
    //         !!(await db.rawQuery({
    //           sql: `select id from recipes limit 1`,
    //         })),
    //     },
    //   ],
    //   queries:
    //     ({ db }) =>
    //       () =>
    //         Index.queries({
    //           db,
    //           search: q ?? undefined,
    //         }),
    // })
    return null
  },
})

// Create other routes
const ingredientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ingredients',
  component: IngredientsList,
  loader: async ({ location }) => {
    const key = location.pathname + location.search
    console.log({ key })
    // await electricSqlLoader<Electric>({
    //   key,
    //   shapes: ({ db }) => [
    //     {
    //       shape: db.ingredients.sync({
    //         include: { ingredients_photo_uploads: true },
    //       }),
    //       isReady: async () =>
    //         !!(await db.rawQuery({
    //           sql: `select id from ingredients limit 1`,
    //         })),
    //     },
    //   ],
    // })
    return null
  },
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
})

const recipesNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipes/new',
  component: RecipesNew,
})

const ingredientDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ingredients/$id',
  component: IngredientDetail,
})

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipes/$id',
  component: RecipeDetail,
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
