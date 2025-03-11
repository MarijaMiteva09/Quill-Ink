import { BookList } from "@/components/book-list"
import { BookFilters } from "@/components/book-filters"

interface BooksPageProps {
  searchParams: {
    category?: string
  }
}

export default function BooksPage({ searchParams }: BooksPageProps) {
  const category = searchParams.category || ""

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">{category ? `${category} Books` : "All Books"}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <BookFilters />
        </aside>
        <main className="md:col-span-3">
          <BookList initialQuery={category} />
        </main>
      </div>
    </div>
  )
}

