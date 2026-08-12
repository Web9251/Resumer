"use server"

import prisma from "@/lib/prisma"
import { signInSchema, signUpSchema } from "@/utils/schemas"
import { signInFields, signUpFields } from "@/utils/schemas"
import { revalidatePath } from "next/cache"
import { validateWithZod } from "@/lib/utils"
import { auth } from "@/lib/auth"
import { isAPIError } from "better-auth/api"
import { headers } from "next/headers"
import { getAuthUser, renderError } from "@/actions/utilsActions"
import { extractFileKey, utapi } from "@/lib/uploadthing-server"

export const renderAuthError = async (error: unknown) => {
  const errorMessage =
    isAPIError(error) || error instanceof Error
      ? error.message
      : "there was an error"
  return { success: false, message: errorMessage }
}

export const signUpAction = async (formData: signUpFields) => {
  try {
    const validatedData = await validateWithZod(formData, signUpSchema)

    const { name, email, password } = validatedData

    const userCount = await prisma.user.count()

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        // role: userCount === 0 ? "admin" : "user",
      },
    })

    return { success: true, message: "Successfully SignedUp" }
  } catch (error) {
    return renderAuthError(error)
  }
}

export const signInAction = async (
  formData: signInFields,
  callbackUrl: string | undefined,
) => {
  try {
    const validatedData = await validateWithZod(formData, signInSchema)

    const { email, password } = validatedData

    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    })
    return { success: true, message: "", redirectTo: callbackUrl || "/" }
  } catch (error) {
    const errorMessage =
      isAPIError(error) || error instanceof Error
        ? error.message
        : "there was an error"
    return { success: false, message: errorMessage, redirectTo: null }
  }
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

  // The database write is the source of truth — do this first
  await prisma.user.update({
    where: { id: sessionUser.id },
    data: { image: null },
  })

  // Best-effort: storage cleanup shouldn't block the user-facing removal
  if (key) {
    await utapi.deleteFiles(key).catch(() => {})
  }

  revalidatePath("/settings") // adjust to wherever the avatar is displayed
}
