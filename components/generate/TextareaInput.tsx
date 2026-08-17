import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Field, FieldError } from "../ui/field"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  placeholder?: string
  control: Control<T>
  className?: string
}

function TextareaInput<T extends FieldValues>({
  name,
  placeholder,
  control,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <Textarea
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              rows={8}
              className={cn(
                "text-sm md:text-sm leading-relaxed border-none dark:bg-transparent focus-visible:border-0 focus-visible:ring-0",
              )}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default TextareaInput
