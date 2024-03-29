import { StackContext, Bucket, Api, Config } from "sst/constructs"

export function SpiceJarPhotos({ stack }: StackContext) {
  const OPENAI_KEY_SECRET = new Config.Secret(stack, `OPENAI_KEY`)
  const TRELLO_TOKEN = new Config.Secret(stack, `TRELLO_TOKEN`)
  const TRELLO_KEY = new Config.Secret(stack, `TRELLO_KEY`)
  const CONNECTION_STRING = new Config.Secret(stack, `CONNECTION_STRING`)

  const ingredientBucket = new Bucket(stack, `SpiceJarPhotosBucket`, {
    notifications: {
      newSpicePhotos: {
        function: {
          handler: `packages/functions/src/new-spice-jar-photo.main`,
          bind: [OPENAI_KEY_SECRET, CONNECTION_STRING],
          timeout: 600,
        },
        events: [`object_created`],
      },
    },
  })

  // Allow the notification functions to access the bucket
  ingredientBucket.attachPermissions([ingredientBucket])

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
      "POST /create-shopping-list": {
        function: {
          handler: `packages/functions/src/create-shopping-list.handler`,
          timeout: 125,
        },
      },
    },
  })
  api.bind([ingredientBucket, CONNECTION_STRING])
  api.bindToRoute(`POST /recipes`, [OPENAI_KEY_SECRET])
  api.bindToRoute(`POST /ingredients`, [OPENAI_KEY_SECRET])
  api.bindToRoute(`POST /create-shopping-list`, [TRELLO_KEY, TRELLO_TOKEN])

  stack.addOutputs({
    ApiEndpoint: api.url,
    SpiceJarPhotosBucket: ingredientBucket.bucketName,
  })
}
