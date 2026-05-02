import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// All module IDs from migrations
const ALL_MODULE_IDS = {
  A1: [
    '7f851801-3f51-4198-a141-2288ca60f184', // Saludos
    'c7af74e5-d2f9-45fc-b425-c688067239a9', // To Be
    '78f965f3-efd5-4b1e-8e88-b21f80720b65', // Artículos
    'a9aca475-280b-4ec1-a446-ad0d2f9673b8', // Demostrativos
    '4724a72f-85f1-44e4-a278-1838ee44d2e4', // Números
    'dfa13cda-d31c-40be-8c7d-0ed469ecb16f', // Colores
    'a2674aa2-5eb3-4783-a73f-3eecd79a12b1', // Familia
    'd5dbaa66-bac7-4888-96dd-0458dcef2720', // Comida
    '026b82b3-da65-4d79-96ad-2edb91e91a59', // Rutinas
    '4cff1c1d-078f-4731-8af4-e084ecbdfa0e', // Yes/No
    'ddcecc39-d7f7-4636-b122-aa5eae6a160f', // Wh
    '6935807d-f99e-40c1-9a6e-f473db3ae723', // Alfabeto
  ],
  A2: [
    'ff0baace-f07f-444d-9942-c46cfb9ca9df', // Past Simple Regular
    '730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', // Past Simple Irregular
    '18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', // Comparativos
    '5d7fab44-e643-4342-a5e2-f06cc72ec106', // Superlativos
    '681c91ed-d66e-4da5-810c-2a09cb14a600', // Present Perfect
    'fa9639ec-950b-4bcd-812c-4fcacf985a93', // Modales
    'efd093d2-20dd-4815-ae3a-3cce556dd06d', // Conditional 1
    '1fbfe140-e1bc-4b08-8407-6a150ffdca8b', // Adverbs
    '4e679eef-2d76-4a3f-b216-78f70cf889e1', // Past Continuous
    '3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', // Relative Clauses
    '9a606585-b685-456a-ba03-be7d5541591d', // Used To
    'd15f49cb-7add-4e1e-98be-37bb9f00e8b7', // Too/Enough
  ],
  B1: [
    '8bac8e2a-6bca-4b93-861a-244e1ac4cd60', // Present Review
    '11721179-d8a9-4d96-9250-34e6731287a7', // Past Review
    '0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', // Future
    'f05e0d37-ccfc-4014-ac45-79c778818f17', // Passive
    '31e12d00-1589-4637-a516-2818949db9f7', // Reported Speech
    'c24d012b-d629-49a6-890f-7ecf9e7a8e94', // Conditional 3
    '117f83e0-a250-4f5a-9909-1e67bffe8f4f', // Mixed Conditionals
    '37ce5759-d809-4b9b-8717-db8321ad031e', // Wish
    '95cbccf7-d6ed-4a24-85d2-45873f505dc3', // Modals Advanced
    '3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', // Causative
    '9c925db7-e916-4d20-82b4-df4871c4961b', // Inversions
    'd47c360d-a026-4f64-b744-332839ab0b76', // Emphasizing
  ]
}

async function checkMissingModules() {
  console.log('🔍 Checking which modules have lessons...\n')
  
  for (const [level, ids] of Object.entries(ALL_MODULE_IDS)) {
    console.log(`\n📚 ${level} Modules:`)
    
    for (const id of ids) {
      // Get module info
      const { data: mod } = await supabase
        .from('modules')
        .select('title')
        .eq('id', id)
        .single()
      
      // Count lessons
      const { count } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('module_id', id)
      
      const status = (count || 0) > 0 ? '✅' : '❌'
      console.log(`  ${status} ${mod?.title || 'Unknown'} (${count || 0} lessons)`)
    }
  }
}

checkMissingModules().catch(console.error)
