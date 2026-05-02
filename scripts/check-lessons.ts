import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const { data, error } = await supabase
  .from('lessons')
  .select(`
    id, 
    title, 
    module_id,
    modules!inner(
      title,
      courses!inner(level)
    )
  `)
  .order('module_id')

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

// Count by level
const counts: Record<string, number> = {}
const modulesCheck: Record<string, string[]> = {}

data?.forEach((l: any) => {
  const level = l.modules?.courses?.level || 'unknown'
  counts[level] = (counts[level] || 0) + 1
  
  if (!modulesCheck[level]) modulesCheck[level] = []
  const modTitle = l.modules?.title || 'Unknown'
  if (!modulesCheck[level].includes(modTitle)) {
    modulesCheck[level].push(modTitle)
  }
})

console.log('📊 Lessons per level:', counts)
console.log('\n📚 Modules with lessons:')
for (const [level, mods] of Object.entries(modulesCheck)) {
  console.log(`\n${level} (${mods.length} modules):`)
  mods.forEach(m => console.log(`  - ${m}`))
}
