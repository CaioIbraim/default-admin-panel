import { BookOpen, Code2, Cog, type LucideIcon, Zap } from "lucide-react"

export type CourseCatalogItem = {
  id: string
  title: string
  summary: string
  description: string
  image: string
  duration: string
  modules: number
  level: string
  category: "Desenvolvimento" | "Automação" | "IA aplicada"
  icon: LucideIcon
  topics: string[]
  priceLabel: string
  rating: string
}

export const COURSE_CATALOG: CourseCatalogItem[] = [
  {
    id: "desenvolvimento-web-ia-qwen",
    title: "Desenvolvimento Web com IA - QWEN",
    summary: "Construa aplicações web modernas com fluxos assistidos por IA.",
    description:
      "Aprenda a criar aplicações web modernas utilizando inteligência artificial QWEN para acelerar entregas e criar interfaces inteligentes.",
    image: "/images/course-web-ai.jpg",
    duration: "12 horas",
    modules: 8,
    level: "Intermediário",
    category: "IA aplicada",
    icon: Code2,
    topics: [
      "Introdução ao QWEN e modelos de IA",
      "Integração com Next.js e React",
      "Criação de chatbots inteligentes",
      "Geração de código com IA",
      "Otimização de prompts",
      "Deploy e produção",
    ],
    priceLabel: "Gratuito",
    rating: "4.9 (124 avaliações)",
  },
  {
    id: "desenvolvimento-fullstack-ia",
    title: "Desenvolvimento FullStack com IA",
    summary: "Da arquitetura ao deploy com IA em todas as etapas.",
    description:
      "Domine o desenvolvimento completo de aplicações, do frontend ao backend, utilizando ferramentas de IA para maximizar sua produtividade.",
    image: "/images/course-fullstack.jpg",
    duration: "20 horas",
    modules: 12,
    level: "Intermediário a avançado",
    category: "Desenvolvimento",
    icon: Zap,
    topics: [
      "Arquitetura FullStack moderna",
      "Frontend com React e Next.js",
      "Backend com Node.js e APIs",
      "Banco de dados e ORM",
      "Autenticação e segurança",
      "CI/CD e DevOps com IA",
    ],
    priceLabel: "Gratuito",
    rating: "4.8 (97 avaliações)",
  },
  {
    id: "automacao-processos-ia",
    title: "Automação de Processos com IA",
    summary: "Automatize tarefas e ganhe escala operacional.",
    description:
      "Transforme a operação do seu negócio automatizando tarefas repetitivas e criando fluxos inteligentes com inteligência artificial.",
    image: "/images/course-automation.jpg",
    duration: "15 horas",
    modules: 10,
    level: "Iniciante a intermediário",
    category: "Automação",
    icon: Cog,
    topics: [
      "Fundamentos de automação",
      "Ferramentas no-code e low-code",
      "Integração de sistemas",
      "Chatbots e atendimento automatizado",
      "Automação de marketing",
      "Métricas e otimização",
    ],
    priceLabel: "Gratuito",
    rating: "4.9 (82 avaliações)",
  },
]

export const PLATFORM_HIGHLIGHTS = [
  {
    title: "Trilhas orientadas por projeto",
    description:
      "Você aprende criando projetos reais, com desafios curtos e aplicáveis ao seu contexto profissional.",
    icon: BookOpen,
  },
  {
    title: "Mentoria prática",
    description:
      "Instrutores ativos no mercado para acelerar decisões técnicas e evitar retrabalho.",
    icon: Code2,
  },
  {
    title: "Automação para produtividade",
    description:
      "Use IA para documentar, testar, codar e automatizar rotinas do dia a dia.",
    icon: Cog,
  },
]
