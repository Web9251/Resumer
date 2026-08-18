"use client"

import TextareaInput from "@/components/generate/TextareaInput"
import TextInput from "@/components/generate/TextInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FormFields, formSchema } from "@/utils/schemas"
import { buttonTheme } from "@/utils/styles"
import { Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaStop } from "react-icons/fa6"
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react"
import {
  GenerationSelected,
  ResumeContent,
  ResumeSelected,
} from "@/utils/types"
import { getResumeById, updateResumeAction } from "@/actions/resumeActions"
import SaveResume from "@/components/generate/SaveResume"
import { toast } from "sonner"
import SelectInputMod from "@/components/generate/SelectInputMod"

type Props = {
  completion: string
  isLoading: boolean
  stop: () => void
  resumeId: string
  setResumeId: Dispatch<SetStateAction<string>>
  resumes: ResumeContent[]
  resume: ResumeSelected | null | undefined
  generation: GenerationSelected | null | undefined
  generateHandler: (formDate: FormFields) => Promise<void>
  generationsCount: number
}

function GenerateForm({
  isLoading,
  stop,
  resumeId,
  setResumeId,
  resumes,
  resume,
  generation,
  generateHandler,
  generationsCount,
}: Props) {
  const [content, setContent] = useState("")

  const { watch, handleSubmit, control, setValue } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: resume?.content ?? content,
      jobDescription: generation?.jobDescription ?? "",
      jobTitle: generation?.jobTitle ?? "",
      company: generation?.company ?? "",
      resumeContent: "",
    },
  })

  const resumeWatch = watch("resume")
  const resumeLength = watch("resume").trim().length
  const jobDescriptionLength = watch("jobDescription").length

  useEffect(() => {
    async function getResume() {
      const result = await getResumeById(resumeId)
      setContent(resume?.content ?? result?.content ?? "")
    }
    getResume()

    setValue("resume", content)
  }, [content, resumeId, setValue, resume])

  const [isUpdating, startUpdating] = useTransition()

  const updateHandler = () => {
    startUpdating(async () => {
      const result = await updateResumeAction(resumeId, resumeWatch)
      if (result.success) {
        toast.success(result.message)
        return
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(generateHandler)} className='space-y-3'>
      <Card className='bg-background min-h-60'>
        <CardHeader className='p-0'>
          <div className='flex justify-between items-center px-6'>
            <p className='text-base'>Resume</p>
            <div className='flex justify-center items-center gap-2'>
              {resumes.length > 0 && (
                <SelectInputMod
                  name='resumeContent'
                  control={control}
                  selectValues={resumes}
                  setResumeId={setResumeId}
                />
              )}
            </div>
          </div>
          <Separator className='mt-2' />
        </CardHeader>
        <CardContent className='flex-1'>
          <TextareaInput
            name='resume'
            control={control}
            placeholder='Paste your resume here...'
          />
          <div className='flex justify-between items-center pt-3'>
            <div className='flex justify-center gap-3'>
              <SaveResume content={resumeWatch} isUpdating={isUpdating} />

              <Button
                size='xs'
                variant='outline'
                disabled={isUpdating}
                onClick={updateHandler}
                type='button'
              >
                {isUpdating ? "Updating..." : "Update current"}
              </Button>
            </div>
            <p className='text-xs text-muted-foreground text-right mr-6'>
              {resumeLength} characters
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-background'>
        <CardHeader className='p-0'>
          <div className='flex justify-between items-center px-6'>
            <p className='text-base'>Job Description</p>
          </div>
          <Separator className='mt-2' />
        </CardHeader>
        <CardContent>
          <TextareaInput
            name='jobDescription'
            control={control}
            placeholder='Paste job description here...'
          />
          <p className='text-xs text-muted-foreground text-right mr-6 mt-3'>
            {jobDescriptionLength} characters
          </p>
          <div className='mt-2'>
            <TextInput
              name='jobTitle'
              control={control}
              label='job title'
              className='text-sm md:text-sm'
              placeholder='e.g. Senior Frontend Engineer'
            />
            <TextInput
              name='company'
              control={control}
              className='text-sm md:text-sm'
              placeholder='e.g. Stripe'
            />
          </div>
        </CardContent>
      </Card>

      <div className='fixed bottom-0 right-0 left-0 z-10 p-4 md:static md:p-0 text-center'>
        {isLoading ? (
          <Button
            className={cn(buttonTheme, "w-full gap-2")}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              stop()
            }}
            type='button'
          >
            <FaStop />
            Stop generating
          </Button>
        ) : generationsCount < 2 ? (
          <Button
            className={cn(buttonTheme, "w-full gap-2")}
            disabled={isLoading}
          >
            <>
              <Sparkles />
              Generate Cover letter
            </>
          </Button>
        ) : (
          <Button type='button' className={cn(buttonTheme, "w-full gap-2")}>
            Upgrade to Pro
          </Button>
        )}
        <p className='text-xs text-muted-foreground mt-2'>
          {generationsCount}/2 generations used
        </p>
      </div>
    </form>
  )
}
export default GenerateForm
