import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PackageInstallProps {
  name: string
}

export function PackageInstall({ name }: PackageInstallProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Installation</CardTitle>
        <CardDescription>
          Choose your preferred package manager to install {name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="npm" className="space-y-4">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>npm install {name}</code>
            </pre>
          </TabsContent>
          <TabsContent value="yarn">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>yarn add {name}</code>
            </pre>
          </TabsContent>
          <TabsContent value="pnpm">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>pnpm add {name}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

