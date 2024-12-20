import Link from "next/link";

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">NPM Pulse</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/trending"
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          Trending
        </Link>
        <Link
          href="/search"
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          Search
        </Link>
      </nav>
    </div>
  );
}
