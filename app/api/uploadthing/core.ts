import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

import { extractFileKey, utapi } from "@/lib/uploadthing-server"
import { currentUser } from "@/hooks/currentUser"
import prisma from "@/lib/prisma"

const f = createUploadthing()

export const ourFileRouter = {
  avatarUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // Runs on the server before the upload starts — this is where auth lives.
    // Throwing here rejects the upload before any bytes are sent.
    .middleware(async () => {
      const sessionUser = await currentUser()
      if (!sessionUser?.id) {
        throw new UploadThingError("Unauthorized")
      }

      // Look up the current avatar so the old file can be deleted after the swap
      const user = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        select: { image: true },
      })

      return {
        userId: sessionUser.id,
        previousImageKey: extractFileKey(user?.image),
      }
    })
    // Runs on the server after the file finishes uploading to storage.
    // This is the "database functionality" — it's the source of truth,
    // not the client, so the avatar is saved even if the browser tab closes.
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { image: file.ufsUrl },
      })

      // Best-effort cleanup so old avatars don't pile up in storage
      if (metadata.previousImageKey) {
        await utapi.deleteFiles(metadata.previousImageKey).catch(() => {})
      }

      // Returned here is sent back to the client's onClientUploadComplete
      return { avatarUrl: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
