// src/supabase/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znretlowbhoedlmugimp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucmV0bG93YmhvZWRsbXVnaW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDI3MTAsImV4cCI6MjA2MzM3ODcxMH0.IntC70_CJ9iHCE0JyG-ptQSm6kLKyGwJrUosNxcNw-s';

// Exporta la instancia de supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
