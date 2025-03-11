import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-up">
      <Link href={`/books/${book.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          {book.coverImage ? (
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">No cover</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/books/${book.id}`} className="hover:underline">
          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        <p className="mt-2 font-medium">{book.price > 0 ? formatCurrency(book.price) : "Free"}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

