import { getGenerationById } from "@/actions/generationActions"
import Container from "@/components/global/Container"
import CollapsibleJobDescription from "@/components/history/CollapsibleJobDescription"
import Content from "@/components/history/Content"
import { Card, CardContent } from "@/components/ui/card"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

async function Resume({ params }: Props) {
  const id = (await params).id

  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const generation = await getGenerationById(id)

  if (!generation) return notFound()

  return (
    <section className={cn(pageSection)}>
      <Container className='max-w-5xl'>
        <Card className='flex flex-col'>
          <CardContent className='space-y-6'>
            <Content
              jobTitle={generation.jobTitle}
              company={generation.company}
              coverLetter={generation.coverLetter}
              createdAt={generation.createdAt}
            />
            <CollapsibleJobDescription
              jobDescription={generation.jobDescription}
            />
            <Link
              href={`/generate?resumeId=${generation.resumeId}&generationId=${generation.id}`}
              className='flex items-center gap-2'
            >
              Reuse these inputs
              <ArrowRight className='size-4' />
            </Link>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}
export default Resume
