'use client'
import Link from "next/link"
import { supabase } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Home() {
  const [trainings, setTrainings] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTrainings()
  }, [])

  // Fetch trainings data from Supabase
  async function fetchTrainings() {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .eq('categoria_id',1)
        .eq('status',true)
        
    
      if (error) {
        console.error('Error fetching trainings:', error)
        return
      }
    
      if (data) {
        setTrainings(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredTrainings = trainings.filter(training =>
    training.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Principais Treinamentos e Tutorias</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Explore nossos treinamentos mais populares e comece a aprender hoje. 
              </p>
            </div>
            
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar tutorias, treinamentos, cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8"
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainings.map((training, index) => (
              <Link key={index} href={`/treinamentos/${training.id}`} className="group">
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={training.banner_url	 || `/placeholder.svg?height=400&width=600&text=Course+${index}`}
                      alt={training.titulo	 || `Course ${index}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{training.titulo	}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {training.descricao	}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">R${training.valor ||	'00,00'}</span>
                      <span className="text-xs text-slate-500">{training.rating} ★ ({training.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Duração: {training.carga_horaria} hr</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
