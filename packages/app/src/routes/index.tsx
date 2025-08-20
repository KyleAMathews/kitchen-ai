import * as React from "react"
import {
  Link,
  useSearch,
  useLocation,
  useNavigate,
} from "@tanstack/react-router"
import measuringCupImg from "../../static/bowl.png"
import { useLiveQuery } from "@tanstack/react-db"
// import threeSpices from "../../static/3-spices.jpg"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  Button,
  Separator,
  TextField,
} from "@radix-ui/themes"
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  ArrowRightIcon,
  CameraIcon,
} from "@radix-ui/react-icons"
import {
  ingredientsCollection,
  photoUploadsCollection,
  recipesCollection,
} from "../hooks/use-shapes"
import FileUploadToS3 from "../upload-to-s3"
import RecipeCard from "../components/recipe-card"
import IngredientCard from "../components/ingredient-card"

function IngredientsView({
  ingredients_needing_review,
  ingredientsCount,
  ingredients,
  photos,
  search,
  isSearching,
}) {
  console.log({ ingredients, ingredientsCount })
  return (
    <Flex direction="column" gap={isSearching ? `3` : `6`}>
      <Flex direction="column" gap="4">
        <Heading size={isSearching ? `3` : `5`}>
          <Link
            to="/ingredients"
            style={{ color: `inherit`, textDecoration: `none` }}
          >
            Ingredients{!isSearching && ` (${ingredientsCount})`}
            {` `}
          </Link>
          {!isSearching && (
            <Link
              to="/upload-photos"
              style={{
                height: 20,
                display: `inline-block`,
                position: `relative`,
                top: 3,
                left: 4,
                color: `inherit`,
                textDecoration: `none`,
              }}
            >
              <CameraIcon height="20" width="20" />
            </Link>
          )}
        </Heading>
        {photos && photos.length > 0 && (
          <Button variant="soft">
            <Link
              to="/review"
              style={{ textDecoration: `none`, color: `inherit` }}
            >
              Review{` `}
              {ingredients_needing_review.length}
              {` `}
              new ingredients{` `}
              <ArrowRightIcon
                width="16"
                height="16"
                style={{ position: `relative`, top: 1 }}
              />
            </Link>
          </Button>
        )}
      </Flex>

      {isSearching &&
        (ingredients.length > 0 ? (
          <Flex direction="column" gap="4">
            {ingredients.map((ingredient, i: number) => {
              if (ingredient.is_reviewed) {
                return (
                  <React.Fragment key={ingredient.id}>
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                    {i !== ingredients.length - 1 && (
                      <Separator
                        key={ingredient.id + `-seperator`}
                        orientation="horizontal"
                        size="4"
                      />
                    )}
                  </React.Fragment>
                )
              }
            })}
          </Flex>
        ) : (
          <Text color="gray">No results</Text>
        ))}
      {!isSearching && (
        <Link to="/ingredients">
          See all <ArrowRightIcon />
        </Link>
      )}
    </Flex>
  )
}

function BlankSlate() {
  return (
    <Flex
      direction="column"
      gap="6"
      justify="center"
      align="center"
      style={{ textAlign: `center` }}
      height="100%"
    >
      <img src={measuringCupImg} width={212} />
      <Heading style={{ maxWidth: 264 }}>
        Add ingredients to your kitchen
      </Heading>
      <Text>
        Take a photo of some ingredients
        <br /> to get started!
      </Text>
      <FileUploadToS3
        bucket="ingredient"
        buttonVariant="soft"
        navigateTo="/upload-photos"
      >
        Add Photo
      </FileUploadToS3>
    </Flex>
  )
}

const queries = ({ db, search }: { db: Electric[`db`]; search: string }) => {
  const queryStr = `${search || ``}`
  return {
    photos: db.ingredients_photo_uploads.liveMany({
      where: {
        state: {
          equals: `reviewing`,
        },
      },
    }),
    ingredients_needing_review: db.ingredients.liveMany({
      select: { id: true },
      where: {
        is_reviewed: false,
      },
    }),
    ingredientsCount: db.liveRawQuery({
      sql: `SELECT count(*) as count from ingredients where is_reviewed = true`,
    }),
    // ingredients: db.liveRawQuery({
    // sql: `SELECT * from ingredients
    // WHERE name LIKE ?
    // ORDER BY name COLLATE NOCASE asc
    // LIMIT 3
    // `,
    // args: [queryStr],
    // }),
    ingredients: db.ingredients.liveMany({
      where: {
        name: {
          contains: queryStr,
        },
      },
      orderBy: {
        name: `desc`,
      },
      take: search !== null && search.length > 0 ? 3 : 0,
    }),
    recipesCount: db.liveRawQuery({
      sql: `SELECT count(*) as count from recipes`,
    }),
    recipes: db.recipes.liveMany({
      where: {
        OR: [
          {
            name: {
              contains: queryStr,
            },
          },
          {
            description: {
              contains: queryStr,
            },
          },
        ],
      },
      orderBy: {
        updated_at: `desc`,
      },
      take: 3,
    }),
  }
}

