"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { getBookReviews } from "@/lib/books"
import type { Review } from "@/types/book"
import { useAuth } from "@/hooks/use-auth"

interface BookReviewsProps {
  bookId: string
}

export function BookReviews({ bookId }: BookReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(5)
  const { user } = useAuth()

  useEffect(() => {
    const loadReviews = async () => {
      const bookReviews = await getBookReviews(bookId)
      setReviews(bookReviews)
    }

    loadReviews()
  }, [bookId])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the review to the server
    alert("Review submission would be processed here")
    setNewReview("")
    setRating(5)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {user ? (
        <form onSubmit={handleSubmitReview} className="p-6 space-y-4 border rounded-lg">
          <h3 className="text-lg font-medium">Write a Review</h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star
                    className={`w-6 h-6 ${star <= rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="review" className="block text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="review"
              placeholder="Share your thoughts about this book..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit">Submit Review</Button>
        </form>
      ) : (
        <div className="p-6 text-center border rounded-lg">
          <p className="mb-4">Please sign in to leave a review</p>
          <Button variant="outline" asChild>
            <a href="/account/login">Sign In</a>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium">{review.user.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm">{review.content}</p>
                </div>
              </div>
              <Separator />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No reviews yet. Be the first to review this book!</p>
        )}
      </div>
    </div>
  )
}

