import { supabase } from '@/lib/supabaseClient';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { PostgrestError } from '@supabase/supabase-js';

export class APIService {
  static async fetchWithError<T>(
    promise: PostgrestFilterBuilder<any, any, any>
  ): Promise<T> {
    const { data, error } = await promise;
    if (error) throw new Error(error.message);
    return data as T;
  }

  static async getData<T>(table: string, query?: string) {
    const result = supabase
      .from(table)
      .select(query || '*') ;
    return this.fetchWithError(result);
  }

  static async insertData<T>(table: string, data: Partial<T>) {
    const result = supabase
      .from(table)
      .insert(data)
      .select();
    return this.fetchWithError(result as PostgrestFilterBuilder<any, any, any>);
  }

  static async updateData<T>(table: string, id: number, data: Partial<T>) {
    const result = supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select() ;
    return this.fetchWithError(result as PostgrestFilterBuilder<any, any, any>);
  }

  static async deleteData(table: string, id: number) {
    const result = supabase
      .from(table)
      .delete()
      .eq('id', id);
    return this.fetchWithError(result);
  }
}