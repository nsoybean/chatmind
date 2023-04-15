import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://edtsmqfxjwkadjtzwupl.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdHNtcWZ4andrYWRqdHp3dXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NDgxOTksImV4cCI6MTk5NjQyNDE5OX0.jsesB8nxIryrIUSrgUiysgcsavSgbtxcznQriNyl1wc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
