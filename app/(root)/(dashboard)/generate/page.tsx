import {
  getGenerationById,
  getTotalGenerationsCount,
} from "@/actions/generationActions"
import { getResumeById, getResumesAction } from "@/actions/resumeActions"
import GenerateSection from "@/components/generate/GenerateSection"
import Container from "@/components/global/Container"
import PageHeader from "@/components/global/PageHeader"
import { FadeInVertical } from "@/components/motion/FadeIn"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<{
    resumeId?: string
    generationId?: string
  }>
}
async function GeneratePage({ searchParams }: Props) {
  const params = await searchParams

  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const [resumes, resume, generation, generationsCount] = await Promise.all([
    await getResumesAction(),
    await getResumeById(params.resumeId),
    await getGenerationById(params.generationId),
    await getTotalGenerationsCount(),
  ])

  return (
    <section className={cn(pageSection, "")}>
      <Container className='space-y-14'>
        <PageHeader
          heading='Generate'
          subText=' Paste your resume and job description to get a tailored cover letter.'
        />
        <FadeInVertical>
          <GenerateSection
            resumes={resumes}
            resume={resume}
            generation={generation}
            generationsCount={generationsCount}
          />
        </FadeInVertical>
      </Container>
    </section>
  )
}
export default GeneratePage
