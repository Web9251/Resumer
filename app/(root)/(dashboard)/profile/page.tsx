import Container from "@/components/global/Container"
import PageHeader from "@/components/global/PageHeader"
import ChangePassword from "@/components/profile/UpdatePassword"
import DeleteAccount from "@/components/profile/DeleteAccount"
import UpdateAvatar from "@/components/profile/UpdateAvatar"
import UpdatePersonalInfo from "@/components/profile/UpdatePersonalInfo"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"
import { redirect } from "next/navigation"

async function ProfilePage() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  return (
    <section className={cn(pageSection)}>
      <Container className='max-w-3xl space-y-6'>
        <PageHeader
          heading='Account'
          subText='Manage your personal information'
        />
        <UpdateAvatar user={user} />
        <UpdatePersonalInfo name={user.name} />
        <ChangePassword />
        <DeleteAccount />
      </Container>
    </section>
  )
}
export default ProfilePage
