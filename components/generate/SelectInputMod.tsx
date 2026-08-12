import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { ResumeContent } from "@/utils/types"
import { Dispatch, SetStateAction } from "react"
import SelectResume from "@/components/generate/SelectResume"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  selectValues: ResumeContent[]
  hideLabel?: boolean
  setResumeId: Dispatch<SetStateAction<string>>
}

function SelectInputMod<T extends FieldValues>({
  name,
  control,
  selectValues,
  setResumeId,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectResume
          resumes={selectValues}
          onSelect={(id) => {
            field.onChange(id)
            setResumeId(id)
          }}
          value={field.value}
        />
      )}
    />
  )
}
export default SelectInputMod
