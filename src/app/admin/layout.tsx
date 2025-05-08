import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { BookOpen, Search } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LearnHub - Online Course Platform",
  description: "A comprehensive online learning platform built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-xl font-bold">CaioBraim</span>
                  </Link>
                  <nav className="hidden md:flex gap-6 ml-6">
                    <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4">
                      Courses
                    </Link>
                    <Link href="/instructors" className="text-sm font-medium hover:underline underline-offset-4">
                      Instructors
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                      About
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden md:flex">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search courses..." className="w-[200px] lg:w-[300px] pl-8" />
                  </div>
                  
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              </div>
            </header>
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2023 LearnHub. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Terms
                  </Link>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Privacy
                  </Link>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Contact
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
