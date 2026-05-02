import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Simulate what useCourses.ts does
async function testFetchModules() {
  // A2 Course ID
  const A2_COURSE_ID = '545b77ec-b516-4f1a-9184-fcd062bdbe64'
  
  console.log('🔍 Testing fetchModules for A2...\n')
  
  const { data, error, count } = await supabase
    .from("modules")
    .select("*, lessons(count)", { count: 'exact' })
    .eq("course_id", A2_COURSE_ID)
    .eq("is_active", true)
    .order("order_num")
  
  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
  
  console.log(`Found ${data?.length} A2 modules (total count: ${count})\n`)
  
  data?.forEach((m: any) => {
    const lessonsCount = m.lessons?.[0]?.count || 0
    const status = lessonsCount > 0 ? '✅' : '❌'
    console.log(`${status} ${m.title}: ${lessonsCount} lessons`)
  })
}

testFetchModules().catch(console.error)
