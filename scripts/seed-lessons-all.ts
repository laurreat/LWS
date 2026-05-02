#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check .env.local file.')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Module IDs
const MODULES = {
  A1_SALUDOS: '7f851801-3f51-4198-a141-2288ca60f184',
  A1_VERBO_TO_BE: 'c7af74e5-d2f9-45fc-b425-c688067239a9',
  A1_ARTICULOS: '78f965f3-efd5-4b1e-8e88-b21f80720b65',
  A1_DEMOSTRATIVOS: 'a9aca475-280b-4ec1-a446-ad0d2f9673b8',
  A1_NUMEROS: '4724a72f-85f1-44e4-a278-1838ee44d2e4',
}

// Valid UUIDs for lessons
const LESSON_IDS = {
  A1_SALUDOS_1: 'b4ce9f31-3e55-4478-a5fc-593e5107c1ef',
  A1_SALUDOS_2: '963a1593-0cd0-4142-ba96-c06d15d90e3d',
  A1_SALUDOS_Q: 'ceb02bc1-4fc4-4726-b5cd-38344641314e',
  A1_TOBE_1: '50e76899-466b-4be5-a47f-fb7af7e7df5d',
  A1_TOBE_2: 'e0ff1d37-0835-4e09-a8d3-66755444e695',
  A1_TOBE_Q: '677321be-9606-426a-b019-15d3e5c2adec',
  A1_ART_1: 'cd8b7362-e3c3-4a60-8d72-75ed76370690',
  A1_ART_2: '07153c0b-9420-4500-8a42-7d6288e4eb39',
  A1_ART_Q: 'd913dbf2-a811-4613-b353-369e03a18c96',
  A1_DEM_1: '5ce17108-2a62-4e82-bbb6-0a08c7c3db27',
  A1_DEM_2: '653209fa-b252-4a1a-a179-5694b5d64fd1',
  A1_DEM_Q: '64574077-d5b2-4527-8572-b915a964f940',
  A1_NUM_1: 'a6bcdced-1f05-4def-8082-120725408c53',
  A1_NUM_2: '68eb8200-b982-4ca7-81de-82d54eafee0b',
  A1_NUM_Q: '88fbc523-a7f1-4bfc-9330-51205fc1178e',
}

