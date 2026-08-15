"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isAPIError } from "better-auth/api"
import { getAuthUser, renderError } from "@/actions/utilsActions"
import { extractFileKey, utapi } from "@/lib/uploadthing-server"

export const renderAuthError = async (error: unknown) => {
  const errorMessage =
    isAPIError(error) || error instanceof Error
      ? error.message
      : "there was an error"
  return { success: false, message: errorMessage }
}

export const updateUsernameAction = async (name: string) => {
  try {
    const user = await getAuthUser()

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
      },
    })
    revalidatePath("/profile")
    return { success: true, message: "Name updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export async function removeAvatarAction() {
  const sessionUser = await getAuthUser()
  if (!sessionUser?.id) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { image: true },
  })

  const key = extractFileKey(user?.image)

  await prisma.user.update({
    where: { id: sessionUser.id },
    data: { image: null },
  })

  if (key) {
    await utapi.deleteFiles(key).catch(() => {})
  }

  revalidatePath("/settings")
}
