import React, { useState } from "react"
import { Button, Flex } from "@radix-ui/themes"
import { useElectric } from "./context"
import { genUUID } from "electric-sql/util"

function FileUploadToS3() {
  const { db } = useElectric()!
  const [uploadStatus, setUploadStatus] = useState(``)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      setUploadStatus(`No file selected.`)
      return
    }

    console.log(file)
    const uuid = genUUID()

    const start = new Date()
    try {
      const newUpload = await db.ingredients_photo_uploads.create({
        data: {
          id: uuid,
          created_at: start,
          state: `uploading`,
        },
      })
      console.log({ newUpload })
    } catch (e) {
      console.log(`failed to insert new photo upload`, e)
      throw e
    }

    // Fetch the signed URL from your server
    // Replace `your-backend-endpoint` with your actual endpoint that returns the signed URL
    try {
      const response = await fetch(
        `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}&uuid=${encodeURIComponent(uuid)}`
      )
      const url = await response.text()
      console.log({ url })

      if (url) {
        await uploadFileToS3(file, url)
        db.ingredients_photo_uploads.update({
          data: {
            upload_duration_sec:
              (new Date().getTime() - start.getTime()) / 1000,
          },
          where: {
            id: uuid,
          },
        })
      } else {
        throw new Error(`Failed to get a signed URL.`)
      }
    } catch (error) {
      setUploadStatus(`Upload error: ${error.message}`)
    }
  }

  const uploadFileToS3 = async (file, signedUrl) => {
    try {
      const options = {
        method: `PUT`,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
        body: file,
      }

      const response = await fetch(signedUrl, options)

      if (!response.ok) {
        throw new Error(`Upload failed.`)
      }
    } catch (error) {
      setUploadStatus(`Upload error: ${error.message}`)
    }
  }

  return (
    <Flex direction="column" gap="3">
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: `none` }}
        id="fileInput"
      />
      <div>
        <Button
          variant="surface"
          onClick={() => document.getElementById(`fileInput`)?.click()}
        >
          Add Another Photo
        </Button>
      </div>
      <div className="capsize-3">{uploadStatus}</div>
    </Flex>
  )
}

export default FileUploadToS3
