import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PackageCardProps {
  name: string
  description: string
  version: string
  score: number
  keywords: string[]
}

export function PackageCard({ name, description, version, score, keywords }: PackageCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <Link href={`/package/${name}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <Badge variant="secondary">v{version}</Badge>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {keywords?.slice(0, 3).map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Score: {(score * 100).toFixed(0)}%
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

