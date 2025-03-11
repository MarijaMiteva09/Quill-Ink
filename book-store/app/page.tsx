import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedBooks } from "@/components/featured-books"
import { CategoryPreview } from "@/components/category-preview"
import { BookSearch } from "@/components/book-search"
import { getCategoriesWithBooks } from "@/lib/books"

export default async function Home() {
  const categories = await getCategoriesWithBooks([
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Biography",
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Quill Ink
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover your next favorite book from our vast collection across all genres.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <BookSearch />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-12 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold text-center">Featured Books</h2>
            <FeaturedBooks />
          </div>
        </section>

        {/* Categories Preview Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold text-center">Explore Categories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 3).map((category) => (
                <CategoryPreview key={category} category={category} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

