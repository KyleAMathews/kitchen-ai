import React, { useState } from "react"
import { Button, Flex } from "@radix-ui/themes"
import { useElectric } from "./context"
import { genUUID } from "electric-sql/util"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

function FileUploadToS3({
  buttonVariant = `surface`,
  children = `Add Another Photo`,
  bucket = ``,
  navigateTo = ``,
}) {
  const {
    user: { id: user_id },
  } = useUser()
  const navigate = useNavigate()

  const { db } = useElectric()!
  const [uploadStatus, setUploadStatus] = useState(``)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      setUploadStatus(`No file selected.`)
      return
    }

    console.log(file)
    setUploading(true)
    const uuid = genUUID()

    const start = new Date()
    try {
      console.log({
        data: {
          id: uuid,
          user_id,
          created_at: start,
          state: `uploading`,
        },
      })
      const newUpload = await db.ingredients_photo_uploads.create({
        data: {
          id: uuid,
          user_id,
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
        `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com?bucket=${bucket}&fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}&uuid=${encodeURIComponent(uuid)}`
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

        setUploading(false)

        if (navigateTo.length > 0) {
          navigate(navigateTo)
        }
      } else {
        throw new Error(`Failed to get a signed URL.`)
        setUploading(false)
      }
    } catch (error) {
      setUploading(false)
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
      setUploading(false)
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
          disabled={uploading}
          variant={buttonVariant}
          onClick={() => document.getElementById(`fileInput`)?.click()}
        >
          {children}
        </Button>
      </div>
      <div className="capsize-3">{uploadStatus}</div>
    </Flex>
  )
}

export default FileUploadToS3
