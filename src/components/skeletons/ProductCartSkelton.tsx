import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"

export default  function ProductCardSkeleton() {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-0">
        <Skeleton className="h-[200px] w-full" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center space-x-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
          <Skeleton className="h-3 w-16 ml-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-16" />
      </CardFooter>
    </Card>
  )
}