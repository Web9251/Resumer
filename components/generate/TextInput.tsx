import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  type?: "text" | "email" | "password" | "number" | "search"
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  fieldDescription?: string
  hideLabel?: boolean
  className?: string
}

function TextInput<T extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  control,
  disabled,
  fieldDescription,
  hideLabel,
  className,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field
            data-invalid={fieldState.invalid}
            className={cn("min-w-75", className)}
          >
            <FieldContent className={hideLabel ? "hidden" : "block"}>
              <FieldLabel htmlFor={name} className='capitalize'>
                {label || name}
              </FieldLabel>
            </FieldContent>
            <Input
              {...field}
              id={name}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className='dark:bg-transparent focus:bg-transparent leading-relaxed'
              disabled={disabled}
            />
            <FieldDescription>{fieldDescription}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
export default TextInput
