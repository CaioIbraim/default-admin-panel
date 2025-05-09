import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Aprenda habilidades para o futuro
                </h1>
                <p className="max-w-[600px] text-slate-500 md:text-xl dark:text-slate-400">
                  treinamentos de alta qualidade ministrados por profissionais experientes. Estude no seu ritmo e impulsione sua carreira.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/courses">
                  <Button size="lg" className="gap-1.5">
                    Ver treinamentos Disponíveis <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline">
                    Começar Grátis
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <img
                  src="/3.jpg"
                  alt="Plataforma de aprendizagem"
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Por que escolher nossa plataforma</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                Oferecemos as ferramentas e recursos necessários para você se destacar no mercado competitivo de hoje.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <BookOpen className="h-8 w-8 text-slate-900 dark:text-slate-50" />
              </div>
              <h3 className="text-xl font-bold">Treinamentos personalizados</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tenha acesso a treinamentos focados especificamente para melhor desenvolvimento de suas habilidades.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <GraduationCap className="h-8 w-8 text-slate-900 dark:text-slate-50" />
              </div>
              <h3 className="text-xl font-bold">Instrutoria especializada</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aprenda com profissionais renomados, com anos de experiência prática.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Users className="h-8 w-8 text-slate-900 dark:text-slate-50" />
              </div>
              <h3 className="text-xl font-bold">Comunidade ativa</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Participe de uma comunidade engajada e receba apoio durante sua jornada de aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Treinamentos em destaque</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                Confira nossos treinamentos mais populares e comece a aprender ainda hoje.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/courses/${i}`} className="group">
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=Curso+${i}`}
                      alt={`Curso ${i}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Curso de Desenvolvimento Web</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      Domine técnicas modernas de desenvolvimento web do zero
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">R$ 49,99</span>
                      <span className="text-xs text-slate-500">4.8 ★ (120 avaliações)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                Ver Todos os treinamentos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}