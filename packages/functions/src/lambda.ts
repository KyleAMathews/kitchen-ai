import { ApiHandler } from "sst/node/api"
import crypto from "crypto"
import { Bucket } from "sst/node/bucket"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const handler = ApiHandler(async (_evt) => {
  const fileName = _evt.queryStringParameters?.fileName || ``
  const contentType = _evt.queryStringParameters?.contentType || ``
  const uuid = _evt.queryStringParameters?.uuid
  const bucket = _evt.queryStringParameters?.bucket
  const command = new PutObjectCommand({
    ACL: `public-read`,
    Key: fileName + `---` + uuid,
    ContentType: contentType,
    Bucket:
      bucket === `ingredient`
        ? Bucket.SpiceJarPhotosBucket.bucketName
        : Bucket.RecipesPhotoBucket.bucketName,
  })

  const url = await getSignedUrl(new S3Client({}), command)
  return {
    statusCode: 200,
    body: url,
  }
})
