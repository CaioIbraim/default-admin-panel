import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

export class APIService {
  static async fetchWithError<T>(
    promise: PostgrestFilterBuilder<any, any, any>
  ): Promise<T> {
    const { data, error } = await promise;
    if (error) throw new Error(error.message);
    return data as T;
  }

  private static assertSupabaseActive() {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error(
        'Supabase não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para ativar os dados remotos.'
      );
    }
  }

  static async getData<T>(table: string, query?: string) {
    this.assertSupabaseActive();
    return supabase.from(table).select(query || '*');
  }

  static async insertData<T>(table: string, data: Partial<T>) {
    this.assertSupabaseActive();
    const result = supabase.from(table).insert(data).select();
    return this.fetchWithError(result as PostgrestFilterBuilder<any, any, any>);
  }

  static async updateData<T>(table: string, id: number, data: Partial<T>) {
    this.assertSupabaseActive();
    const result = supabase.from(table).update(data).eq('id', id).select();
    return this.fetchWithError(result as PostgrestFilterBuilder<any, any, any>);
  }

  static async deleteData(table: string, id: number) {
    this.assertSupabaseActive();
    const result = supabase.from(table).delete().eq('id', id);
    return this.fetchWithError(result);
  }
}
