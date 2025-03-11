import { BookList } from "@/components/book-list"
import { BookFilters } from "@/components/book-filters"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">{query ? `Search Results for "${query}"` : "Search Results"}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <BookFilters />
        </aside>
        <main className="md:col-span-3">
          <BookList initialQuery={query} />
        </main>
      </div>
    </div>
  )
}

