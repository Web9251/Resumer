import { getGenerationStatsAction } from "@/actions/generationActions"
import StatsCard from "@/components/dashboard/StatsCard"

type Props = {
  generationStats: Awaited<ReturnType<typeof getGenerationStatsAction>>
}
function StatsContainer({ generationStats }: Props) {
  return (
    <div className='flex justify-center items-center gap-4'>
      <StatsCard
        count={generationStats.totalGenerations}
        text='Total generated'
      />
      <StatsCard count={generationStats.monthlyGenerations} text='This month' />
      <StatsCard
        count={generationStats.totalCompanies}
        text='Companies applied'
      />
    </div>
  )
}
export default StatsContainer
