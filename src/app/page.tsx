import Link from "next/link"
import { ArrowRight, BookOpen, Clock3, GraduationCap, ShieldCheck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { COURSE_CATALOG, PLATFORM_HIGHLIGHTS } from "@/lib/course-catalog"

const keyNumbers = [
  { label: "Cursos ativos", value: `${COURSE_CATALOG.length}+` },
  { label: "Carga média", value: "15h" },
  { label: "Nível de satisfação", value: "4.9/5" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative isolate overflow-hidden border-b border-border/40 py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <ShieldCheck className="h-4 w-4" />
                Plataforma de treinamentos e cursos online
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Formação prática para acelerar sua carreira com IA
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Aprenda com trilhas guiadas, projetos reais e conteúdo objetivo. Cursos pensados para quem quer aplicar tecnologia no dia a dia.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/courses">
                  <Button size="lg" className="h-12 px-8">
                    Explorar cursos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://v0-app-briefing-form.vercel.app/" target="_blank">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Falar com especialista
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-medium text-muted-foreground">Destaques desta semana</p>
              <div className="mt-4 space-y-4">
                {COURSE_CATALOG.map((course) => (
                  <article key={course.id} className="rounded-2xl border border-border/40 bg-background/80 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-primary">{course.category}</p>
                        <h2 className="mt-1 text-sm font-semibold leading-snug">{course.title}</h2>
                        <p className="mt-2 text-xs text-muted-foreground">{course.summary}</p>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs">{course.priceLabel}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 rounded-2xl border border-border/50 bg-card/60 p-5 sm:grid-cols-3">
            {keyNumbers.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-bold sm:text-3xl">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Uma estrutura pronta para escalar treinamentos</h2>
            <p className="mt-4 text-muted-foreground">Conteúdo organizado em trilhas, com foco em entrega prática e melhoria contínua.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {PLATFORM_HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-2xl border border-border/40 bg-card p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full border-y border-border/40 bg-secondary/20 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Catálogo de cursos</h2>
            <p className="mt-4 text-muted-foreground">Escolha a trilha ideal para seu momento profissional.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {COURSE_CATALOG.map((course) => (
              <article key={course.id} className="rounded-2xl border border-border/40 bg-card p-6">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> {course.duration}</p>
                  <p className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5" /> {course.modules} módulos</p>
                  <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> {course.level}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl bg-foreground px-8 py-14 text-center text-background">
            <GraduationCap className="mx-auto h-8 w-8" />
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">Quer transformar esse projeto em uma LMS completa?</h2>
            <p className="mt-4 text-background/75">Com o banco restabelecido, a plataforma pode evoluir para matrículas, progresso, certificados e comunidade.</p>
            <Link href="/courses" className="mt-8 inline-block">
              <Button size="lg" variant="secondary" className="h-12 px-8">Começar agora</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
