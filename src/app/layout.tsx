import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Caio Ibraim | Solucoes Inteligentes para Negocios",
  description:
    "Automacao inteligente e treinamentos para pequenos empreendedores. Otimize seu tempo e maximize seus lucros.",
  openGraph: {
    title: "Caio Ibraim | Solucoes Inteligentes para Negocios",
    description:
      "Automacao inteligente e treinamentos para pequenos empreendedores. Otimize seu tempo e maximize seus lucros.",
    url: "https://caioibraim.com.br",
    siteName: "Caio Ibraim",
    images: [
      {
        url: "https://caioibraim.com.br/images/logo-caio-ibraim.png",
        width: 800,
        height: 600,
        alt: "Logo Caio Ibraim",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caio Ibraim | Solucoes Inteligentes para Negocios",
    description:
      "Automacao inteligente e treinamentos para pequenos empreendedores. Otimize seu tempo e maximize seus lucros.",
    images: ["https://caioibraim.com.br/images/logo-caio-ibraim.png"],
    creator: "@CaioIbraim",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* Header - Clean and minimal */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <img 
                      src="/images/logo-caio-ibraim.png" 
                      alt="Logo Caio Ibraim" 
                      width={40} 
                      height={40}
                      className="rounded-lg" 
                    />
                    <span className="text-lg font-semibold tracking-tight">Caio Ibraim</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link 
                      href="/automacao" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Automacao
                    </Link>
                    <Link 
                      href="/courses" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Treinamentos
                    </Link>
                    <Link 
                      href="/about" 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Sobre
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="text-sm">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="text-sm">
                      Cadastrar-se
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>

            {/* Footer - Minimal */}
            <footer className="border-t border-border/40">
              <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row md:py-0">
                <p className="text-sm text-muted-foreground">
                  © 2025 Caio Ibraim. Todos os direitos reservados.
                </p>
                <nav className="flex items-center gap-6">
                  <Link 
                    href="/automacao" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Automacao
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Termos
                  </Link>
                  <Link 
                    href="/privacy" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacidade
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contato
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
