import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
        <h1 className="text-3xl font-bold">About Quill Ink</h1>
        <p className="text-lg text-muted-foreground">
          Quill Ink is more than just an online bookstore. We're a community of book lovers, dedicated to connecting
          readers with their next favorite book.
        </p>
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground">
          At Quill Ink, we believe in the power of stories to inspire, educate, and transform. Our mission is to make it
          easy for everyone to discover and access a world of knowledge and imagination through books.
        </p>
        <h2 className="text-2xl font-semibold">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>A vast selection of books across all genres</li>
          <li>Personalized recommendations based on your reading preferences</li>
          <li>Easy-to-use search and filter options</li>
          <li>Competitive prices and regular promotions</li>
          <li>A platform for book reviews and discussions</li>
        </ul>
        <div className="pt-4">
          <Link href="/books">
            <Button size="lg">Start Exploring Books</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

