import { createClient } from '@supabase/supabase-js'
import * as dotenv from "dotenv";

dotenv.config({path: './.env'});

const dbUrl = process.env.SUPABASE_API_DATABASE_URL
const dbKey = process.env.SUPABASE_API_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')