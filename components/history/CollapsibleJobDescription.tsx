"use client"

import { Button } from "@/components/global/Button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

function CollapsibleJobDescription({
  jobDescription,
}: {
  jobDescription: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex justify-between'>
        <p className='font-semibold'>Job Description used</p>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' className=''>
            {isOpen ? (
              <>
                Hide
                <ChevronUp />
              </>
            ) : (
              <>
                Show
                <ChevronDown />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='mt-3'>
        <p className='text-sm leading-relaxed'>{jobDescription}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
export default CollapsibleJobDescription