async function seedLessons() {
  console.log('🌱 Seeding lessons for A1 modules...\n')

  const lessons = [
    // A1 - SALUDOS (3 lessons)
    {
      id: LESSON_IDS.A1_SALUDOS_1,
      module_id: MODULES.A1_SALUDOS,
      title: 'Greetings - Saludos Básicos',
      content: `# Greetings - Saludos Básicos

## Hello & Hi
- **Hello** - Hola (formal/informal)
- **Hi** - Hola (informal)

## Good Morning/Afternoon/Evening
- **Good morning** - Buenos días (6:00 AM - 12:00 PM)
- **Good afternoon** - Buenas tardes (12:00 PM - 6:00 PM)
- **Good evening** - Buenas noches (6:00 PM - bedtime)
- **Good night** - Buenas noches (al irse a dormir)

## Practice
> **Hello!** - ¡Hola!
> **Good morning, teacher.** - ¡Buenos días, profesor!
> **Good night, mom.** - Buenas noches, mamá.`,
      order_num: 1,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_SALUDOS_2,
      module_id: MODULES.A1_SALUDOS,
      title: 'Introductions - Presentaciones',
      content: `# Introductions - Presentaciones

## Introducing Yourself
- **My name is...** - Mi nombre es...
- **I am...** - Soy...
- **Nice to meet you** - Mucho gusto

## Asking for Names
- **What is your name?** - ¿Cuál es tu nombre?
- **How do you spell that?** - ¿Cómo se deletrea eso?

## Examples
> **Hello, my name is John.** - Hola, mi nombre es John.
> **Nice to meet you, I'm Maria.** - Mucho gusto, soy María.`,
      order_num: 2,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_SALUDOS_Q,
      module_id: MODULES.A1_SALUDOS,
      title: 'Quiz: Saludos y Presentaciones',
      content: 'Pon a prueba lo que aprendiste sobre saludos y presentaciones.',
      order_num: 3,
      lesson_type: 'quiz'
    },

    // A1 - VERBO TO BE (3 lessons)
    {
      id: LESSON_IDS.A1_TOBE_1,
      module_id: MODULES.A1_VERBO_TO_BE,
      title: 'The Verb To Be - Afirmativo',
      content: `# The Verb To Be - El Verbo Ser/Estar

## Forms of "To Be"
| Subject | Present | Example |
|---------|----------|---------|
| I | am | I am happy |
| You | are | You are tall |
| He | is | He is a doctor |
| She | is | She is beautiful |
| It | is | It is cold |
| We | are | We are friends |
| They | are | They are from Mexico |

## Examples
> **I am a student.** - Soy estudiante.
> **She is my sister.** - Ella es mi hermana.`,
      order_num: 1,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_TOBE_2,
      module_id: MODULES.A1_VERBO_TO_BE,
      title: 'To Be - Negativo e Interrogativo',
      content: `# To Be - Negativo e Interrogativo

## Negative Form (Contractions)
- **I am not = I'm not**
- **You are not = You aren't**
- **He isn't / She isn't**

## Questions
- **Am I...?** - ¿Soy yo...?
- **Are you...?** - ¿Eres tú...?
- **Is he/she...?** - ¿Es él/ella...?

## Practice
> **I'm not tired.** - No estoy cansado.
> **Are you ready?** - ¿Estás listo?`,
      order_num: 2,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_TOBE_Q,
      module_id: MODULES.A1_VERBO_TO_BE,
      title: 'Quiz: Verbo To Be',
      content: 'Demuestra tu conocimiento del verbo To Be.',
      order_num: 3,
      lesson_type: 'quiz'
    },

    // A1 - ARTÍCULOS (3 lessons)
    {
      id: LESSON_IDS.A1_ART_1,
      module_id: MODULES.A1_ARTICULOS,
      title: 'A / An - Artículos Indefinidos',
      content: `# A / An - Artículos Indefinidos

## When to use A vs AN
- **A** + consonant sound: a book, a car, a university
- **AN** + vowel sound: an apple, an egg, an hour

## Examples
> **I have a dog.** - Tengo un perro.
> **She is an engineer.** - Ella es una ingeniera.
> **This is a university.** - Esta es una universidad.`,
      order_num: 1,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_ART_2,
      module_id: MODULES.A1_ARTICULOS,
      title: 'The - Artículo Definido',
      content: `# The - Artículo Definido

## Using "The"
Use **the** when talking about something specific:
- **The sun** - El sol
- **The moon** - La luna
- **The book on the table** - El libro sobre la mesa

## Practice
> **The cat is black.** - El gato es negro.
> **The Earth is round.** - La Tierra es redonda.`,
      order_num: 2,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_ART_Q,
      module_id: MODULES.A1_ARTICULOS,
      title: 'Quiz: Artículos',
      content: 'Pon a prueba tu conocimiento de los artículos.',
      order_num: 3,
      lesson_type: 'quiz'
    },

    // A1 - DEMOSTRATIVOS (3 lessons)
    {
      id: LESSON_IDS.A1_DEM_1,
      module_id: MODULES.A1_DEMOSTRATIVOS,
      title: 'This / That - Singular',
      content: `# This / That - Demostrativos en Singular

## This (esto/esta) - cercano
- **This is my car.** - Este es mi coche.
- **This book is interesting.** - Este libro es interesante.

## That (eso/esa) - lejano
- **That is your house?** - ¿Esa es tu casa?
- **That dog is big.** - Ese perro es grande.`,
      order_num: 1,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_DEM_2,
      module_id: MODULES.A1_DEMOSTRATIVOS,
      title: 'These / Those - Plural',
      content: `# These / Those - Demostrativos en Plural

## These (estos/estas) - cercano
- **These are my friends.** - Estos son mis amigos.
- **These flowers are beautiful.** - Estas flores son hermosas.

## Those (esos/esas) - lejano
- **Those are expensive cars.** - Esos son coches caros.
- **Those mountains are tall.** - Esas montañas son altas.`,
      order_num: 2,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_DEM_Q,
      module_id: MODULES.A1_DEMOSTRATIVOS,
      title: 'Quiz: Demostrativos',
      content: 'Demuestra lo que sabes sobre This, That, These, Those.',
      order_num: 3,
      lesson_type: 'quiz'
    },

    // A1 - NÚMEROS (3 lessons)
    {
      id: LESSON_IDS.A1_NUM_1,
      module_id: MODULES.A1_NUMEROS,
      title: 'Numbers 1-10',
      content: `# Numbers 1-10 - Números del 1 al 10

## The Numbers
| Number | English | Spanish |
|--------|---------|---------|
| 1 | One | Uno |
| 2 | Two | Dos |
| 3 | Three | Tres |
| 4 | Four | Cuatro |
| 5 | Five | Cinco |
| 6 | Six | Seis |
| 7 | Seven | Siete |
| 8 | Eight | Ocho |
| 9 | Nine | Nueve |
| 10 | Ten | Diez |`,
      order_num: 1,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_NUM_2,
      module_id: MODULES.A1_NUMEROS,
      title: 'Numbers 11-100',
      content: `# Numbers 11-100 - Números del 11 al 100

## Teens (11-19)
- 11: **Eleven** | 12: **Twelve** | 13: **Thirteen**
- 14: **Fourteen** | 15: **Fifteen** | 16: **Sixteen**
- 17: **Seventeen** | 18: **Eighteen** | 19: **Nineteen**

## Tens
- 20: **Twenty** | 30: **Thirty** | 40: **Forty** (sin "u")
- 50: **Fifty** | 60: **Sixty** | 70: **Seventy**
- 80: **Eighty** | 90: **Ninety** | 100: **One hundred**

## Examples
> **25** - Twenty-five
> **47** - Forty-seven`,
      order_num: 2,
      lesson_type: 'theory'
    },
    {
      id: LESSON_IDS.A1_NUM_Q,
      module_id: MODULES.A1_NUMEROS,
      title: 'Quiz: Números',
      content: 'Pon a prueba tus conocimientos de números en inglés.',
      order_num: 3,
      lesson_type: 'quiz'
    },
  ]

  console.log(`Inserting ${lessons.length} lessons...`)
  
  const { error } = await supabase
    .from('lessons')
    .upsert(lessons, { onConflict: 'id' })
  
  if (error) {
    console.error('Error seeding lessons:', error.message)
    return false
  }
  
  console.log(`✅ ${lessons.length} lessons seeded successfully!`)
  return true
}

