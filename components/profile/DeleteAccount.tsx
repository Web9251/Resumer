import DeleteDialog from "@/components/global/DeleteDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

function DeleteAccount() {
  return (
    <Card className='bg-red-900'>
      <CardHeader>
        Danger zone
        <CardDescription>
          Deleting your account removes all your data. This can&apos;t be
          undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteDialog
          triggerText='Delete account'
          titleText='Are you sure you want to delete your account?'
          descriptionText='This action cannot be undone. This will remove your account as well as any apps and files associated with it.'
        />
      </CardContent>
    </Card>
  )
}
export default DeleteAccount
