import { APIService } from '@/services/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
   
  const treinamentos = await APIService.getData('treinamentos',{page:1,pageSize:1})
    
    return NextResponse.json(
        {  treinamentos },
        { status: 200 }
      )
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cursos' },
      { status: 500 }
    )
  }
}
  