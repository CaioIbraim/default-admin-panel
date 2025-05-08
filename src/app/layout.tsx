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
  title: "@DevCaioIbraim - Plataforma de Cursos Online",
  description:
    "Uma plataforma completa de aprendizagem online construída com Next.js. Aprenda no seu ritmo com cursos de alta qualidade.",
  openGraph: {
    title: "@DevCaioIbraim - Plataforma de Cursos Online",
    description:
      "Domine novas habilidades com nossos cursos ministrados por especialistas. Estude no seu tempo e cresça na sua carreira.",
    url: "https://devcaioibraim.vercel.app ", // Substitua pela URL real do seu site
    siteName: "DevCaioIbraim",
    images: [
      {
        url: "https://devcaioibraim.vercel.app/logo.png ", // Substitua pela URL da sua logo
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
    images: ["https://DevCaioIbraim.devcaioibraim.com/logo.png "], // URL da imagem
    creator: "@DevCaioIbraim",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo DevCaioIbraim" width={82} height={82} />
                    <span className="text-xl font-bold">@DevCaioIbraim</span>
                  </Link>
                  <nav className="hidden md:flex gap-6 ml-6">
                    <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4">
                      Treinamentos
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  {/* <div className="relative hidden md:flex">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar cursos..." className="w-[200px] lg:w-[300px] pl-8" />
                  </div> */}

                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Cadastrar-se</Button>
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
                  © 2025 DevCaioIbraim. Todos os direitos reservados.
                </p>
                <div className="flex gap-4">
                  <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Termos
                  </Link>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Privacidade
                  </Link>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                    Contato
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