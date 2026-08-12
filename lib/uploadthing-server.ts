import { UTApi } from "uploadthing/server"

/** Shared server-side UploadThing client — instantiate once and reuse */
export const utapi = new UTApi()

/** UploadThing URLs look like https://<app-id>.ufs.sh/f/<FILE_KEY> */
export function extractFileKey(url?: string | null) {
  if (!url) return undefined
  const match = url.match(/\/f\/([^/?]+)/)
  return match?.[1]
}
