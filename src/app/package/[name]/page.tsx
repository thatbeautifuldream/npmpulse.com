import { notFound } from "next/navigation";
import { PackageHeader } from "@/components/package-header";
import { PackageStats } from "@/components/package-stats";
import { PackageInstall } from "@/components/package-install";
import { PackageReadme } from "@/components/package-readme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getPackageInfo(name: string) {
  const res = await fetch(
    `https://api.npms.io/v2/package/${encodeURIComponent(name)}`
  );
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch package");
  }
  return res.json();
}

async function getPackageReadme(name: string) {
  const res = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error("Failed to fetch readme");
  const data = await res.json();
  return data.readme;
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const packageInfo = await getPackageInfo((await params).name);
  if (!packageInfo) notFound();

  const { collected, evaluation = {} } = packageInfo;
  const readme = await getPackageReadme((await params).name);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PackageHeader
        name={collected.metadata.name}
        version={collected.metadata.version}
        description={collected.metadata.description}
        license={collected.metadata.license}
        author={collected.metadata.author}
        score={evaluation.score?.final ?? 0}
      />

      <Tabs defaultValue="readme" className="space-y-4">
        <TabsList>
          <TabsTrigger value="readme">README</TabsTrigger>
          <TabsTrigger value="install">Installation</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="readme" className="space-y-4">
          <PackageReadme content={readme} />
        </TabsContent>
        <TabsContent value="install" className="space-y-4">
          <PackageInstall name={collected.metadata.name} />
        </TabsContent>
        <TabsContent value="stats" className="space-y-4">
          <PackageStats
            downloads={collected.npm.downloads}
            stars={collected.github?.starsCount}
            issues={collected.github?.issues?.openCount}
            dependencies={collected.metadata.dependencies}
            maintainers={collected.metadata.maintainers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
