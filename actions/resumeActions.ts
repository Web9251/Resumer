"use server"

import { getAuthUser, renderError } from "@/actions/utilsActions"
import prisma from "@/lib/prisma"
import { validateWithZod } from "@/lib/utils"
import { resumeSchema } from "@/utils/schemas"
import { revalidatePath } from "next/cache"

const getResumeByName = async (name: string) => {
  const user = await getAuthUser()
  return await prisma.resume.findFirst({
    where: { userId: user.id, name: { equals: name, mode: "insensitive" } },
  })
}

export const saveResumeAction = async (name: string, content: string) => {
  try {
    if (!content) throw new Error("Resume is required")

    const user = await getAuthUser()

    await validateWithZod(content, resumeSchema)

    const resumeExist = await getResumeByName(name)
    if (resumeExist) {
      throw new Error("Resume name already used, try another one")
    }

    await prisma.resume.create({
      data: {
        userId: user.id,
        name: name,
        content,
      },
    })
    revalidatePath("/generate")
    return { success: true, message: "Resume saved successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const updateResumeAction = async (id: string, content: string) => {
  try {
    await getAuthUser()

    await prisma.resume.update({
      where: { id },
      data: { content },
    })
    revalidatePath("/generate")
    return { success: true, message: "Resume updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const getResumesAction = async () => {
  const user = await getAuthUser()

  return await prisma.resume.findMany({
    where: { userId: user.id },
    select: { content: true, id: true, name: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  })
}

export const getResumeById = async (id: string | undefined) => {
  if (!id) return
  return await prisma.resume.findUnique({
    where: { id },
    select: { content: true },
  })
}
