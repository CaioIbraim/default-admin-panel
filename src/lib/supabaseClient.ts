import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
  else return (bytes / 1073741824).toFixed(1) + ' GB'
}

