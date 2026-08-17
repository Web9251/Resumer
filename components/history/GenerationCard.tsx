"use client"

import DeleteGeneration from "@/components/history/DeleteGeneration"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GenerationWithResume } from "@/utils/types"
import { formatDistanceToNow } from "date-fns"
import { Copy, Eye, MoreHorizontal, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function GenerationCard({ generation }: { generation: GenerationWithResume }) {
  const { coverLetter, jobTitle, company, createdAt, id } = generation
  const paragraphs = coverLetter.split("\n\n")
  const preview = paragraphs[1] ?? paragraphs[0]

  const router = useRouter()

  async function handleCopy(coverLetter: string) {
    await navigator.clipboard.writeText(coverLetter)
    toast.success("Copied to clipboard")
  }
  function handleReuse(generation: GenerationWithResume) {
    const url = new URLSearchParams()
    if (generation.resumeId) {
      url.set("resumeId", generation.resumeId)
    }
    url.set("generationId", generation.id)
    router.push(`/generate?${url.toString()}`)
  }

  return (
    <Card className='relative bg-background'>
      <CardHeader className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <span className='text-sm'>
            {jobTitle} at {company}
          </span>
          <span className='text-xs text-muted-foreground'>
            Generated {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        <div className='z-10'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => router.push(`/history/${id}`)}>
                <Eye className='size-4 mr-2' /> View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCopy(coverLetter)}>
                <Copy className='size-4 mr-2' /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleReuse(generation)}>
                <RotateCcw className='size-4 mr-2' /> Reuse
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteGeneration id={id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm line-clamp-2 text-muted-foreground'>{preview}</p>
      </CardContent>
      <Link href={`/history/${id}`} className='absolute inset-0'></Link>
    </Card>
  )
}
export default GenerationCard
