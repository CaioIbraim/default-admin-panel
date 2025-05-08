import { supabase } from '@/lib/supabaseClient'
import { APIService } from '@/services/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
   
    const { data, error, count } = await supabase
    .from('servicos')
    .select('*', { count: 'exact' })
    
    return NextResponse.json(
        {  data }
      )
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cursos' },
      { status: 500 }
    )
  }
}
  