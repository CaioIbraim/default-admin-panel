"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, Users, ArrowRight, MessageCircle, FileText, Zap, Code2, Cog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const courses = [
  {
    id: "desenvolvimento-web-ia-qwen",
    title: "Desenvolvimento Web com IA - QWEN",
    description: "Aprenda a criar aplicacoes web modernas utilizando inteligencia artificial QWEN para acelerar seu desenvolvimento e criar interfaces inteligentes.",
    image: "/images/course-web-ai.jpg",
    duration: "12 horas",
    modules: 8,
    level: "Intermediario",
    icon: Code2,
    topics: [
      "Introducao ao QWEN e modelos de IA",
      "Integracao com Next.js e React",
      "Criacao de chatbots inteligentes",
      "Geracao de codigo com IA",
      "Otimizacao de prompts",
      "Deploy e producao"
    ]
  },
  {
    id: "desenvolvimento-fullstack-ia",
    title: "Desenvolvimento FullStack com IA",
    description: "Domine o desenvolvimento completo de aplicacoes, do frontend ao backend, utilizando ferramentas de IA para maximizar sua produtividade.",
    image: "/images/course-fullstack.jpg",
    duration: "20 horas",
    modules: 12,
    level: "Intermediario a Avancado",
    icon: Zap,
    topics: [
      "Arquitetura FullStack moderna",
      "Frontend com React e Next.js",
      "Backend com Node.js e APIs",
      "Banco de dados e ORM",
      "Autenticacao e seguranca",
      "CI/CD e DevOps com IA"
    ]
  },
  {
    id: "automacao-processos-ia",
    title: "Automacao de Processos com IA",
    description: "Transforme a operacao do seu negocio automatizando tarefas repetitivas e criando fluxos inteligentes com inteligencia artificial.",
    image: "/images/course-automation.jpg",
    duration: "15 horas",
    modules: 10,
    level: "Iniciante a Intermediario",
    icon: Cog,
    topics: [
      "Fundamentos de automacao",
      "Ferramentas no-code e low-code",
      "Integracao de sistemas",
      "Chatbots e atendimento automatizado",
      "Automacao de marketing",
      "Metricas e otimizacao"
    ]
  }
]

function RequestPDFDialog({ course }: { course: typeof courses[0] }) {
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      let formatted = numbers
      if (numbers.length > 2) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
      }
      if (numbers.length > 7) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
      }
      return formatted
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    const numbers = formatted.replace(/\D/g, "")
    setIsValid(numbers.length === 11)
  }

  const handleRequestPDF = () => {
    const message = encodeURIComponent(
      `Ola Caio! Gostaria de solicitar o PDF do curso "${course.title}". Meu WhatsApp: ${phone}`
    )
    window.open(`https://wa.me/5521968974968?text=${message}`, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 px-6">
          <FileText className="mr-2 h-4 w-4" />
          Solicitar PDF Gratuito
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar PDF do Curso</DialogTitle>
          <DialogDescription>
            Informe seu WhatsApp para receber o material gratuito do curso {`"${course.title}"`}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Seu WhatsApp
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(21) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Voce recebera o PDF diretamente no seu WhatsApp.
            </p>
          </div>
          <Button 
            onClick={handleRequestPDF} 
            disabled={!isValid}
            className="w-full h-12"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Enviar Solicitacao
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CoursesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="text-muted-foreground">Treinamentos Gratuitos</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Aprenda Desenvolvimento e Automacao com IA
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
              Cursos 100% gratuitos para voce dominar as tecnologias do futuro. 
              Solicite o PDF e estude no seu ritmo.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-secondary/40 blur-3xl" />
        </div>
      </section>

      {/* Courses Grid */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="space-y-16">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <div 
                  key={course.id}
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="aspect-video overflow-hidden rounded-2xl border border-border/40 shadow-2xl">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className={`max-w-lg ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                      {course.title}
                    </h2>
                    
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules} modulos</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-medium">O que voce vai aprender:</p>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {course.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/courses/${course.id}`}>
                        <Button size="lg" className="h-12 px-6 w-full sm:w-auto">
                          Ver Detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <RequestPDFDialog course={course} />
                    </div>
                    
                    <p className="mt-4 text-xs text-muted-foreground">
                      Curso 100% gratuito. Solicite o PDF e comece a estudar hoje.
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-t border-border/40 bg-foreground py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Duvidas sobre os treinamentos?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Entre em contato e tire suas duvidas. Estou sempre disponivel 
              para ajudar voce a comecar sua jornada.
            </p>
            
            <div className="mt-10">
              <Link 
                href="https://wa.me/5521968974968?text=Ol%C3%A1%20Caio!%20Gostaria%20de%20saber%20mais%20sobre%20os%20treinamentos." 
                target="_blank"
              >
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Button>
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-background/60">
              caioibraim.com.br | Solucoes Inteligentes para Pequenos Grandes Negocios
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
