import type { Book, Review } from "@/types/book"

// Google Books API base URL
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes"

// Convert Google Books API response to our Book type
const convertGoogleBookToBook = (item: any): Book => {
  const volumeInfo = item.volumeInfo
  const saleInfo = item.saleInfo

  return {
    id: item.id,
    title: volumeInfo.title || "Unknown Title",
    author: volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown Author",
    description: volumeInfo.description || "No description available",
    price: saleInfo?.retailPrice?.amount || 0,
    originalPrice: saleInfo?.listPrice?.amount || 0,
    coverImage: volumeInfo.imageLinks?.thumbnail || null,
    rating: volumeInfo.averageRating || 0,
    inStock: saleInfo?.saleability === "FOR_SALE",
    format: volumeInfo.printType || "Unknown",
    pages: volumeInfo.pageCount || 0,
    isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || "Unknown",
    publisher: volumeInfo.publisher || "Unknown Publisher",
    publicationDate: volumeInfo.publishedDate || "Unknown",
    genres: volumeInfo.categories || [],
  }
}

// Get featured books
export async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=subject:fiction&orderBy=relevance&maxResults=8`)
    const data = await response.json()

    if (!data.items) return []

    return data.items.map(convertGoogleBookToBook)
  } catch (error) {
    console.error("Error fetching featured books:", error)
    return []
  }
}

// Get all books with pagination
export async function getAllBooks(page = 1, limit = 12, query = ""): Promise<{ books: Book[]; total: number }> {
  try {
    const startIndex = (page - 1) * limit
    const searchQuery = query ? `subject:${query}` : "subject:fiction"

    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${limit}`,
    )
    const data = await response.json()

    if (!data.items) {
      return { books: [], total: 0 }
    }

    const books = data.items.map(convertGoogleBookToBook)

    return {
      books,
      total: data.totalItems || books.length,
    }
  } catch (error) {
    console.error("Error fetching books:", error)
    return { books: [], total: 0 }
  }
}

// Get book by ID
export async function getBookById(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}/${id}`)
    const data = await response.json()

    if (!data || data.error) {
      return null
    }

    return convertGoogleBookToBook(data)
  } catch (error) {
    console.error("Error fetching book details:", error)
    return null
  }
}

// Search books
export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=20`)
    const data = await response.json()

    if (!data.items) {
      return []
    }

    return data.items.map(convertGoogleBookToBook)
  } catch (error) {
    console.error("Error searching books:", error)
    return []
  }
}

export async function getCategoriesWithBooks(categories: string[]): Promise<string[]> {
  const categoriesWithBooks: string[] = []

  for (const category of categories) {
    try {
      const { books } = await getAllBooks(1, 1, category)
      if (books.length > 0) {
        categoriesWithBooks.push(category)
      }
    } catch (error) {
      console.error(`Error checking books for category ${category}:`, error)
    }
  }

  return categoriesWithBooks
}

// Mock reviews data - we'll keep this since Google Books API doesn't provide reviews
const reviews: Record<string, Review[]> = {
  default: [
    {
      id: "r1",
      bookId: "default",
      user: {
        id: "u1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      content: "This book completely changed my perspective. The writing style is beautiful and engaging.",
      date: "2023-05-15T14:30:00Z",
    },
    {
      id: "r2",
      bookId: "default",
      user: {
        id: "u2",
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      content:
        "A thought-provoking read that makes you reflect. I highly recommend it to anyone interested in this genre.",
      date: "2023-04-22T09:15:00Z",
    },
  ],
}

// Get book reviews - still using mock data
export async function getBookReviews(bookId: string): Promise<Review[]> {
  // In a real app, this would fetch reviews from a database
  return reviews[bookId] || reviews["default"] || []
}

