import {
  useLocation,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import * as React from "react"
import measuringCupImg from "../../static/measuring-cup.png"
import threeSpices from "../../static/3-spices.jpg"
import {
  Electric,
  Ingredients,
  Ingredients_photo_uploads,
} from "../generated/client"
import { useElectricData } from "electric-query"
import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Separator,
  Slider,
  Badge,
  TextField,
  Container,
} from "@radix-ui/themes"
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  PlusIcon,
  ArrowRightIcon,
  CaretRightIcon,
} from "@radix-ui/react-icons"
import { useLiveQuery } from "electric-sql/react"
import { useElectric } from "../context"
import FileUploadToS3 from "../upload-to-s3"

const queries = ({ db, search }: { db: Electric[`db`]; search: string }) => {
  const queryStr = `%${search || ``}%`
  console.log(`insie`, { search, queryStr })
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
    ingredients: db.liveRawQuery({
      sql: `SELECT * from ingredients
      WHERE name LIKE ?
      ORDER BY name COLLATE NOCASE asc`,
      args: [queryStr],
    }),
  }
}

Index.queries = queries

function BlankSlate() {
  return (
    <Flex
      direction="column"
      gap="6"
      pt="8"
      justify="center"
      align="center"
      style={{ textAlign: `center` }}
      height="100%"
    >
      <img src={measuringCupImg} width={64} height={64} />
      <Heading style={{ maxWidth: 264 }}>
        ADD INGREDIENTS TO YOUR KITCHEN
      </Heading>
      <Text>Take a photo of some ingredients to get started!</Text>
      <Flex direction="column" gap="2" style={{ textAlign: `left` }}>
        <Text color="gray">Example:</Text>
        <img src={threeSpices} height={196} />
      </Flex>
      <FileUploadToS3 buttonVariant="solid" navigateTo="/upload-photos">
        <PlusIcon />
        {` `}Add Photo
      </FileUploadToS3>
    </Flex>
  )
}

export default function Index() {
  const { db } = useElectric()!
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearchParams] = useSearchParams()
  const q = new URLSearchParams(search).get(`q`)

  const {
    photos,
    ingredients,
    ingredients_needing_review,
  }: { ingredients: Ingredients[]; photos: Ingredients_photo_uploads[] } =
    useElectricData(location.pathname + location.search)

  console.log({ ingredients, search })

  return (
    <>
      {ingredients.length === 0 ? (
        <BlankSlate />
      ) : (
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="4">
            <Heading>
              Ingredients{` `}
              <Link to="/upload-photos">
                <PlusCircledIcon />
              </Link>
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

          <form>
            <TextField.Root>
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search ingredients"
                type="search"
                autoComplete="false"
                name="q"
                value={q || ``}
                onChange={(event) => {
                  const formData = new FormData(event.currentTarget.form)
                  const updates = Object.fromEntries(formData)
                  setSearchParams({ q: updates.q }, { replace: true })
                }}
              />
            </TextField.Root>
          </form>

          <Flex direction="column" gap="5">
            {ingredients.map((ingredient, i: number) => {
              // Get expired date string
              const expiredDate = new Date(ingredient.fill_date)
              expiredDate.setMonth(
                expiredDate.getMonth() + ingredient.shelf_life_months
              )
              const expireDateStr = expiredDate
                .toLocaleDateString(`en-US`, {
                  year: `2-digit`,
                  month: `short`,
                })
                .split(` `)
                .join(` ’`)

              // See if expire date is less than 2 months away
              const threeMonthsFromNow = new Date() // Copy current date to a new variable
              threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
              const isExpired = threeMonthsFromNow > expiredDate

              if (ingredient.is_reviewed) {
                return (
                  <React.Fragment key={ingredient.id}>
                    <Flex
                      key={ingredient.id}
                      gap="5"
                      style={{ cursor: `pointer` }}
                      onClick={() => {
                        navigate(`/ingredient/${ingredient.id}`)
                      }}
                    >
                      <Flex gap="2" direction="column">
                        <Text>{ingredient.name}</Text>
                        <Text size="1" color="gray">
                          Exp: {expireDateStr}
                        </Text>
                      </Flex>
                      <Flex>
                        <Slider
                          className="no-thumb"
                          orientation="vertical"
                          value={[ingredient.fill_level]}
                        />
                      </Flex>
                      {ingredient.fill_level < 33 && (
                        <Badge color="crimson" variant="solid">
                          Running Low
                        </Badge>
                      )}
                      {isExpired && (
                        <Badge color="crimson" variant="solid">
                          Replace soon
                        </Badge>
                      )}
                      <Flex align="center" ml="auto">
                        <CaretRightIcon height="20" width="20" />
                      </Flex>
                    </Flex>
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
        </Flex>
      )}
    </>
  )
}
