import { SearchBox } from "@/components/search-box";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">NPM Pulse</h1>
        <p className="text-xl text-muted-foreground">
          Search and explore npm packages with enhanced analytics
        </p>
      </div>
      <SearchBox />
    </div>
  );
}
