"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PackageCard } from "@/components/package-card";
import { ErrorBoundary } from "@/components/error-boundary";
import { useEffect, useState } from "react";

const NPMS_API_URL = "https://api.npms.io/v2/search";

function TrendingPageContent({ packages }: { packages: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((result: any) => (
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
  );
}

export default function TrendingPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingPackages() {
      try {
        const res = await fetch(`${NPMS_API_URL}?q=boost-exact:true&size=20`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch trending packages: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        setPackages(data.results);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unexpected error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingPackages();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Trending Packages</h1>
        <p className="text-muted-foreground">
          Discover popular and trending npm packages
        </p>
      </div>
      <ErrorBoundary
        fallback={
          <div>Error loading trending packages. Please try again later.</div>
        }
      >
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="text-lg font-bold mb-2">
              Error loading trending packages
            </h2>
            <p>{error.message}</p>
          </div>
        ) : (
          <TrendingPageContent packages={packages} />
        )}
      </ErrorBoundary>
    </div>
  );
}
