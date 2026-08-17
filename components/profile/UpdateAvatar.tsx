import ImageUploadForm from "@/components/profile/ImageUploadForm"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User } from "better-auth"

function UpdateAvatar({ user }: { user: User }) {
  const { name, image } = user
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className='bg-background'>
      <CardHeader>Avatar</CardHeader>
      <CardContent className='flex gap-4'>
        <div>
          <ImageUploadForm initials={initials} image={image} />
        </div>
      </CardContent>
    </Card>
  )
}
export default UpdateAvatar
