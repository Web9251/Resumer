import { getAllGenerationsAction } from "@/actions/generationActions"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useRef, useTransition } from "react"

type Props = {
  setHasMore: Dispatch<SetStateAction<boolean>>
  // setGenerations: Dispatch<SetStateAction<(GenerationsResult)>>
  setGenerations: Dispatch<
    SetStateAction<
      ({
        resume: {
          id: string
          userId: string
          createdAt: Date
          name: string
          content: string
          updatedAt: Date
        } | null
      } & {
        company: string | null
        id: string
        userId: string
        jobTitle: string | null
        jobDescription: string
        coverLetter: string
        resumeId: string | null
        createdAt: Date
      })[]
    >
  >
}

function LoadMore({ setHasMore, setGenerations }: Props) {
  const [loadingMore, startTransition] = useTransition()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") ?? ""
  const company = searchParams.get("company") ?? ""
  const sort = searchParams.get("sort") ?? ""

  const pageRef = useRef(1)

  const loadMoreGenerations = () => {
    startTransition(async () => {
      pageRef.current += 1

      const data = await getAllGenerationsAction({
        search,
        company,
        sort,
        page: pageRef.current,
      })
      setGenerations((prev) => [...prev, ...data.generations])
      setHasMore(data.hasMore)
    })
  }

  return (
    <Button
      variant='outline'
      className='mt-6 self-center min-w-32'
      onClick={loadMoreGenerations}
    >
      {loadingMore ? <Loader2Icon className='animate-spin' /> : "Load More"}
    </Button>
  )
}
export default LoadMore
