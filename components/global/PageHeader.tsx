function PageHeader({
  heading,
  subText,
}: {
  heading: string
  subText: string
}) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-3 items-center'>
        <h1 className='text-2xl'>{heading}</h1>
      </div>
      <p className='text-sm text-muted-foreground'>{subText}</p>
    </div>
  )
}
export default PageHeader
