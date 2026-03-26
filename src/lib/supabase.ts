import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzgwakvkpofsoawunmvp.supabase.co'
const supabaseAnonKey = 'sb_publishable_fUQxSqwG2gQIQ7ojBs7YZA_8XxZXMNM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)