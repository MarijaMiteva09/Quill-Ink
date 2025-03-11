"use client"

import { useState, useEffect } from "react"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getFeaturedBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const booksPerPage = 4

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const featuredBooks = await getFeaturedBooks()
        setBooks(featuredBooks)
      } catch (error) {
        console.error("Error loading featured books:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [])

  const totalPages = Math.ceil(books.length / booksPerPage)
  const displayedBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length > booksPerPage && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={books.length <= booksPerPage}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={books.length <= booksPerPage}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}
    </div>
  )
}

