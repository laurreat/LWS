require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listModules() {
  const { data, error } = await supabase
    .from('modules')
    .select('id, title, order_num')
    .order('order_num', { ascending: true });

  if (error) {
    console.error('Error fetching modules:', error);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

listModules();
