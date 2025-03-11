"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

export function MainNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span>Quill Ink</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={`transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary font-medium" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/books"
            className={`transition-colors hover:text-primary ${
              pathname === "/books" || pathname.startsWith("/books/")
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            Books
          </Link>
          <Link
            href="/categories"
            className={`transition-colors hover:text-primary ${
              pathname === "/categories" ? "text-primary font-medium" : "text-muted-foreground"
            }`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary font-medium" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <Link href={user ? "/account" : "/account/login"}>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

