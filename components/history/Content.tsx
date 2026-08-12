"use client"

import CopyAndDownload from "@/components/global/CopyAndDownload"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
  jobTitle: string | null
  company: string | null
  createdAt: Date
  coverLetter: string
}

function Content({ jobTitle, company, coverLetter, createdAt }: Props) {
  return (
    <div className='space-y-6'>
      <div className='space-y-6'>
        <Link href='/history' className='flex items-center gap-2'>
          <ArrowLeft className='size-4' />
          <span>Back to history</span>
        </Link>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm'>
              {jobTitle} at {company}
            </span>
            <span className='text-xs text-muted-foreground'>
              Generated{" "}
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
              })}
            </span>
          </div>
          <CopyAndDownload text={coverLetter} />
        </div>
      </div>
      {/* <pre className='whitespace-pre-wrap font-[inherit]'>{coverLetter}</pre> */}
      {coverLetter.split("\n\n").map((paragraph, index) => (
        <p key={index} className='text-sm leading-relaxed mb-4 last:mb-0'>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
export default Content
