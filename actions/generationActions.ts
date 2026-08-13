"use server"

import { getAuthUser, renderError } from "@/actions/utilsActions"
import prisma from "@/lib/prisma"
import { FormFields } from "@/utils/schemas"
import { revalidatePath } from "next/cache"
import { unstable_noStore as noStore } from "next/cache"

export const getAllGenerationsAction = async ({
  search,
  company,
  sort = "newest",
  page = 1,
}: {
  search?: string
  company?: string
  sort?: string
  page?: number
}) => {
  const GENERATIONS_PER_PAGE = 2

  await getAuthUser()

  const conditions = []

  if (search) {
    conditions.push({
      OR: [
        { company: { contains: search, mode: "insensitive" as const } },
        { jobTitle: { contains: search, mode: "insensitive" as const } },
      ],
    })
  }

  if (company && company !== "all companies") {
    conditions.push({ company })
  }

  const where = conditions.length ? { AND: conditions } : {}

  const orderBy = {
    latest: [{ createdAt: "desc" as const }],
    oldest: [{ createdAt: "asc" as const }],
  }[sort] ?? [{ createdAt: "desc" as const }]

  const [generations, totalCount] = await Promise.all([
    await prisma.generation.findMany({
      where,
      orderBy,
      take: GENERATIONS_PER_PAGE,
      skip: (page - 1) * GENERATIONS_PER_PAGE,
      include: { resume: true },
    }),
    await prisma.generation.count({
      where,
    }),
  ])

  return {
    generations,
    totalCount,
    hasMore: page * GENERATIONS_PER_PAGE < totalCount,
  }
}

export const getTotalGenerationsCount = async () => {
  noStore()
  const user = await getAuthUser()
  return await prisma.generation.count({
    where: { userId: user.id },
  })
}
export const saveGenerationAction = async (
  formData: FormFields,
  resumeId: string,
  completion: string,
) => {
  const user = await getAuthUser()

  await prisma.generation.create({
    data: {
      userId: user.id,
      jobTitle: formData.jobTitle,
      company: formData.company,
      jobDescription: formData.jobDescription,
      coverLetter: completion,
      ...(resumeId ? { resumeId } : {}),
    },
  })
}

export const getGenerationById = async (generationId: string | undefined) => {
  if (!generationId) return

  return await prisma.generation.findUnique({
    where: { id: generationId },
    include: { resume: true },
  })
}

export const deleteGeneration = async (id: string) => {
  try {
    await getAuthUser()

    await prisma.generation.delete({
      where: { id },
    })
    revalidatePath("/history")
    return { success: true, message: "Generation deleted successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const getAllCompanies = async () => {
  const user = await getAuthUser()
  return await prisma.generation.findMany({
    where: {
      userId: user.id,
      company: { not: null },
    },
    select: { company: true },
    distinct: ["company"],
  })
}

export const getGenerationStatsAction = async () => {
  const user = await getAuthUser()

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [totalGenerations, monthlyGenerations, companies] = await Promise.all([
    await prisma.generation.count({ where: { userId: user.id } }),
    await prisma.generation.count({
      where: { userId: user.id, createdAt: { gte: startOfMonth } },
    }),
    await getAllCompanies(),
  ])

  return {
    totalGenerations,
    monthlyGenerations,
    totalCompanies: companies.length,
  }
}

export const getRecentGenerationsAction = async () => {
  const user = await getAuthUser()

  return await prisma.generation.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  })
}
