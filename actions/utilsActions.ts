import { currentUser } from "@/hooks/currentUser"
import { UnauthorizedError } from "@/lib/errors"
import { redirect } from "next/navigation"

export const renderError = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage }
}

export const renderErrorWithData = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage, data: null }
}

export const renderErrorWithRedirect = async (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    redirect("/sign-in")
  }
  const errorMessage =
    error instanceof Error ? error.message : "there was an error"
  console.log("🚀 ~ renderError ~ errorMessage:", errorMessage)
  return { success: false, message: errorMessage, redirectTo: null }
}

export const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new UnauthorizedError()
  }
  return user
}
