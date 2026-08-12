"use client"

import GenerationCard from "@/components/history/GenerationCard"
import LoadMore from "@/components/history/LoadMore"
import { GenerationsResult } from "@/utils/types"
import { useState } from "react"

type Props = {
  initialGenerations: GenerationsResult
}

function GenerationsContainer({ initialGenerations }: Props) {
  const [generations, setGenerations] = useState(initialGenerations.generations)
  const [hasMore, setHasMore] = useState(initialGenerations.hasMore)

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {generations.map((generation) => {
          return <GenerationCard key={generation.id} generation={generation} />
        })}
      </div>

      {hasMore && (
        <LoadMore setGenerations={setGenerations} setHasMore={setHasMore} />
      )}
    </div>
  )
}
export default GenerationsContainer
