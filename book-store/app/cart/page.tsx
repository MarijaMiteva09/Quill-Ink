"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")

  const subtotal = cart.reduce((total, item) => total + item.book.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 4.99 : 0
  const total = subtotal + shipping

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Coupon ${couponCode} would be applied here`)
    setCouponCode("")
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
        <div className="max-w-md p-8 mx-auto border rounded-lg">
          <p className="mb-6 text-lg text-muted-foreground">Your cart is empty</p>
          <Button asChild>
            <Link href="/books">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.book.id} className="p-4 border rounded-lg">
                <div className="flex flex-wrap gap-4">
                  <div className="relative w-20 h-28 overflow-hidden bg-gray-100 rounded">
                    {item.book.coverImage ? (
                      <Image
                        src={item.book.coverImage || "/placeholder.svg"}
                        alt={item.book.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <span className="text-xs text-gray-500">No cover</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <Link href={`/books/${item.book.id}`} className="font-medium hover:underline">
                      {item.book.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">by {item.book.author}</p>
                    <p className="font-medium">{formatCurrency(item.book.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => updateQuantity(item.book.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.book.id, Number.parseInt(e.target.value) || 1)}
                      className="w-14 h-8 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => removeFromCart(item.book.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button asChild variant="outline">
              <Link href="/books">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="outline">
                  Apply
                </Button>
              </form>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Button className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

