import Footer from "@/components/auth/Footer"
import { Card, CardHeader } from "../ui/card"
import Header from "./Header"
import Social from "./Social"

type Props = {
  headerTitle: string
  headerSubText: string
  callbackUrl: string | undefined
  footerLink: string
  footerLinkLabel: string
}

function CardWrapper({
  headerTitle,
  headerSubText,
  callbackUrl,
  footerLink,
  footerLinkLabel,
}: Props) {
  return (
    <Card className='dark:bg-transparent px-12 w-100 md:w-120 mb-6'>
      <CardHeader>
        <Header headerTitle={headerTitle} headerSubText={headerSubText} />
      </CardHeader>
      <Social callbackUrl={callbackUrl} />
      <Footer
        // footerText={footerText}
        footerLink={footerLink}
        footerLinkLabel={footerLinkLabel}
      />
    </Card>
  )
}
export default CardWrapper
