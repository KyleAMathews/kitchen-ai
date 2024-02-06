import React, { useState } from "react"
import { Button, Flex } from "@radix-ui/themes"
import { useElectric } from "./context"

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
    // Fetch the signed URL from your server
    // Replace `your-backend-endpoint` with your actual endpoint that returns the signed URL
    try {
      const response = await fetch(
        `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      )
      const url = await response.text()
      console.log({ url })

      if (url) {
        const uuid = new URL(url).pathname.split(`---`)[1]
        const start = new Date()
        db.spice_jar_photos_upload.create({
          data: {
            id: uuid,
            created_at: start,
          },
        })
        await uploadFileToS3(file, url)
        db.spice_jar_photos_upload.update({
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
