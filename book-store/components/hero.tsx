import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-up">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Discover Your Next Favorite Book
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our vast collection of books across all genres. From bestsellers to hidden gems, find your
                perfect read today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/books">
                <Button size="lg" className="px-8">
                  Browse Books
                </Button>
              </Link>
              <Link href="/account/register">
                <Button size="lg" variant="outline" className="px-8">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center animate-fade-up animation-delay-200">
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] w-[180px] h-[250px] md:w-[220px] md:h-[320px] bg-primary rounded-md shadow-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[3deg] w-[180px] h-[250px] md:w-[220px] md:h-[320px] bg-secondary rounded-md shadow-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[250px] md:w-[220px] md:h-[320px] bg-card rounded-md shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-primary/50 to-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Quill Ink</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

