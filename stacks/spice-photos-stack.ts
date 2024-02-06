import { StackContext, Bucket, Api, Config } from "sst/constructs";

export function SpiceJarPhotos({ stack }: StackContext) {
  const OPENAI_KEY_SECRET = new Config.Secret(stack, `OPENAI_KEY`);

  const bucket = new Bucket(stack, "SpiceJarPhotosBucket", {
    notifications: {
      newSpicePhotos: {
        function: {
          handler: "packages/functions/src/new-spice-jar-photo.main",
          bind: [OPENAI_KEY_SECRET],
        },
        events: ["object_created"],
      },
    },
  });

  // Allow the notification functions to access the bucket
  bucket.attachPermissions([bucket]);

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });
  api.bind([bucket]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    SpiceJarPhotosBucket: bucket.bucketName,
  });
}
