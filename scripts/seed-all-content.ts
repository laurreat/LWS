#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Course IDs
const A1_COURSE_ID = 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e'
const A2_COURSE_ID = '545b77ec-b516-4f1a-9184-fcd062bdbe64'
const B1_COURSE_ID = 'daebe138-e697-4947-b917-fc0ac8660a7c'

async function seedModules() {
  console.log('Seeding all modules...')
  
  const modules = [
    // A1 Modules
    { id: '7f851801-3f51-4198-a141-2288ca60f184', course_id: A1_COURSE_ID, title: 'Saludos y Presentaciones', description: 'Aprende a saludar y presentarte', order_num: 1 },
    { id: 'c7af74e5-d2f9-45fc-b425-c688067239a9', course_id: A1_COURSE_ID, title: 'El Verbo To Be', description: 'El verbo ser/estar', order_num: 2 },
    { id: '78f965f3-efd5-4b1e-8e88-b21f80720b65', course_id: A1_COURSE_ID, title: 'Artículos', description: 'Artículos a, an, the', order_num: 3 },
    { id: 'a9aca475-280b-4ec1-a446-ad0d2f9673b8', course_id: A1_COURSE_ID, title: 'This/That/These/Those', description: 'Demostrativos', order_num: 4 },
    { id: '4724a72f-85f1-44e4-a278-1838ee44d2e4', course_id: A1_COURSE_ID, title: 'Números 1-10 y más', description: 'Los números básicos y avanzados', order_num: 5 },
    { id: 'dfa13cda-d31c-40be-8c7d-0ed469ecb16f', course_id: A1_COURSE_ID, title: 'Los Colores', description: 'Los colores en inglés', order_num: 6 },
    { id: 'a2674aa2-5eb3-4783-a73f-3eecd79a12b1', course_id: A1_COURSE_ID, title: 'La Familia', description: 'Miembros de la familia', order_num: 7 },
    { id: 'd5dbaa66-bac7-4888-96dd-0458dcef2720', course_id: A1_COURSE_ID, title: 'Comida y Bebidas', description: 'Vocabulario de alimentos', order_num: 8 },
    { id: '026b82b3-da65-4d79-96ad-2edb91e91a59', course_id: A1_COURSE_ID, title: 'Rutinas Diarias', description: 'Actividades cotidianas', order_num: 9 },
    { id: '4cff1c1d-078f-4731-8af4-e084ecbdfa0e', course_id: A1_COURSE_ID, title: 'Preguntas Sí/No', description: 'Yes/No Questions', order_num: 10 },
    { id: 'ddcecc39-d7f7-4636-b122-aa5eae6a160f', course_id: A1_COURSE_ID, title: 'Preguntas Wh', description: 'Wh- Questions', order_num: 11 },
    { id: '6935807d-f99e-40c1-9a6e-f473db3ae723', course_id: A1_COURSE_ID, title: 'El Alfabeto', description: 'El alfabeto inglés', order_num: 12 },

    // A2 Modules
    { id: 'ff0baace-f07f-444d-9942-c46cfb9ca9df', course_id: A2_COURSE_ID, title: 'Past Simple Regular', description: 'Verbos regulares en pasado', order_num: 1 },
    { id: '730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', course_id: A2_COURSE_ID, title: 'Past Simple Irregular', description: 'Verbos irregulares', order_num: 2 },
    { id: '18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', course_id: A2_COURSE_ID, title: 'Comparativos', description: 'Comparative adjectives', order_num: 3 },
    { id: '5d7fab44-e643-4342-a5e2-f06cc72ec106', course_id: A2_COURSE_ID, title: 'Superlativos', description: 'Superlative adjectives', order_num: 4 },
    { id: '681c91ed-d66e-4da5-810c-2a09cb14a600', course_id: A2_COURSE_ID, title: 'Present Perfect', description: 'Perfecto presente', order_num: 5 },
    { id: 'fa9639ec-950b-4bcd-812c-4fcacf985a93', course_id: A2_COURSE_ID, title: 'Modales de Habilidad', description: 'Can, Could, Be able to', order_num: 6 },
    { id: 'efd093d2-20dd-4815-ae3a-3cce556dd06d', course_id: A2_COURSE_ID, title: 'Condicional Tipo 1', description: 'First Conditional', order_num: 7 },
    { id: '1fbfe140-e1bc-4b08-8407-6a150ffdca8b', course_id: A2_COURSE_ID, title: 'Adverbs of Frequency', description: 'Adverbios de frecuencia', order_num: 8 },
    { id: '4e679eef-2d76-4a3f-b216-78f70cf889e1', course_id: A2_COURSE_ID, title: 'Past Continuous', description: 'Pasado continuo', order_num: 9 },
    { id: '3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', course_id: A2_COURSE_ID, title: 'Relative Clauses', description: 'Cláusulas relativas', order_num: 10 },
    { id: '9a606585-b685-456a-ba03-be7d5541591d', course_id: A2_COURSE_ID, title: 'Used To', description: 'Hábitos pasados', order_num: 11 },
    { id: 'd15f49cb-7add-4e1e-98be-37bb9f00e8b7', course_id: A2_COURSE_ID, title: 'Too/Enough', description: 'Too y Enough', order_num: 12 },

    // B1 Modules
    { id: '8bac8e2a-6bca-4b93-861a-244e1ac4cd60', course_id: B1_COURSE_ID, title: 'Present Tenses Review', description: 'Repaso de presentes', order_num: 1 },
    { id: '11721179-d8a9-4d96-9250-34e6731287a7', course_id: B1_COURSE_ID, title: 'Past Tenses Review', description: 'Repaso de pasados', order_num: 2 },
    { id: '0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', course_id: B1_COURSE_ID, title: 'Future Tenses', description: 'Tiempos futuros', order_num: 3 },
    { id: 'f05e0d37-ccfc-4014-ac45-79c778818f17', course_id: B1_COURSE_ID, title: 'Passive Voice', description: 'Voz pasiva', order_num: 4 },
    { id: '31e12d00-1589-4637-a516-2818949db9f7', course_id: B1_COURSE_ID, title: 'Reported Speech', description: 'Discurso reportado', order_num: 5 },
    { id: 'c24d012b-d629-49a6-890f-7ecf9e7a8e94', course_id: B1_COURSE_ID, title: 'Third Conditional', description: 'Condicional tipo 3', order_num: 6 },
    { id: '117f83e0-a250-4f5a-9909-1e67bffe8f4f', course_id: B1_COURSE_ID, title: 'Mixed Conditionals', description: 'Condicionales mixtos', order_num: 7 },
    { id: '37ce5759-d809-4b9b-8717-db8321ad031e', course_id: B1_COURSE_ID, title: 'Wish Expressions', description: 'Expresiones con Wish', order_num: 8 },
    { id: '95cbccf7-d6ed-4a24-85d2-45873f505dc3', course_id: B1_COURSE_ID, title: 'Modals Advanced', description: 'Modales avanzados', order_num: 9 },
    { id: '3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', course_id: B1_COURSE_ID, title: 'Causative Have', description: 'Causativo Have', order_num: 10 },
    { id: '9c925db7-e916-4d20-82b4-df4871c4961b', course_id: B1_COURSE_ID, title: 'Inversions', description: 'Inversiones', order_num: 11 },
    { id: 'd47c360d-a026-4f64-b744-332839ab0b76', course_id: B1_COURSE_ID, title: 'Emphasizing', description: 'Énfasis', order_num: 12 },
  ]

  const { error } = await supabase.from('modules').upsert(modules)
  if (error) console.error('Error seeding modules:', error.message)
  else console.log('Modules seeded successfully!')
}

async function main() {
  console.log('Starting seed process...')
  await seedModules()
  console.log('Seed completed!')
}

main().catch(console.error)
