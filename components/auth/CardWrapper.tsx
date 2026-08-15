import { Card, CardHeader } from "../ui/card"
import Header from "./Header"
import Social from "./Social"

type Props = {
  headerTitle: string
  headerSubText: string

  showSocial?: boolean
}

function CardWrapper({
  headerTitle,
  headerSubText,

  showSocial,
}: Props) {
  return (
    <Card className='dark:bg-transparent px-12 w-100 md:w-120 mb-6'>
      <CardHeader>
        <Header headerTitle={headerTitle} headerSubText={headerSubText} />
      </CardHeader>
      {showSocial && <Social />}
    </Card>
  )
}
export default CardWrapper
