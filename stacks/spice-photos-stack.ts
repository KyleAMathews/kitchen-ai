import { StackContext, Bucket, Api, Config } from "sst/constructs"

export function SpiceJarPhotos({ stack }: StackContext) {
  const OPENAI_KEY_SECRET = new Config.Secret(stack, `OPENAI_KEY`)

  const ingredientBucket = new Bucket(stack, `SpiceJarPhotosBucket`, {
    notifications: {
      newSpicePhotos: {
        function: {
          handler: `packages/functions/src/new-spice-jar-photo.main`,
          bind: [OPENAI_KEY_SECRET],
        },
        events: [`object_created`],
      },
    },
  })

  // Allow the notification functions to access the bucket
  ingredientBucket.attachPermissions([ingredientBucket])

  const recipesPhotoBucket = new Bucket(stack, `RecipesPhotoBucket`, {
    notifications: {
      newSpicePhotos: {
        function: {
          handler: `packages/functions/src/new-recipe-photo.main`,
          bind: [OPENAI_KEY_SECRET],
        },
        events: [`object_created`],
      },
    },
  })

  // Allow the notification functions to access the bucket
  recipesPhotoBucket.attachPermissions([recipesPhotoBucket])

  const api = new Api(stack, `api`, {
    routes: {
      "GET /": `packages/functions/src/lambda.handler`,
      "POST /recipes": {
        function: {
          handler: `packages/functions/src/recipes.handler`,
          timeout: 120,
        },
      },
      "POST /ingredients": {
        function: {
          handler: `packages/functions/src/create-ingredient.handler`,
          timeout: 125,
        },
      },
      "POST /create-embedding": {
        function: {
          handler: `packages/functions/src/create-embedding.handler`,
          timeout: 125,
        },
      },
    },
  })
  api.bind([ingredientBucket, recipesPhotoBucket])
  api.bindToRoute(`POST /recipes`, [OPENAI_KEY_SECRET])
  api.bindToRoute(`POST /ingredients`, [OPENAI_KEY_SECRET])
  api.bindToRoute(`POST /create-embedding`, [OPENAI_KEY_SECRET])

  stack.addOutputs({
    ApiEndpoint: api.url,
    SpiceJarPhotosBucket: ingredientBucket.bucketName,
    RecipesPhotoBucket: recipesPhotoBucket.bucketName,
  })
}