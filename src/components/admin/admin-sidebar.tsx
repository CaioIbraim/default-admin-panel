"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FolderOpen,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  GraduationCap,
  FileText,
  CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Inicio", href: "/admin/inicio", icon: LayoutDashboard },
  { name: "Alunos", href: "/admin/alunos", icon: Users },
  { name: "Cursos", href: "/admin/cursos", icon: BookOpen },
  { name: "Categorias", href: "/admin/categorias", icon: FolderOpen },
  { name: "Inscricoes", href: "/admin/inscricoes", icon: GraduationCap },
  { name: "Pagamentos", href: "/admin/pagamentos", icon: CreditCard },
  { name: "Relatorios", href: "/admin/relatorios", icon: FileText },
]

const secondaryNavigation = [
  { name: "Configuracoes", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside 
      className={cn(
        "flex h-screen flex-col border-r border-border/40 bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <span className="text-sm font-bold text-background">A</span>
            </div>
            <span className="font-semibold">Admin</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onToggle}
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="border-t border-border/40 p-3">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
        
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
