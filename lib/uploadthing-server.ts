import { UTApi } from "uploadthing/server"

export const utapi = new UTApi()

export function extractFileKey(url?: string | null) {
  if (!url) return undefined
  const match = url.match(/\/f\/([^/?]+)/)
  return match?.[1]
}
