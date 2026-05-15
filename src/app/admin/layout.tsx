"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Menu, Bell, Search } from "lucide-react"
import { useState } from "react"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen overflow-hidden">
            {/* Mobile sidebar overlay */}
            {mobileSidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}

            {/* Sidebar - Desktop */}
            <div className="hidden lg:flex">
              <AdminSidebar 
                collapsed={sidebarCollapsed} 
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
              />
            </div>

            {/* Sidebar - Mobile */}
            <div 
              className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <AdminSidebar 
                collapsed={false} 
                onToggle={() => setMobileSidebarOpen(false)} 
              />
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top header */}
              <header className="flex h-16 items-center justify-between border-b border-border/40 bg-card px-4 lg:px-6">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden"
                    onClick={() => setMobileSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  
                  <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-3 py-1.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar..." 
                      className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-foreground" />
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-muted-foreground">Administrador</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                      <span className="text-sm font-medium">A</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Page content */}
              <main className="flex-1 overflow-auto bg-background">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
