import { FileSearchCorner, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"

function EmptyHistory() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <FileSearchCorner className='size-6' />
        </EmptyMedia>
        <EmptyTitle>No Cover letters Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any cover letter yet. Generate your first one
          to see it here
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className='flex-row justify-center gap-2'>
        <Button asChild>
          <Link href='/generate'>Generate</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyHistory
