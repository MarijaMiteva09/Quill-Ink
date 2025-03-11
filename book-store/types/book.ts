export interface Book {
  id: string
  title: string
  author: string
  description: string
  price: number
  originalPrice?: number
  coverImage?: string | null
  rating: number
  inStock: boolean
  format: string
  pages: number
  isbn: string
  publisher: string
  publicationDate: string
  genres: string[]
}

export interface Review {
  id: string
  bookId: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  rating: number
  content: string
  date: string
}