Index.queries = queries

export default function Index() {
  // const { db } = useElectric()!
  const location = useLocation()
  const navigate = useNavigate()
  const search = useSearch({ from: `/` })
  console.log({ search })

  const { data: photos } = useLiveQuery((q) =>
    q.from({ photoUploadsCollection }).select(`@*`)
  )
  const { data: unfilteredRecipes } = useLiveQuery((q) =>
    q.from({ recipesCollection }).select(`@*`)
  )

  const isSearching = search.q !== undefined && search.q.length > 0

  const { data: recipes } = useLiveQuery(
    (q) =>
      q
        .from({ recipesCollection })
        .where(`@name`, `like`, `%${search.q || ``}%`)
        .select(`@*`),
    [search.q]
  )
  const { data: ingredients } = useLiveQuery(
    (q) =>
      q
        .from({ ingredientsCollection })
        .where(`@name`, `like`, `%${search.q || ``}%`)
        .select(`@*`),
    [search.q]
  )

  const { data: ingredientsCount } = useLiveQuery(
    (q) =>
      q
        .from({ ingredientsCollection })
        .groupBy(null)
        .select({ count: { COUNT: `@id` } }),
    [search.q]
  )

  const countIngredients = ingredientsCollection.size

  return (
    <>
      <Flex direction="column" gap={isSearching ? `5` : `6`}>
        <form>
          <TextField.Root
            placeholder="Search Kitchen"
            type="search"
            autoComplete="false"
            name="q"
            value={search.q || ``}
            onChange={(event) => {
              const formData = new FormData(event.currentTarget.form)
              const updates = Object.fromEntries(formData)
              navigate({ search: () => ({ q: updates.q }) })
            }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </form>
        <Flex direction="column" gap={isSearching ? `5` : `7`}>
          <Flex direction="column" gap={isSearching ? `3` : `6`}>
            <Heading size={isSearching ? `3` : `5`}>
              <Link
                to="/recipes"
                style={{
                  color: `inherit`,
                  textDecoration: `none`,
                  height: 20,
                  display: `inline-block`,
                }}
              >
                Recipes{!isSearching && ` (${recipes.length}) `}
              </Link>
              {!isSearching && (
                <Link
                  to="/recipes/new"
                  style={{
                    height: 20,
                    display: `inline-block`,
                    position: `relative`,
                    top: 3,
                    left: 8,
                    color: `inherit`,
                    textDecoration: `none`,
                  }}
                >
                  <PlusCircledIcon
                    height="20"
                    width="20"
                    style={{ height: 20 }}
                  />
                </Link>
              )}
            </Heading>
            {isSearching || recipes.length > 0 ? (
              <>
                {recipes && recipes.length > 0 ? (
                  <Flex direction="column" gap="4">
                    {recipes.map((recipe, i) => {
                      return (
                        <React.Fragment key={recipe.id}>
                          <RecipeCard key={recipe.id} recipe={recipe} />
                          {recipes.length - 1 !== i && <Separator size="4" />}
                        </React.Fragment>
                      )
                    })}
                  </Flex>
                ) : (
                  <Text color="gray">No results</Text>
                )}
                {!isSearching && (
                  <Link to="/recipes">
                    Browse all <ArrowRightIcon />
                  </Link>
                )}
              </>
            ) : (
              <Text>Add your first recipe!</Text>
            )}
          </Flex>
          <IngredientsView
            isSearching={isSearching}
            ingredientsCount={countIngredients || 0}
            ingredients_needing_review={ingredients}
            ingredients={ingredients}
            photos={photos}
            search={search}
          />
        </Flex>
      </Flex>
    </>
  )
}
