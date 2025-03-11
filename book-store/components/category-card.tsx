"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryCardProps {
  category: string
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const { books } = await getAllBooks(1, 4, category)
        setBooks(books)
      } catch (error) {
        console.error(`Error loading books for ${category}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [category])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">{category}</h2>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-40" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {books.slice(0, 4).map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="block overflow-hidden transition-transform hover:scale-105"
                >
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="object-cover w-full h-40 rounded-md"
                  />
                </Link>
              ))}
            </div>
            <Button asChild className="w-full">
              <Link href={`/books?category=${encodeURIComponent(category)}`}>Explore {category}</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

