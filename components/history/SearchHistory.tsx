"use client"

import SelectInput from "@/components/generate/SelectInput"
import TextInput from "@/components/generate/TextInput"
import NoHistoryResult from "@/components/history/NoHistoryResult"
import { sortHistory } from "@/utils/constants"
import { GenerationsResult, SelectValuesType } from "@/utils/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useForm, useWatch } from "react-hook-form"

function SearchHistory({
  companyOptions,
  generations,
}: {
  companyOptions: SelectValuesType
  generations: GenerationsResult
}) {
  const searchParams = useSearchParams()

  const { control, reset } = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
      company: searchParams.get("company") || "all companies",
      sort: searchParams.get("sort") || "newest",
    },
  })

  const searchWatch = useWatch({ control, name: "search" })
  const companyWatch = useWatch({ control, name: "company" })
  const sortWatch = useWatch({ control, name: "sort" })

  const isFirstRender = useRef(true)
  const router = useRouter()

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timer = setTimeout(() => {
      router.replace(
        `/history?search=${searchWatch}&company=${companyWatch}&sort=${sortWatch}`,
      )
    }, 100)

    return () => clearTimeout(timer)
  }, [searchWatch, companyWatch, sortWatch, router])

  return (
    <form className='space-y-10'>
      <div className='flex flex-col items-center justify-center md:flex-row md:items-center md:gap-10'>
        <TextInput
          name='search'
          control={control}
          hideLabel={true}
          placeholder='Search by company or job title'
          className='max-w-100'
          type='search'
        />
        <div className='flex items-center md:self-start'>
          <SelectInput
            name='company'
            control={control}
            selectValues={companyOptions}
            hideLabel={true}
          />
          <SelectInput
            name='sort'
            control={control}
            selectValues={sortHistory}
            hideLabel={true}
          />
        </div>
      </div>
      {generations.totalCount === 0 && <NoHistoryResult reset={reset} />}
    </form>
  )
}
export default SearchHistory
