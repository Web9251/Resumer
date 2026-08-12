import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ResumeContent } from "@/utils/types"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

type Props = {
  resumes: ResumeContent[]
  onSelect: (id: string) => void
  value: string
}

function SelectResume({ resumes, onSelect, value }: Props) {
  const [open, setOpen] = useState(false)
  const selected = resumes.find((r) => r.id === value)
  return (
    <div className='flex flex-col gap-4'>
      <Button variant='outline' onClick={() => setOpen(true)}>
        {selected ? selected.name : "Select a saved resume"}
        <ChevronsUpDown className='ml-2' />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder='Search resumes...' />
          <CommandList>
            <CommandEmpty>No resume found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              {resumes.map((resume) => {
                return (
                  <CommandItem
                    key={resume.id}
                    value={resume.id}
                    onSelect={() => {
                      onSelect(resume.id)
                      setOpen(false)
                    }}
                  >
                    {resume.name}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
export default SelectResume
