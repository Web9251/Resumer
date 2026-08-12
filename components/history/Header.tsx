import { formatDistanceToNow } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
  jobTitle: string | null
  company: string | null
  createdAt: Date
}

function Header({ jobTitle, company, createdAt }: Props) {
  return (
    <div className='space-y-6'>
      <Link href='/history' className='flex items-center gap-2'>
        <ArrowLeft className='size-4' />
        <span>Back to history</span>
      </Link>
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
    </div>
  )
}
export default Header
