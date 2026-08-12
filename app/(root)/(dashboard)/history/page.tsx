import {
  getAllCompanies,
  getAllGenerationsAction,
  getTotalGenerationsCount,
} from "@/actions/generationActions"
import Container from "@/components/global/Container"
import EmptyHistory from "@/components/history/EmptyHistory"
import GenerationsContainer from "@/components/history/GenerationsContainer"
import SearchHistory from "@/components/history/SearchHistory"
import { Button } from "@/components/ui/button"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { buttonTheme, pageSection } from "@/utils/styles"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<{
    search?: string
    company?: string
    sort?: string
  }>
}

async function HistoryPage({ searchParams }: Props) {
  const { search, company, sort } = await searchParams

  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const [initialGenerations, companies, totalGenerations] = await Promise.all([
    await getAllGenerationsAction({ search, company, sort }),
    await getAllCompanies(),
    await getTotalGenerationsCount(),
  ])

  const companyOptions = [
    { value: "all companies" },
    ...companies.map((item) => ({
      value: item.company!,
    })),
  ]

  if (totalGenerations === 0) {
    return <EmptyHistory />
  }

  return (
    <section className={(cn(pageSection), "py-8")}>
      <Container>
        {/* Search & Filter */}
        <div className='max-w-3xl mx-auto'>
          <SearchHistory
            companyOptions={companyOptions}
            generations={initialGenerations}
          />
        </div>
        {initialGenerations.totalCount !== 0 && (
          <div className='flex justify-between mt-6'>
            <p>
              {initialGenerations.totalCount}{" "}
              {initialGenerations.totalCount > 1
                ? "cover letters"
                : "cover letter"}{" "}
            </p>
            <Button className={cn(buttonTheme)} asChild>
              <Link href='/generate'>Generate New</Link>
            </Button>
          </div>
        )}

        <GenerationsContainer
          key={`${search}-${company}-${sort}`}
          initialGenerations={initialGenerations}
        />
      </Container>
    </section>
  )
}
export default HistoryPage
