"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, 
  BookOpen, 
  BarChart3, 
  Users, 
  Building2, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const functionalities = [
  { 
    name: "Termos Tecnicos", 
    href: "/admin/dicionarios/termos", 
    icon: BookOpen, 
    description: "Acesse o dicionario de termos tecnicos" 
  },
  { 
    name: "Relatorios", 
    href: "/admin/relatorios", 
    icon: BarChart3, 
    description: "Visualize relatorios e analises" 
  },
  { 
    name: "Usuarios", 
    href: "/admin/usuarios", 
    icon: Users, 
    description: "Gestao de usuarios" 
  },
]

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="border-border/40 transition-all duration-200 hover:border-border hover:shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`flex items-center text-xs font-medium ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}>
              {trend.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.value}%
            </span>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [filteredFunctions, setFilteredFunctions] = useState(functionalities)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    payments: 120,
    companies: 10,
    associates: 200
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setFilteredFunctions(
      functionalities.filter((func) =>
        func.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pesquisar funcionalidades..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Pagamentos do Mes"
          value={isLoading ? "..." : stats.payments}
          description="vs. mes anterior"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Empresas Ativas"
          value={isLoading ? "..." : stats.companies}
          description="empresas cadastradas"
          icon={Building2}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Associados Ativos"
          value={isLoading ? "..." : stats.associates}
          description="vs. mes anterior"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Acesso Rapido</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFunctions.map((func) => (
            <Link key={func.name} href={func.href}>
              <Card className="group cursor-pointer border-border/40 transition-all duration-200 hover:border-border hover:shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-foreground group-hover:text-background">
                      <func.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{func.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{func.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Atividade Recente</h2>
        <Card className="border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8" />
                <p className="text-sm">Nenhuma atividade recente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
