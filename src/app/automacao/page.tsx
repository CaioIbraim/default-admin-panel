import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Clock, TrendingDown, MessageCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Automacao Inteligente | Caio Ibraim",
  description: "Otimize seu tempo e maximize seus lucros com automacao inteligente para pequenos empreendedores.",
}

export default function AutomacaoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-muted-foreground">Automacao para negocios</span>
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Otimize seu Tempo, Maximize seus Lucros
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                Como pequeno empreendedor, seu tempo e o seu recurso mais valioso. 
                Voce ainda gasta horas em tarefas manuais e repetitivas?
              </p>
              
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A automacao inteligente e o segredo para escalar sua operacao sem precisar 
                contratar uma equipe gigante. E a tecnologia trabalhando para voce 
                <strong className="text-foreground"> 24 horas por dia, 7 dias por semana</strong>.
              </p>
              
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link 
                  href="https://wa.me/5521968974968?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20automa%C3%A7%C3%A3o." 
                  target="_blank"
                >
                  <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Orcamento
                  </Button>
                </Link>
                <Link href="https://v0-app-briefing-form.vercel.app/" target="_blank">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto">
                    Preencher Briefing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="aspect-square overflow-hidden rounded-3xl border border-border/40 shadow-2xl">
                <Image
                  src="/images/automation-hero.jpg"
                  alt="Automacao Inteligente"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border/40 bg-card p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">-70%</p>
                    <p className="text-sm text-muted-foreground">Reducao de custos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/4 translate-x-1/4 rounded-full bg-secondary/40 blur-3xl" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Por que automatizar agora?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Descubra como a automacao pode transformar a rotina do seu negocio.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Benefit 1 */}
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Reducao Drastica de Erros</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Elimine falhas humanas em processos criticos de vendas e cadastro. 
                Sistemas automatizados garantem precisao e consistencia em cada operacao.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Atendimento Instantaneo</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Responda seus leads e clientes no momento exato do interesse, 
                aumentando drasticamente as taxas de conversao e satisfacao.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Foco no que Importa</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Liberte-se de tarefas burocraticas para focar na estrategia 
                e no crescimento do seu negocio. Seu tempo vale mais.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Reducao de Custos Operacionais</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Execute mais processos com menos recursos manuais. 
                Escale seu negocio sem aumentar proporcionalmente os custos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Section with Dashboard */}
      <section className="w-full border-t border-border/40 bg-secondary/20 py-24 md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-border/40 shadow-2xl">
                <Image
                  src="/images/automation-dashboard.jpg"
                  alt="Dashboard de Automacao"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 max-w-lg lg:order-2">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Visibilidade total do seu negocio
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Com dashboards personalizados, voce acompanha cada metrica importante 
                em tempo real e toma decisoes baseadas em dados.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Monitoramento de vendas em tempo real",
                  "Alertas automaticos para acoes urgentes",
                  "Relatorios detalhados por periodo",
                  "Integracao com suas ferramentas favoritas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-foreground" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-lg">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Fluxos de trabalho inteligentes
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada processo do seu negocio pode ser automatizado e otimizado. 
                Do primeiro contato ate o pos-venda, tudo funcionando em harmonia.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Captura e qualificacao automatica de leads",
                  "Disparo de mensagens personalizadas",
                  "Gestao automatizada de follow-ups",
                  "Integracao com CRM e ferramentas de vendas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-foreground" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="overflow-hidden rounded-2xl border border-border/40 shadow-2xl">
                <Image
                  src="/images/automation-workflow.jpg"
                  alt="Fluxos de Automacao"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-t border-border/40 bg-foreground py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Pronto para transformar sua rotina?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Pare de perder tempo com processos travados. 
              Vamos construir a solucao que o seu negocio precisa para decolar.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link 
                href="https://wa.me/5521968974968?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20automa%C3%A7%C3%A3o." 
                target="_blank"
              >
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: (21) 96897-4968
                </Button>
              </Link>
              <Link href="https://devcaioibraim.vercel.app" target="_blank">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base border-background/20 text-background hover:bg-background/10 hover:text-background">
                  Visitar Site
                  <ArrowRight className="ml-2 h-4 w-4" />
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
