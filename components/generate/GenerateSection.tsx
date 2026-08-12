"use client"

import CoverLetter from "@/components/generate/CoverLetter"
import GenerateForm from "@/components/generate/GenerateForm"
import { Generation } from "@/generated/prisma/client"
import { FormFields } from "@/utils/schemas"
import {
  GenerationSelected,
  ResumeContent,
  ResumeSelected,
} from "@/utils/types"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  resumes: ResumeContent[]
  resume: ResumeSelected | null | undefined
  generation: Generation | null | undefined
  generationsCount: number
}

function GenerateSection({
  resumes,
  resume,
  generation,
  generationsCount,
}: Props) {
  const [formData, setFormData] = useState<FormFields>()
  const [resumeId, setResumeId] = useState("")

  const { completion, complete, isLoading, stop, error } = useCompletion({
    api: "/api/cover-letter",
    streamProtocol: "text",
    onError: (err) => {
      console.log("🚀 ~ GeneratePage ~ err:", err)
      toast.error("Something went wrong, Please try again.")
    },
  })

  const generateHandler = async (formData: FormFields) => {
    if (generationsCount > 2) {
      throw new Error(
        `You've reached your free limit, upgrade your plan to generate more.`,
      )
    }
    if (!formData.resume.trim() || !formData.jobDescription.trim()) return
    setFormData(formData)
    await complete(JSON.stringify(""), { body: { ...formData, resumeId } })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
      <GenerateForm
        isLoading={isLoading}
        completion={completion}
        stop={stop}
        resumes={resumes}
        resumeId={resumeId}
        setResumeId={setResumeId}
        generateHandler={generateHandler}
        resume={resume}
        generation={generation}
        generationsCount={generationsCount}
      />
      <CoverLetter
        isLoading={isLoading}
        completion={completion}
        generateHandler={generateHandler}
        formData={formData}
        generationsCount={generationsCount}
      />
    </div>
  )
}
export default GenerateSection
