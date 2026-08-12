import { Button } from "@/components/ui/button"
import {
  Command,
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
import { formatDistanceToNow } from "date-fns"

type Props = {
  resumes: ResumeContent[]
  onSelect: (id: string) => void
  value: string
}

function SelectResume({ resumes, onSelect, value }: Props) {
  const [open, setOpen] = useState(false)
  const selected = resumes.find((r) => r.id === value)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {selected ? selected.name : "Select a saved resume"}
          <ChevronsUpDown className='ml-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search resumes...' />
          <CommandList>
            <CommandEmpty>No resume found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              {resumes.map((resume) => {
                return (
                  <CommandItem
                    key={resume.id}
                    value={resume.name}
                    onSelect={() => {
                      onSelect(resume.id)
                      setOpen(false)
                    }}
                  >
                    <div className='flex flex-col  w-full'>
                      <span>{resume.name}</span>
                      <span className='text-xs text-muted-foreground'>
                        Updated{" "}
                        {formatDistanceToNow(resume.updatedAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default SelectResume