async function seedExercises() {
  console.log('\n🌱 Seeding exercises...\n')

  const exercises = [
    // Saludos - Quiz
    {
      id: 'a198eaa0-eb0a-47f3-b828-832a675e2124',
      lesson_id: LESSON_IDS.A1_SALUDOS_Q,
      question: 'Which greeting is used at 2:00 PM?',
      correct_answer: 'Good afternoon',
      options: JSON.stringify(['Good morning', 'Good afternoon', 'Good night', 'Hello']),
      exercise_type: 'multiple_choice',
      points: 10
    },
    {
      id: 'eaa8965f-c5fa-4697-88be-97f37e1f6aff',
      lesson_id: LESSON_IDS.A1_SALUDOS_Q,
      question: 'How do you say "Mucho gusto" in English?',
      correct_answer: 'Nice to meet you',
      options: JSON.stringify(['Good bye', 'Nice to meet you', 'See you later', 'Hello']),
      exercise_type: 'multiple_choice',
      points: 10
    },

    // To Be - Quiz
    {
      id: 'f545bdff-3392-4fdf-ab68-7c06cd569f89',
      lesson_id: LESSON_IDS.A1_TOBE_Q,
      question: 'Complete: She ___ a doctor.',
      correct_answer: 'is',
      options: JSON.stringify(['am', 'is', 'are', 'be']),
      exercise_type: 'multiple_choice',
      points: 10
    },
    {
      id: 'c6a36ac8-693d-4148-b7c5-dd33dff97a2a',
      lesson_id: LESSON_IDS.A1_TOBE_Q,
      question: 'Which is the negative form of "I am"?',
      correct_answer: "I'm not",
      options: JSON.stringify(["I'm not", "I not am", "Am not I", "No I am"]),
      exercise_type: 'multiple_choice',
      points: 10
    },

    // Artículos - Quiz
    {
      id: '6955447b-0b8a-445c-86de-4d41d5781cdf',
      lesson_id: LESSON_IDS.A1_ART_Q,
      question: 'Choose the correct article: ___ apple',
      correct_answer: 'an',
      options: JSON.stringify(['a', 'an', 'the', 'no article']),
      exercise_type: 'multiple_choice',
      points: 10
    },
    {
      id: '5dff8b9c-39da-4fd3-8eca-2114e7adcd06',
      lesson_id: LESSON_IDS.A1_ART_Q,
      question: 'Choose the correct article: ___ university',
      correct_answer: 'a',
      options: JSON.stringify(['a', 'an', 'the', 'no article']),
      exercise_type: 'multiple_choice',
      points: 10
    },

    // Demostrativos - Quiz
    {
      id: 'b92fa8e3-1015-4fec-b3bb-35b1e0d8eb31',
      lesson_id: LESSON_IDS.A1_DEM_Q,
      question: 'Choose: ___ is my car (it is near me)',
      correct_answer: 'This',
      options: JSON.stringify(['This', 'That', 'These', 'Those']),
      exercise_type: 'multiple_choice',
      points: 10
    },
    {
      id: '2e6310b7-c811-4774-832c-ef8f37b215d1',
      lesson_id: LESSON_IDS.A1_DEM_Q,
      question: 'Choose: ___ are my friends (they are near)',
      correct_answer: 'These',
      options: JSON.stringify(['This', 'That', 'These', 'Those']),
      exercise_type: 'multiple_choice',
      points: 10
    },

    // Números - Quiz
    {
      id: 'a8125c9c-cfca-4174-9321-fa2ee1916f7e',
      lesson_id: LESSON_IDS.A1_NUM_Q,
      question: 'How do you say "25" in English?',
      correct_answer: 'Twenty-five',
      options: JSON.stringify(['Twenty-five', 'Two-five', 'Fivety-two', 'Twenty-fivety']),
      exercise_type: 'multiple_choice',
      points: 10
    },
    {
      id: '19cb836f-4f9d-45ce-b5e3-f9c4f37154cf',
      lesson_id: LESSON_IDS.A1_NUM_Q,
      question: 'What comes after "thirteen"?',
      correct_answer: 'fourteen',
      options: JSON.stringify(['fourteen', 'fiveteen', 'forteen', 'fourtheen']),
      exercise_type: 'multiple_choice',
      points: 10
    },
  ]

  console.log(`Inserting ${exercises.length} exercises...`)
  
  const { error } = await supabase
    .from('exercises')
    .upsert(exercises, { onConflict: 'id' })

  if (error) {
    console.error('Error seeding exercises:', error.message)
    return false
  }

  console.log(`✅ ${exercises.length} exercises seeded!`)
  return true
}

// =============================================
// MAIN
// =============================================
async function main() {
  console.log('🚀 Starting seed process for lessons and exercises...\n')

  const lessonsOk = await seedLessons()
  if (!lessonsOk) return

  const exercisesOk = await seedExercises()
  if (!exercisesOk) return

  console.log('\n✅ Seed completed successfully!')
  console.log('Now you have content for the first 5 A1 modules:')
  console.log('  - Saludos y Presentaciones (3 lessons)')
  console.log('  - El Verbo To Be (3 lessons)')
  console.log('  - Artículos (3 lessons)')
  console.log('  - This/That/These/Those (3 lessons)')
  console.log('  - Números 1-10 y más (3 lessons)')
  console.log('\nTotal: 15 lessons with 10 exercises')
}

main().catch(console.error)
