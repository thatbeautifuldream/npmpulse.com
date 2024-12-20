import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, Package, Shield } from 'lucide-react'

interface PackageHeaderProps {
  name: string
  version: string
  description: string
  license: string
  author: { name: string } | string
  score?: number
}

export function PackageHeader({
  name,
  version,
  description,
  license,
  author,
  score
}: PackageHeaderProps) {
  const authorName = typeof author === 'string' ? author : author?.name

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" />
              {name}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            v{version}
          </Badge>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          {authorName && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {authorName}
            </div>
          )}
          {license && (
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              {license}
            </div>
          )}
          <div className="ml-auto">
            Score: {score !== undefined ? `${(score * 100).toFixed(0)}%` : 'N/A'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

