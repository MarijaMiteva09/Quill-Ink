"use client"

import { useState, useEffect } from "react"
import { BookCard } from "@/components/book-card"
import { Pagination } from "@/components/pagination"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { Skeleton } from "@/components/ui/skeleton"

interface BookListProps {
  initialQuery?: string
  limit?: number
}

export function BookList({ initialQuery = "", limit }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const booksPerPage = limit || 12

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const { books, total } = await getAllBooks(currentPage, booksPerPage, initialQuery)
        setBooks(books)
        setTotalBooks(total)
      } catch (error) {
        console.error("Error loading books:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [currentPage, initialQuery, booksPerPage])

  const totalPages = Math.ceil(totalBooks / booksPerPage)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-md" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {!limit && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  )
}

