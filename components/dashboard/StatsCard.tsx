import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function StatsCard({ count, text }: { count: number; text: string }) {
  return (
    <Card className={cn("px-(--card-spacing) bg-background text-center")}>
      <CardHeader>{count}</CardHeader>
      <CardDescription>{text}</CardDescription>
    </Card>
  )
}
export default StatsCard
