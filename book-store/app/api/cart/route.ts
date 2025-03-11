import { NextResponse } from "next/server"

// Mock database
const cart: { userId: string; items: { bookId: string; quantity: number }[] }[] = []

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
  }

  const userCart = cart.find((c) => c.userId === userId)
  return NextResponse.json({ success: true, cart: userCart?.items || [] })
}

export async function POST(request: Request) {
  const { userId, bookId, quantity } = await request.json()

  if (!userId || !bookId || quantity === undefined) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  }

  let userCart = cart.find((c) => c.userId === userId)
  if (!userCart) {
    userCart = { userId, items: [] }
    cart.push(userCart)
  }

  const existingItem = userCart.items.find((item) => item.bookId === bookId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    userCart.items.push({ bookId, quantity })
  }

  return NextResponse.json({ success: true, cart: userCart.items })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const bookId = searchParams.get("bookId")

  if (!userId || !bookId) {
    return NextResponse.json({ success: false, message: "User ID and Book ID are required" }, { status: 400 })
  }

  const userCart = cart.find((c) => c.userId === userId)
  if (userCart) {
    userCart.items = userCart.items.filter((item) => item.bookId !== bookId)
  }

  return NextResponse.json({ success: true, cart: userCart?.items || [] })
}

