import Navbar from "@/components/navbar/Navbar"
import { currentUser } from "@/hooks/currentUser"
import { ReactNode } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}
