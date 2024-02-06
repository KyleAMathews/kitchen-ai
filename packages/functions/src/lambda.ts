import { ApiHandler } from "sst/node/api"
import crypto from "crypto"
import { Bucket } from "sst/node/bucket"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const handler = ApiHandler(async (_evt) => {
  const fileName = _evt.queryStringParameters?.fileName || ``
  const contentType = _evt.queryStringParameters?.contentType || ``
  const command = new PutObjectCommand({
    ACL: `public-read`,
    Key: fileName + `---` + crypto.randomUUID(),
    ContentType: contentType,
    Bucket: Bucket.SpiceJarPhotosBucket.bucketName,
  })

  const url = await getSignedUrl(new S3Client({}), command)
  return {
    statusCode: 200,
    body: url,
  }
})
