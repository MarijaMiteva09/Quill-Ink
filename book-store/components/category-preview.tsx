"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPreviewProps {
  category: string
}

export function CategoryPreview({ category }: CategoryPreviewProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const { books } = await getAllBooks(1, 3, category)
        setBooks(books)
      } catch (error) {
        console.error(`Error loading books for ${category}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [category])

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <Skeleton className="w-3/4 h-6 mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (books.length === 0) {
    return null // Don't render anything if there are no books
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="mb-4 text-xl font-semibold">{category}</h3>
        <div className="space-y-2">
          {books.slice(0, 3).map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="flex items-center space-x-4 group">
              <div className="relative w-16 h-24 overflow-hidden rounded-md">
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{book.title}</p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/books?category=${encodeURIComponent(category)}`}>View All {category} Books</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

