import { APIService } from '@/services/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
   
  const produtos = await APIService.getData('produtos',{page:1,pageSize:1})
    
    return NextResponse.json(
        {  produtos },
        { status: 200 }
      )
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch produtos' },
      { status: 500 }
    )
  }
}
  