import { getRecentGenerationsAction } from "@/actions/generationActions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Generation } from "@/generated/prisma/client"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

function DashboardGenerationCard({ generation }: { generation: Generation }) {
  return (
    <Card className='relative bg-background'>
      <CardHeader className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <span className='text-sm'>
            {generation.jobTitle} at {generation.company}
          </span>
          <span className='text-xs text-muted-foreground'>
            Generated{" "}
            {formatDistanceToNow(generation.createdAt, { addSuffix: true })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm line-clamp-2 text-muted-foreground'>
          {generation.coverLetter}
        </p>
      </CardContent>
      <Link
        href={`/history/${generation.id}`}
        className='absolute inset-0'
      ></Link>
    </Card>
  )
}
export default DashboardGenerationCard
