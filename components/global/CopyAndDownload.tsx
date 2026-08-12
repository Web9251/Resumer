"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, Copy, Save } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

function CopyAndDownload({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    // a.download = `cover-letter-${company || "draft"}.txt`
    a.download = `cover-letter-${"draft"}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className='flex items-center justify-end gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className='text-xs hover:cursor-pointer'
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className='text-xs hover:cursor-pointer'
            onClick={handleDownload}
          >
            <Save />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
export default CopyAndDownload
