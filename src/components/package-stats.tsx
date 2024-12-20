import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Download, Star, GitPullRequest, Users, Package } from 'lucide-react'

interface PackageStatsProps {
  downloads: {
    from: string
    to: string
    count: number
  }[]
  stars?: number
  issues?: number
  dependencies?: Record<string, string>
  maintainers?: { username: string }[]
}

export function PackageStats({
  downloads,
  stars = 0,
  issues = 0,
  dependencies = {},
  maintainers = []
}: PackageStatsProps) {
  const totalDownloads = downloads?.reduce((acc, curr) => acc + curr.count, 0) || 0
  const dependencyCount = Object.keys(dependencies).length

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Downloads</CardTitle>
          <CardDescription>Package downloads over the last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Download className="h-5 w-5" />
            {totalDownloads.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GitHub</CardTitle>
          <CardDescription>GitHub statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              {stars.toLocaleString()} stars
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              {issues} open issues
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dependencies</CardTitle>
          <CardDescription>Package dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {dependencyCount} dependencies
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintainers</CardTitle>
          <CardDescription>Package maintainers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {maintainers.length} maintainers
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

