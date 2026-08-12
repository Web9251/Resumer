import { getRecentGenerationsAction } from "@/actions/generationActions"
import DashboardGenerationCard from "@/components/dashboard/DashboardGenerationCard"
import Link from "next/link"

type Props = {
  recentGenerations: Awaited<ReturnType<typeof getRecentGenerationsAction>>
}

function RecentGenerations({ recentGenerations }: Props) {
  return (
    <div>
      <div className='flex justify-between'>
        <p>Recent generations</p>
        <Link href='/history'>View all</Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {recentGenerations.map((generation, i) => {
          return <DashboardGenerationCard key={i} generation={generation} />
        })}
      </div>
    </div>
  )
}
export default RecentGenerations
