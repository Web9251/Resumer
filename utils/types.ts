import { getAllGenerationsAction } from "@/actions/generationActions"
import { Prisma } from "@/generated/prisma/client"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

export type Plan = {
  type: string
  description: string
  price: string
  features: string[]
}

export type HowItWorks = {
  Icon: LucideIcon | IconType
  title: string
  description: string
}

export type ResumeContent = {
  id: string
  name: string
  content: string
  updatedAt: Date
}

export type GenerationWithResume = Prisma.GenerationGetPayload<{
  include: {
    resume: true
  }
}>

const resumeSelect = {
  content: true,
} satisfies Prisma.ResumeSelect

export type ResumeSelected = Prisma.ResumeGetPayload<{
  select: typeof resumeSelect
}>

const generationSelect = {
  jobTitle: true,
  jobDescription: true,
  company: true,
}

export type GenerationSelected = Prisma.GenerationGetPayload<{
  select: typeof generationSelect
}>

export type SelectValuesType = {
  value: string
}[]

export type GenerationsResult = Awaited<
  ReturnType<typeof getAllGenerationsAction>
>
