import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Play } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Treinamento - DevCaioIbraim",
  description: "Centro de treinamentos online",
}

export default function TreinamentoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                      <Play className="h-5 w-5 text-background" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">Treinamento</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link 
                      href="/treinamento/modulos" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Modulos
                    </Link>
                    <Link 
                      href="/treinamento/exercicios" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Exercicios
                    </Link>
                    <Link 
                      href="/treinamento/avaliacao" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Avaliacao
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="text-sm">
                      Voltar ao Inicio
                    </Button>
                  </Link>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                    <span className="text-sm font-medium">U</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>

            {/* Footer */}
            <footer className="border-t border-border/40">
              <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-16 md:flex-row md:py-0">
                <p className="text-sm text-muted-foreground">
                  © 2025 DevCaioIbraim. Centro de Treinamentos.
                </p>
                <nav className="flex items-center gap-6">
                  <Link 
                    href="/help" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Ajuda
                  </Link>
                  <Link 
                    href="/support" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Suporte
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
