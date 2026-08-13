"use client"

import CopyAndDownload from "@/components/global/CopyAndDownload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FormFields } from "@/utils/schemas"
import { buttonTheme } from "@/utils/styles"
import { Check, RefreshCw } from "lucide-react"
import { RiAiGenerate2 } from "react-icons/ri"

type Props = {
  completion: string
  isLoading: boolean
  formData: FormFields | undefined
  generateHandler: (formDate: FormFields) => Promise<void>
  generationsCount: number
}

function CoverLetter({
  completion,
  isLoading,
  generateHandler,
  formData,
  generationsCount,
}: Props) {
  return (
    <Card
      className={cn(
        "bg-background px-3 min-h-120",
        isLoading || completion ? "space-y-10" : "space-y-50",
      )}
    >
      <CardHeader>
        {isLoading ? (
          <div className='flex items-center gap-2 animate-pulse'>
            <RiAiGenerate2 />
            Generating...
          </div>
        ) : (
          completion && (
            <div className='flex items-center gap-2'>
              <Check className='size-4 flex' />
              Generated
            </div>
          )
        )}

        {/* Copy & Save */}
        {completion && !isLoading && <CopyAndDownload text={completion} />}
      </CardHeader>

      <CardContent className='flex-1 flex flex-col justify-between'>
        {(isLoading || completion) && (
          <div className='relative '>
            <pre
              className='whitespace-pre-wrap text-sm leading-relaxed
        font-[inherit] text-foreground'
            >
              {completion}

              {isLoading && (
                <span
                  className='inline-block w-0.5 h-4 bg-foreground
            ml-0.5 align-middle animate-pulse'
                />
              )}
            </pre>
          </div>
        )}
        {!completion && !isLoading && (
          <div className='text-center space-y-3'>
            <p className='text-base'>✨ Your cover letter will appear here</p>
            <p>Fill in your resume and job description to get started </p>
          </div>
        )}

        {generationsCount < 2 && !isLoading && completion ? (
          <Button
            className={cn(buttonTheme, "mt-6")}
            onClick={() => generateHandler(formData!)}
          >
            <RefreshCw />
            Regenerate
          </Button>
        ) : (
          (isLoading || completion) && (
            <Button className={cn(buttonTheme, "mt-6")} disabled={isLoading}>
              ...
            </Button>
          )
        )}
      </CardContent>
    </Card>
  )
}
export default CoverLetter
