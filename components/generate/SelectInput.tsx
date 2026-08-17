import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field"
import { SelectValuesType } from "@/utils/types"

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  label?: string
  placeholder?: string
  control: Control<T>
  disabled?: boolean
  selectValues: SelectValuesType
  hideLabel?: boolean
}

function SelectInput<T extends FieldValues>({
  name,
  label,
  control,
  selectValues,
  hideLabel = false,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation='horizontal'
          data-invalid={fieldState.invalid}
          className={`${hideLabel && "w-50"} flex justify-center items-center`}
        >
          <FieldContent
            className={`${hideLabel ? "hidden" : "block"} capitalize self-center`}
          >
            <FieldLabel htmlFor='form-rhf-select-language'>
              {label || name}
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
            }}
          >
            <SelectTrigger
              id='form-rhf-select-language'
              aria-invalid={fieldState.invalid}
              className='min-w-30 capitalize bg-background'
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position='item-aligned'>
              {selectValues.map((item, i) => {
                return (
                  <SelectItem key={i} value={item.value} className='capitalize'>
                    {item.value}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  )
}
export default SelectInput
