import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, Users, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Clean and Bold */}
      <section className="relative w-full py-24 md:py-32 lg:py-40">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-muted-foreground">Plataforma de aprendizado</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Aprenda habilidades para o futuro
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Treinamentos de alta qualidade ministrados por profissionais experientes. 
              Estude no seu ritmo e impulsione sua carreira.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="https://v0-app-briefing-form.vercel.app/" target="_blank">
                <Button size="lg" className="h-12 px-8 text-base">
                  Iniciar Briefing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Ver Treinamentos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Por que escolher nossa plataforma
            </h2>
            <p className="mt-4 text-muted-foreground">
              Oferecemos as ferramentas e recursos necessários para você se destacar.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Treinamentos personalizados</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Tenha acesso a treinamentos focados especificamente para melhor desenvolvimento de suas habilidades.
              </p>
            </div>
            
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Instrutoria especializada</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Aprenda com profissionais renomados, com anos de experiência prática no mercado.
              </p>
            </div>
            
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Comunidade ativa</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Participe de uma comunidade engajada e receba apoio durante sua jornada de aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full border-t border-border/40 bg-secondary/20 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Treinamentos em destaque
            </h2>
            <p className="mt-4 text-muted-foreground">
              Confira nossos treinamentos mais populares e comece a aprender ainda hoje.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/courses/${i}`} className="group">
                <article className="overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-300 hover:border-border hover:shadow-lg">
                  <div className="aspect-video w-full overflow-hidden bg-secondary">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=Curso+${i}`}
                      alt={`Curso ${i}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold">Curso de Desenvolvimento Web</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      Domine técnicas modernas de desenvolvimento web do zero ao avançado.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold">R$ 49,99</span>
                      <span className="text-xs text-muted-foreground">4.8 (120 avaliações)</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="h-12 px-8">
                Ver todos os treinamentos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para começar seu projeto?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Preencha nosso briefing e vamos transformar suas ideias em realidade.
            </p>
            <div className="mt-8">
              <Link href="https://v0-app-briefing-form.vercel.app/" target="_blank">
                <Button size="lg" className="h-12 px-8 text-base">
                  Iniciar Briefing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
