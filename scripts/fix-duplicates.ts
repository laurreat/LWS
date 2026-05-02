import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function findAndRemoveDuplicates() {
  console.log('🔍 Checking for duplicate lessons in A1 modules...\n')
  
  // Get A1 course ID
  const A1_COURSE_ID = 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e'
  
  // Get all A1 modules
  const { data: modules, error: modError } = await supabase
    .from('modules')
    .select('id, title')
    .eq('course_id', A1_COURSE_ID)
  
  if (modError || !modules) {
    console.error('Error fetching modules:', modError?.message)
    process.exit(1)
  }
  
  console.log(`Found ${modules.length} A1 modules\n`)
  
  let totalDuplicates = 0
  
  for (const mod of modules) {
    // Get all lessons for this module
    const { data: lessons, error: lesError } = await supabase
      .from('lessons')
      .select('id, title, order_num')
      .eq('module_id', mod.id)
      .order('order_num')
    
    if (lesError || !lessons) continue
    
    // Check for duplicates by title
    const seen = new Map<string, string[]>() // title -> array of ids
    lessons.forEach(l => {
      if (!seen.has(l.title)) seen.set(l.title, [])
      seen.get(l.title)!.push(l.id)
    })
    
    const duplicates = Array.from(seen.entries()).filter(([_, ids]) => ids.length > 1)
    
    if (duplicates.length > 0) {
      console.log(`📚 ${mod.title}:`)
      for (const [title, ids] of duplicates) {
        console.log(`  ⚠️  "${title}" appears ${ids.length} times`)
        // Keep the first one, delete the rest
        const toDelete = ids.slice(1)
        if (toDelete.length > 0) {
          const { error: delError } = await supabase
            .from('lessons')
            .delete()
            .in('id', toDelete)
          
          if (delError) {
            console.error(`    Error deleting duplicates: ${delError.message}`)
          } else {
            console.log(`    ✅ Deleted ${toDelete.length} duplicate(s)`)
            totalDuplicates += toDelete.length
          }
        }
      }
    }
  }
  
  console.log(`\n✅ Total duplicates removed: ${totalDuplicates}`)
}

findAndRemoveDuplicates().catch(console.error)
