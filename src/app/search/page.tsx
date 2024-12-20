/* eslint-disable @typescript-eslint/no-explicit-any */
import { PackageCard } from "@/components/package-card";
import { SearchBox } from "@/components/search-box";
import { Suspense } from "react";

async function searchPackages(query: string) {
  const res = await fetch(
    `https://api.npms.io/v2/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" } // Ensure fresh data on each request
  );
  if (!res.ok) throw new Error("Failed to fetch packages");
  return res.json();
}

function SearchResults({ query }: { query: string }) {
  const promise = searchPackages(query);

  return promise.then((results) => (
    <div className="grid gap-4 md:grid-cols-2">
      {results.results.map((result: any) => (
        <PackageCard
          key={result.package.name}
          name={result.package.name}
          description={result.package.description}
          version={result.package.version}
          score={result.score.final}
          keywords={result.package.keywords}
        />
      ))}
    </div>
  ));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <SearchBox />
      </div>
      {query && (
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <div className="animate-pulse">Searching packages...</div>
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      )}
    </div>
  );
}
