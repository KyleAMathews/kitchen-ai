import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { chromium } from "playwright"
import pg from "pg"
import fc from "fast-check"
const url = `http://127.0.0.1:4196`
const database = new pg.Client({
  connectionString: `postgresql://postgres@127.0.0.1:55480/kitchen_endpoints`,
})
const browser = await chromium.launch({ headless: true, channel: `chrome` })
const context = await browser.newContext()
const page = await context.newPage()
const errors = []
const requests = []
page.on(`request`, (request) => {
  if (request.url().includes(`_serverFn`) && request.method() === `POST`)
    requests.push({
      url: request.url(),
      body: request.postData(),
      headers: request.headers(),
    })
})
page.on(`pageerror`, (error) => errors.push(error.message))
try {
  await database.connect()
  const signup = await context.request.post(url + `/api/auth/sign-up/email`, {
    data: {
      name: `Endpoint Test`,
      email: randomUUID() + `@example.test`,
      password: randomUUID(),
    },
    headers: { Origin: url },
  })
  assert.equal(signup.status(), 200, (await signup.text()).slice(0, 500))
  const user = (await signup.json()).user
  const ingredient = randomUUID(),
    recipe = randomUUID(),
    otherIngredient = randomUUID()
  await database.query(
    `INSERT INTO users(id,name,email,email_verified,created_at,updated_at) VALUES ('endpoint-other','Other','other@example.test',false,now(),now()) ON CONFLICT DO NOTHING`
  )
  await database.query(
    `INSERT INTO ingredients(id,name,description,embedding,grocery_section,expiration_date,user_id,tracking_type,count) VALUES ($1,'Oracle Flour','Test','[]','Pantry',now()+interval '1 year',$2,'count',1),($3,'Other Flour','Test','[]','Pantry',now()+interval '1 year','endpoint-other','count',1)`,
    [ingredient, user.id, otherIngredient]
  )
  await database.query(
    `INSERT INTO recipes(id,name,description,url,user_id) VALUES ($1,'Oracle Bread','Test','',$2)`,
    [recipe, user.id]
  )
  await page.goto(url)
  await page
    .getByRole(`button`, { name: `Sign out` })
    .waitFor({ timeout: 30000 })
  console.log(
    JSON.stringify({
      stage: `loaded`,
      errors,
      modules: await page.evaluate(() =>
        performance
          .getEntriesByType(`resource`)
          .map((e) => e.name)
          .filter((name) => name.includes(`/src/lib/collections.ts`))
      ),
    })
  )
  const result = await page.evaluate(
    async ({ ingredient }) => {
      const { getKitchen } = await import(
          performance
            .getEntriesByType(`resource`)
            .map((e) => e.name)
            .find((name) => name.includes(`/src/lib/collections.ts`)) ??
            `/src/lib/collections.ts`
        ),
        k = getKitchen()
      await Promise.all(
        Object.entries(k)
          .filter(([name]) => name.endsWith(`Collection`))
          .map(([, c]) => c.preload())
      )
      const tx = k.saveIngredient({ id: ingredient, data: { count: 2 } })
      const optimistic = k.ingredientsCollection.get(ingredient).count
      await tx.isPersisted.promise
      return {
        optimistic,
        synced: k.ingredientsCollection.get(ingredient).count,
      }
    },
    { ingredient }
  )
  assert.deepEqual(result, { optimistic: 2, synced: 2 })
  assert.equal(
    (
      await database.query(`SELECT count FROM ingredients WHERE id=$1`, [
        ingredient,
      ])
    ).rows[0].count,
    2
  )
  const tables = {
    usersCollection: `users`,
    ingredientsCollection: `ingredients`,
    recipesCollection: `recipes`,
    recipeIngredientsCollection: `recipe_ingredients`,
    recipeCommentsCollection: `recipe_comments`,
    tagsCollection: `tags`,
    recipeTagsCollection: `recipe_tags`,
    ingredientTagsCollection: `ingredient_tags`,
  }
  let comparisons = 0
  async function assertAllCollections() {
    const actual = await page.evaluate(async () => {
      const k = (
        await import(
          performance
            .getEntriesByType(`resource`)
            .map((e) => e.name)
            .find((name) => name.includes(`/src/lib/collections.ts`)) ??
            `/src/lib/collections.ts`
        )
      ).getKitchen()
      return Object.fromEntries(
        Object.entries(k)
          .filter(
            ([name]) =>
              name.endsWith(`Collection`) && name !== `recipeCardsCollection`
          )
          .map(([name, c]) => [
            name,
            [...c.values()]
              .map((row) =>
                Object.fromEntries(
                  Object.entries(row).filter(([key]) => !key.startsWith(`$`))
                )
              )
              .sort((a, b) => a.id.localeCompare(b.id)),
          ])
      )
    })
    for (const [name, table] of Object.entries(tables)) {
      const expected = (
        await database.query(`SELECT * FROM ${table}`)
      ).rows.sort((a, b) => a.id.localeCompare(b.id))
      assert.deepEqual(
        JSON.parse(JSON.stringify(actual[name])),
        JSON.parse(JSON.stringify(expected)),
        name
      )
      comparisons++
    }
  }
  await assertAllCollections()
  const tag = randomUUID(),
    link = randomUUID(),
    comment = randomUUID()
  await page.evaluate(
    async ({ ingredient, tag, link, user }) => {
      const k = (
          await import(
            performance
              .getEntriesByType(`resource`)
              .map((e) => e.name)
              .find((name) => name.includes(`/src/lib/collections.ts`)) ??
              `/src/lib/collections.ts`
          )
        ).getKitchen(),
        now = new Date()
      const tx = k.changeTagAssignmentsAction({
        target: { entity: `ingredient`, entity_id: ingredient },
        new_tags: [{ id: tag, name: tag, user_id: user, created_at: now }],
        links: [{ id: link, tag_id: tag, created_at: now }],
        removed_link_ids: [],
      })
      if (!k.tagsCollection.has(tag) || !k.ingredientTagsCollection.has(link))
        throw Error(`Multi-collection optimism missing`)
      await tx.isPersisted.promise
    },
    { ingredient, tag, link, user: user.id }
  )
  await assertAllCollections()
  await page.evaluate(
    async ({ recipe, comment, user }) => {
      const k = (
          await import(
            performance
              .getEntriesByType(`resource`)
              .map((e) => e.name)
              .find((name) => name.includes(`/src/lib/collections.ts`)) ??
              `/src/lib/collections.ts`
          )
        ).getKitchen(),
        now = new Date()
      const tx = k.insertComment({
        id: comment,
        recipe_id: recipe,
        user_id: user,
        made_it: true,
        rating: 4,
        comment: `Test comment`,
        created_at: now,
        updated_at: now,
      })
      if (!k.recipeCommentsCollection.has(comment))
        throw Error(`Optimistic comment missing`)
      await tx.isPersisted.promise
    },
    { recipe, comment, user: user.id }
  )
  await assertAllCollections()
  const rejection = await page.evaluate(async (id) => {
    const k = (
      await import(
        performance
          .getEntriesByType(`resource`)
          .map((e) => e.name)
          .find((name) => name.includes(`/src/lib/collections.ts`)) ??
          `/src/lib/collections.ts`
      )
    ).getKitchen()
    const tx = k.saveIngredient({ id, data: { count: 99 } })
    if (k.ingredientsCollection.get(id).count !== 99)
      throw Error(`Optimistic rejected update missing`)
    try {
      await tx.isPersisted.promise
      return false
    } catch {
      return true
    }
  }, otherIngredient)
  assert.equal(rejection, true)
  await assertAllCollections()
  await page.evaluate(async (id) => {
    const k = (
      await import(
        performance
          .getEntriesByType(`resource`)
          .map((e) => e.name)
          .find((name) => name.includes(`/src/lib/collections.ts`)) ??
          `/src/lib/collections.ts`
      )
    ).getKitchen()
    const a = k.saveIngredient({ id, data: { count: 4 } }),
      b = k.saveIngredient({ id, data: { count: 5 } })
    await Promise.all([a.isPersisted.promise, b.isPersisted.promise])
  }, ingredient)
  await assertAllCollections()
  await page.evaluate(async (id) => {
    const k = (
      await import(
        performance
          .getEntriesByType(`resource`)
          .map((e) => e.name)
          .find((name) => name.includes(`/src/lib/collections.ts`)) ??
          `/src/lib/collections.ts`
      )
    ).getKitchen()
    await k.deleteRecipe(id).isPersisted.promise
  }, recipe)
  await assertAllCollections()
  assert.equal(
    (
      await database.query(
        `SELECT count(*)::int AS n FROM recipe_comments WHERE recipe_id=$1`,
        [recipe]
      )
    ).rows[0].n,
    0
  )
  const histories = fc.sample(
    fc.array(fc.integer({ min: 0, max: 20 }), { minLength: 4, maxLength: 8 }),
    { seed: 20260912, numRuns: 3 }
  )
  for (const history of histories) {
    for (const count of history) {
      await page.evaluate(
        async ({ id, count }) => {
          const k = (
            await import(
              performance
                .getEntriesByType(`resource`)
                .map((e) => e.name)
                .find((name) => name.includes(`/src/lib/collections.ts`)) ??
                `/src/lib/collections.ts`
            )
          ).getKitchen()
          const tx = k.saveIngredient({ id, data: { count } })
          if (k.ingredientsCollection.get(id).count !== count)
            throw Error(`Optimistic count mismatch`)
          await tx.isPersisted.promise
        },
        { id: ingredient, count }
      )
      await assertAllCollections()
    }
  }
  const mutationRequest = requests.at(-1)
  assert.ok(mutationRequest)
  const anonymous = await browser.newContext()
  try {
    const response = await anonymous.request.post(mutationRequest.url, {
      data: mutationRequest.body,
      headers: Object.fromEntries(
        Object.entries(mutationRequest.headers).filter(
          ([name]) => name.toLowerCase() !== `cookie`
        )
      ),
    })
    assert.match(await response.text(), /Unauthorized/)
  } finally {
    await anonymous.close()
  }
  await assertAllCollections()
  assert.deepEqual(errors, [])
  console.log(
    JSON.stringify({
      comparisons,
      requests: requests.length,
      seed: 20260912,
      histories,
      anonymousRejected: true,
    })
  )
  console.log(
    JSON.stringify({ ok: true, result, ingredient, recipe, otherIngredient })
  )
  await page.screenshot({
    path: `/tmp/kitchen-endpoints-smoke.png`,
    fullPage: true,
  })
} finally {
  await browser.close()
  await database.end()
}
