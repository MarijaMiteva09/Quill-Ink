"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/types/book"
import { useAuth } from "@/hooks/use-auth"

interface CartItem {
  book: Book
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (book: Book, quantity: number) => Promise<void>
  updateQuantity: (bookId: string, quantity: number) => Promise<void>
  removeFromCart: (bookId: string) => Promise<void>
  clearCart: () => Promise<void>
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart([])
      setItemCount(0)
    }
  }, [user])

  const fetchCart = async () => {
    if (!user) return
    try {
      const response = await fetch(`/api/cart?userId=${user.id}`)
      const data = await response.json()
      if (data.success) {
        setCart(data.cart)
        setItemCount(calculateItemCount(data.cart))
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    }
  }

  const calculateItemCount = (cartItems: CartItem[]) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const addToCart = async (book: Book, quantity: number) => {
    if (!user) throw new Error("User must be logged in to add to cart")
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bookId: book.id, quantity }),
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.cart)
        setItemCount(calculateItemCount(data.cart))
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
      throw error
    }
  }

  const updateQuantity = async (bookId: string, quantity: number) => {
    if (!user) throw new Error("User must be logged in to update cart")
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bookId, quantity }),
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.cart)
        setItemCount(calculateItemCount(data.cart))
      }
    } catch (error) {
      console.error("Failed to update cart:", error)
      throw error
    }
  }

  const removeFromCart = async (bookId: string) => {
    if (!user) throw new Error("User must be logged in to remove from cart")
    try {
      const response = await fetch(`/api/cart?userId=${user.id}&bookId=${bookId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.cart)
        setItemCount(calculateItemCount(data.cart))
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error)
      throw error
    }
  }

  const clearCart = async () => {
    if (!user) throw new Error("User must be logged in to clear cart")
    try {
      // Assuming the API supports clearing the entire cart
      const response = await fetch(`/api/cart?userId=${user.id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setCart([])
        setItemCount(0)
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

