"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  BarChart3, 
  Users, 
  Building2, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, Bar } from "react-chartjs-2"
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface PagamentoPorDia {
  created_at: string
  count: number
}

interface AssociadoPorMes {
  month: string
  count: number
}

export default function InicioPage() {
  const [totalPagamentos, setTotalPagamentos] = useState<number>(0)
  const [totalEmpresas, setTotalEmpresas] = useState<number>(0)
  const [totalAssociados, setTotalAssociados] = useState<number>(0)
  const [pagamentosPorDia, setPagamentosPorDia] = useState<PagamentoPorDia[]>([])
  const [associadosPorMes, setAssociadosPorMes] = useState<AssociadoPorMes[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setTotalPagamentos(150)
      setTotalEmpresas(25)
      setTotalAssociados(300)

      setPagamentosPorDia([
        { created_at: "2024-09-01", count: 10 },
        { created_at: "2024-09-02", count: 12 },
        { created_at: "2024-09-03", count: 8 },
        { created_at: "2024-09-04", count: 15 },
        { created_at: "2024-09-05", count: 20 },
        { created_at: "2024-09-06", count: 18 },
        { created_at: "2024-09-07", count: 22 },
      ])

      setAssociadosPorMes([
        { month: "2024-01-01", count: 50 },
        { month: "2024-02-01", count: 55 },
        { month: "2024-03-01", count: 60 },
        { month: "2024-04-01", count: 65 },
        { month: "2024-05-01", count: 70 },
        { month: "2024-06-01", count: 75 },
        { month: "2024-07-01", count: 80 },
        { month: "2024-08-01", count: 85 },
        { month: "2024-09-01", count: 90 },
      ])

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const pagamentosData = {
    labels: pagamentosPorDia.map((item) => 
      new Date(item.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    ),
    datasets: [
      {
        label: "Pagamentos",
        data: pagamentosPorDia.map((item) => item.count),
        borderColor: "hsl(0, 0%, 20%)",
        backgroundColor: "hsl(0, 0%, 20%, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const associadosData = {
    labels: associadosPorMes.map((item) =>
      new Date(item.month).toLocaleDateString("pt-BR", { month: "short" })
    ),
    datasets: [
      {
        label: "Associados",
        data: associadosPorMes.map((item) => item.count),
        backgroundColor: "hsl(0, 0%, 20%)",
        borderRadius: 6,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "hsl(0, 0%, 45%)",
        },
      },
      y: {
        grid: {
          color: "hsl(0, 0%, 90%)",
        },
        ticks: {
          color: "hsl(0, 0%, 45%)",
        },
      },
    },
  }

  const stats = [
    {
      title: "Pagamentos do Mes",
      value: totalPagamentos,
      icon: CreditCard,
      trend: { value: 12, isPositive: true },
      description: "vs. mes anterior",
    },
    {
      title: "Repasses do Mes",
      value: totalPagamentos,
      icon: Activity,
      trend: { value: 8, isPositive: true },
      description: "vs. mes anterior",
    },
    {
      title: "Empresas Ativas",
      value: totalEmpresas,
      icon: Building2,
      trend: { value: 5, isPositive: true },
      description: "cadastradas",
    },
    {
      title: "Associados Ativos",
      value: totalAssociados,
      icon: Users,
      trend: { value: 15, isPositive: true },
      description: "vs. mes anterior",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Inicio</h1>
        <p className="text-muted-foreground">Visao geral do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/40 transition-all duration-200 hover:border-border hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? "..." : stat.value}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className={`flex items-center text-xs font-medium ${
                  stat.trend.isPositive ? "text-emerald-600" : "text-red-600"
                }`}>
                  {stat.trend.isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.trend.value}%
                </span>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="text-base">Pagamentos por Dia</CardTitle>
            <CardDescription>Ultimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={pagamentosData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="text-base">Associados por Mes</CardTitle>
            <CardDescription>Evolucao anual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={associadosData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
