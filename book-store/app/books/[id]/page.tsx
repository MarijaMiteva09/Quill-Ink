import { notFound } from "next/navigation"
import Image from "next/image"
import { getBookById } from "@/lib/books"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BookReviews } from "@/components/book-reviews"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-24 aspect-[2/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg">
            {book.coverImage ? (
              <Image
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400">No cover</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-xl text-muted-foreground">by {book.author}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">{book.price > 0 ? formatCurrency(book.price) : "Free"}</div>
              {book.originalPrice > 0 && book.originalPrice > book.price && (
                <div className="text-lg text-muted-foreground line-through">{formatCurrency(book.originalPrice)}</div>
              )}
              {book.originalPrice > 0 && book.originalPrice > book.price && (
                <div className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                  {Math.round((1 - book.price / book.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <AddToCartButton book={book} />
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>

            <div className="p-4 space-y-2 border rounded-lg">
              <div className="flex justify-between">
                <span>Availability:</span>
                <span
                  className={`font-medium ${book.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {book.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-medium">{book.format}</span>
              </div>
              {book.pages > 0 && (
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ISBN:</span>
                <span className="font-medium">{book.isbn}</span>
              </div>
              <div className="flex justify-between">
                <span>Publisher:</span>
                <span className="font-medium">{book.publisher}</span>
              </div>
              <div className="flex justify-between">
                <span>Publication Date:</span>
                <span className="font-medium">{book.publicationDate}</span>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold">Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: book.description }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <BookReviews bookId={book.id} />
      </div>
    </div>
  )
}

