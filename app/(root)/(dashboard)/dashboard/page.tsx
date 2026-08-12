import {
  getGenerationStatsAction,
  getRecentGenerationsAction,
} from "@/actions/generationActions"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import QuickActions from "@/components/dashboard/QuickActions"
import RecentGenerations from "@/components/dashboard/RecentGenerations"
import StatsContainer from "@/components/dashboard/StatsContainer"
import Container from "@/components/global/Container"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"
import { redirect } from "next/navigation"

async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const [generationsStats, recentGenerations] = await Promise.all([
    await getGenerationStatsAction(),
    await getRecentGenerationsAction(),
  ])

  return (
    <section className={cn(pageSection, "py-10")}>
      <Container>
        <div className='space-y-10'>
          <DashboardHeader />
          <StatsContainer generationStats={generationsStats} />
          {generationsStats.totalGenerations > 0 && (
            <RecentGenerations recentGenerations={recentGenerations} />
          )}
          <QuickActions />
        </div>
      </Container>
    </section>
  )
}
export default DashboardPage
