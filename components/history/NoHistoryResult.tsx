import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Search } from "lucide-react"
import { UseFormReset } from "react-hook-form"

function NoHistoryResult({
  reset,
}: {
  reset: UseFormReset<{
    search: string
    company: string
    sort: string
  }>
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try a different search or clear the filters
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' onClick={() => reset()}>
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  )
}
export default NoHistoryResult
