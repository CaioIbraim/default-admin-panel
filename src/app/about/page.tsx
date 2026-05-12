import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Zap, Users, Award, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Sobre | Caio Ibraim",
  description: "Conheca Caio Ibraim - Desenvolvedor e especialista em automacao inteligente para pequenos negocios.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm">
                <Users className="h-3.5 w-3.5" />
                <span className="text-muted-foreground">Sobre mim</span>
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                Caio Ibraim
              </h1>
              
              <p className="mt-2 text-xl text-muted-foreground">
                Desenvolvedor e Especialista em Automacao
              </p>
              
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Sou apaixonado por tecnologia e pela possibilidade de transformar negocios 
                atraves de solucoes inteligentes. Com anos de experiencia em desenvolvimento 
                web e automacao de processos, ajudo pequenos empreendedores a escalarem 
                suas operacoes sem complicacao.
              </p>
              
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Minha missao e democratizar o acesso a tecnologia de ponta, criando 
                solucoes que antes so estavam disponiveis para grandes empresas. 
                Acredito que todo negocio merece operar com eficiencia e inteligencia.
              </p>
              
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link 
                  href="https://wa.me/5521968974968?text=Ol%C3%A1%20Caio!%20Conheci%20seu%20trabalho%20e%20gostaria%20de%20conversar." 
                  target="_blank"
                >
                  <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Entrar em Contato
                  </Button>
                </Link>
                <Link href="/automacao">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto">
                    Ver Servicos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border/40 shadow-2xl">
                <Image
                  src="/images/about-profile.jpg"
                  alt="Caio Ibraim"
                  width={500}
                  height={625}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-secondary/40 blur-3xl" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full border-t border-border/40 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Areas de Atuacao
            </h2>
            <p className="mt-4 text-muted-foreground">
              Combinando desenvolvimento e automacao para entregar resultados reais.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Desenvolvimento Web</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Sites e aplicacoes modernas com Next.js, React e as melhores 
                tecnologias do mercado.
              </p>
            </div>
            
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Automacao com IA</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Chatbots, integracao de sistemas e automacao de processos 
                utilizando inteligencia artificial.
              </p>
            </div>
            
            <div className="group relative rounded-2xl border border-border/40 bg-card p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Treinamentos</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Capacitacao em desenvolvimento e automacao para quem 
                quer dominar as ferramentas do futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full border-t border-border/40 bg-secondary/20 py-24 md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-lg">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Meus Valores
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada projeto que desenvolvo carrega esses principios fundamentais 
                que guiam meu trabalho e relacionamento com clientes.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  title: "Transparencia Total",
                  description: "Comunicacao clara em todas as etapas do projeto. Voce sempre sabe o que esta acontecendo."
                },
                {
                  title: "Resultados Mensuraveis",
                  description: "Foco em metricas reais de impacto. Se nao da para medir, nao da para melhorar."
                },
                {
                  title: "Solucoes sob Medida",
                  description: "Cada negocio e unico. As solucoes tambem devem ser personalizadas para suas necessidades."
                },
                {
                  title: "Suporte Continuo",
                  description: "O relacionamento nao termina na entrega. Estou sempre disponivel para ajudar."
                }
              ].map((value, i) => (
                <div key={i} className="rounded-xl border border-border/40 bg-card p-6">
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-t border-border/40 bg-foreground py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Vamos trabalhar juntos?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Estou sempre aberto a novos projetos e parcerias. 
              Entre em contato e vamos conversar sobre como posso ajudar seu negocio.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link 
                href="https://wa.me/5521968974968?text=Ol%C3%A1%20Caio!%20Gostaria%20de%20conversar%20sobre%20um%20projeto." 
                target="_blank"
              >
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: (21) 96897-4968
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base border-background/20 text-background hover:bg-background/10 hover:text-background">
                  Ver Treinamentos
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
