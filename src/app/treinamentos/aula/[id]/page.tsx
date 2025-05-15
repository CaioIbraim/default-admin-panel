'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

interface LessonData {
  title: string
  description: string
  video_url?: string
  content: string
  images?: string[]
}

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
       
        const { data, error } = await supabase
        .from('aulas')
        .select('*')
        .eq('id', id);
        if (error) {
          throw error
        }
        setLesson(data[0] as LessonData)
      } catch (error) {
        console.error('Error fetching lesson data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLessonData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!lesson) {
    return <div>Aula não encontrada</div>
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{lesson.titulo}</h1>
        
        {lesson.iframe && (
          <div className="mb-6">
            <div className="relative aspect-video">
                <div dangerouslySetInnerHTML={{ __html: lesson.iframe }} />
            </div>
          </div>
        )}

        <ScrollArea className="h-[400px] mb-6">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">{lesson.texto}</p>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        </ScrollArea>

        {lesson.images && lesson.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.images.map((imageUrl, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={`Lesson image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </Card>


      <div className="mt-6 flex justify-end">
        <button
          onClick={async () => {
            try {
              const { error } = await supabase
                .from('aulas_concluidas')
                .insert([
                  {
                    aula_id: id,
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    completed_at: new Date().toISOString()
                  }
                ]);
              
              if (error) throw error;
              
              alert('Aula marcada como concluída!');
            } catch (error) {
              console.error('Error marking lesson as completed:', error);
              alert('Erro ao marcar aula como concluída');
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Marcar como Concluída
        </button>
      </div>
    </div>
  )
}
