"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import type { Book } from "@/types/book"
import { useCart } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  book: Book
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(book, quantity)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-r-none"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
          className="w-16 h-10 text-center rounded-none"
        />
        <Button variant="outline" size="icon" className="rounded-l-none" onClick={increaseQuantity}>
          <Plus className="w-4 h-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      <Button className="flex-1 sm:flex-none" onClick={handleAddToCart}>
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
    </div>
  )
}

