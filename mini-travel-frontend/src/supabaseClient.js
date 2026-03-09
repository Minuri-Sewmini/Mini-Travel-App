import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cxnv dkuawmzobwk gpfxr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bnZka3Vhd216b2J3a2dwZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTYxNTYsImV4cCI6MjA4ODYzMjE1Nn0.AgIxhbr9q4smFpkG3TVhKRJs5fopqLccz3Zn6k-Yd4s'

export const supabase = createClient(supabaseUrl, supabaseKey)