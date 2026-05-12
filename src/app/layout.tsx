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
  title: "@DevCaioIbraim - Plataforma de Cursos Online",
  description:
    "Uma plataforma completa de aprendizagem online construída com Next.js. Aprenda no seu ritmo com cursos de alta qualidade.",
  openGraph: {
    title: "@DevCaioIbraim - Plataforma de Cursos Online",
    description:
      "Domine novas habilidades com nossos cursos ministrados por especialistas. Estude no seu tempo e cresça na sua carreira.",
    url: "https://devcaioibraim.vercel.app",
    siteName: "DevCaioIbraim",
    images: [
      {
        url: "https://devcaioibraim.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "Logo DevCaioIbraim",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevCaioIbraim - Plataforma de Cursos Online",
    description:
      "Domine novas habilidades com nossos cursos ministrados por especialistas. Estude no seu tempo e cresça na sua carreira.",
    images: ["https://devcaioibraim.vercel.app/logo.png"],
    creator: "@DevCaioIbraim",
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
                      src="/logo.png" 
                      alt="Logo DevCaioIbraim" 
                      width={40} 
                      height={40}
                      className="rounded-lg" 
                    />
                    <span className="text-lg font-semibold tracking-tight">DevCaioIbraim</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6">
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
                  © 2025 DevCaioIbraim. Todos os direitos reservados.
                </p>
                <nav className="flex items-center gap-6">
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
