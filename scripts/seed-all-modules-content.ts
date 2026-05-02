#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Generate UUIDs function
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Pre-generate 200 UUIDs
const UUIDS: string[] = []
for (let i = 0; i < 200; i++) {
  UUIDS.push(generateUUID())
}
let uuidIndex = 0
function nextUUID(): string { return UUIDS[uuidIndex++] }

interface Lesson {
  id: string
  module_id: string
  title: string
  content: string
  order_num: number
  lesson_type: string
}

const lessons: Lesson[] = []

function addLesson(moduleId: string, title: string, content: string, orderNum: number, type: string) {
  lessons.push({
    id: nextUUID(),
    module_id: moduleId,
    title,
    content,
    order_num: orderNum,
    lesson_type: type
  })
}

console.log('🌱 Creating lessons for all 36 modules...\n')

// ============================================
// A1 MODULES (1-12)
// ============================================

// Module 1: SALUDOS Y PRESENTACIONES
addLesson('7f851801-3f51-4198-a141-2288ca60f184', 'Greetings - Saludos Básicos', 
`# Greetings - Saludos Básicos

## Hello & Hi
- **Hello** - Hola (formal/informal)
- **Hi** - Hola (informal)

## Good Morning/Afternoon/Evening
- **Good morning** - Buenos días (6:00 AM - 12:00 PM)
- **Good afternoon** - Buenas tardes (12:00 PM - 6:00 PM)
- **Good evening** - Buenas noches (6:00 PM - bedtime)
- **Good night** - Buenas noches (al irse a dormir)

> **Hello!** - ¡Hola!
> **Good morning, teacher.** - ¡Buenos días, profesor!`, 1, 'theory')

addLesson('7f851801-3f51-4198-a141-2288ca60f184', 'Introductions - Presentaciones',
`# Introductions - Presentaciones

## Introducing Yourself
- **My name is...** - Mi nombre es...
- **I am...** - Soy...
- **Nice to meet you** - Mucho gusto

## Asking for Names
- **What is your name?** - ¿Cuál es tu nombre?
- **How do you spell that?** - ¿Cómo se deletrea eso?

> **Hello, my name is John.** - Hola, mi nombre es John.
> **Nice to meet you, I'm Maria.** - Mucho gusto, soy María.`, 2, 'theory')

addLesson('7f851801-3f51-4198-a141-2288ca60f184', 'Quiz: Saludos y Presentaciones',
`Pon a prueba lo que aprendiste sobre saludos y presentaciones.`, 3, 'quiz')

// Module 2: EL VERBO TO BE
addLesson('c7af74e5-d2f9-45fc-b425-c688067239a9', 'The Verb To Be - Afirmativo',
`# The Verb To Be - El Verbo Ser/Estar

## Forms of "To Be"
| Subject | Present |
|---------|----------|
| I | am |
| You | are |
| He/She/It | is |
| We/They | are |

> **I am a student.** - Soy estudiante.
> **She is my sister.** - Ella es mi hermana.`, 1, 'theory')

addLesson('c7af74e5-d2f9-45fc-b425-c688067239a9', 'To Be - Negativo e Interrogativo',
`# To Be - Negativo e Interrogativo

## Negative Form (Contractions)
- **I'm not** - No soy
- **You aren't** - No eres
- **He/She isn't** - No es

## Questions
- **Am I...?** - ¿Soy yo...?
- **Are you...?** - ¿Eres tú...?
- **Is he/she...?** - ¿Es él/ella...?

> **I'm not tired.** - No estoy cansado.
> **Are you ready?** - ¿Estás listo?`, 2, 'theory')

addLesson('c7af74e5-d2f9-45fc-b425-c688067239a9', 'Quiz: Verbo To Be',
`Demuestra tu conocimiento del verbo To Be.`, 3, 'quiz')

// Module 3: ARTÍCULOS
addLesson('78f965f3-efd5-4b1e-8e88-b21f80720b65', 'A / An - Artículos Indefinidos',
`# A / An - Artículos Indefinidos

## When to use A vs AN
- **A** + consonant sound: a book, a car, a university
- **AN** + vowel sound: an apple, an egg, an hour

## Examples
> **I have a dog.** - Tengo un perro.
> **She is an engineer.** - Ella es una ingeniera.
> **This is a university.** - Esta es una universidad.`, 1, 'theory')

addLesson('78f965f3-efd5-4b1e-8e88-b21f80720b65', 'The - Artículo Definido',
`# The - Artículo Definido

## Using "The"
Use **the** when talking about something specific:
- **The sun** - El sol
- **The moon** - La luna
- **The book on the table** - El libro sobre la mesa

> **The cat is black.** - El gato es negro.
> **The Earth is round.** - La Tierra es redonda.`, 2, 'theory')

addLesson('78f965f3-efd5-4b1e-8e88-b21f80720b65', 'Quiz: Artículos',
`Pon a prueba tu conocimiento de los artículos.`, 3, 'quiz')

// Module 4: DEMOSTRATIVOS
addLesson('a9aca475-280b-4ec1-a446-ad0d2f9673b8', 'This / That - Singular',
`# This / That - Demostrativos en Singular

## This (esto/esta) - cercano
- **This is my car.** - Este es mi coche.
- **This book is interesting.** - Este libro es interesante.

## That (eso/esa) - lejano
- **That is your house?** - ¿Esa es tu casa?
- **That dog is big.** - Ese perro es grande.

| | Near | Far |
|---|---|---|
| Singular | This | That |
| Plural | These | Those |`, 1, 'theory')

addLesson('a9aca475-280b-4ec1-a446-ad0d2f9673b8', 'These / Those - Plural',
`# These / Those - Demostrativos en Plural

## These (estos/estas) - cercano
- **These are my friends.** - Estos son mis amigos.
- **These flowers are beautiful.** - Estas flores son hermosas.

## Those (esos/esas) - lejano
- **Those are expensive cars.** - Esos son coches caros.
- **Those mountains are tall.** - Esas montañas son altas.

> **This is my phone.** (cerca)
> **That is your school.** (lejos)`, 2, 'theory')

addLesson('a9aca475-280b-4ec1-a446-ad0d2f9673b8', 'Quiz: Demostrativos',
`Demuestra lo que sabes sobre This, That, These, Those.`, 3, 'quiz')

// Module 5: NÚMEROS
addLesson('4724a72f-85f1-44e4-a278-1838ee44d2e4', 'Numbers 1-10',
`# Numbers 1-10 - Números del 1 al 10

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
| 10 | Ten | Diez |`, 1, 'theory')

addLesson('4724a72f-85f1-44e4-a278-1838ee44d2e4', 'Numbers 11-100',
`# Numbers 11-100 - Números del 11 al 100

## Teens (11-19)
11: **Eleven** | 12: **Twelve** | 13: **Thirteen**
14: **Fourteen** | 15: **Fifteen** | 16: **Sixteen**
17: **Seventeen** | 18: **Eighteen** | 19: **Nineteen**

## Tens
20: **Twenty** | 30: **Thirty** | 40: **Forty**
50: **Fifty** | 60: **Sixty** | 70: **Seventy**
80: **Eighty** | 90: **Ninety** | 100: **One hundred**

> **25** - Twenty-five
> **47** - Forty-seven`, 2, 'theory')

addLesson('4724a72f-85f1-44e4-a278-1838ee44d2e4', 'Quiz: Números',
`Pon a prueba tus conocimientos de números en inglés.`, 3, 'quiz')

// Module 6: COLORES
addLesson('dfa13cda-d31c-40be-8c7d-0ed469ecb16f', 'Basic Colors - Colores Básicos',
`# Basic Colors - Colores Básicos

- **Red** - Rojo
- **Blue** - Azul
- **Green** - Verde
- **Yellow** - Amarillo
- **Black** - Negro
- **White** - Blanco
- **Orange** - Naranja
- **Purple** - Morado

> **The sky is blue.** - El cielo es azul.`, 1, 'theory')

addLesson('dfa13cda-d31c-40be-8c7d-0ed469ecb16f', 'More Colors - Más Colores',
`# More Colors - Más Colores

- **Pink** - Rosa
- **Brown** - Marrón
- **Gray** - Gris
- **Gold** - Dorado
- **Silver** - Plateado

## Color Expressions
- **Out of the blue** - De la nada
- **Green with envy** - Verde de envidia

> **Pink is my favorite color.**`, 2, 'theory')

addLesson('dfa13cda-d31c-40be-8c7d-0ed469ecb16f', 'Quiz: Colores',
`¿Conoces los colores en inglés?`, 3, 'quiz')

// Module 7: FAMILIA
addLesson('a2674aa2-5eb3-4783-a73f-3eecd79a12b1', 'Family Members - Miembros de la Familia',
`# Family Members - Miembros de la Familia

## Immediate Family
- **Father** - Padre
- **Mother** - Madre
- **Brother** - Hermano
- **Sister** - Hermana
- **Son** - Hijo
- **Daughter** - Hija

> **I have one brother and two sisters.**`, 1, 'theory')

addLesson('a2674aa2-5eb3-4783-a73f-3eecd79a12b1', 'Extended Family - Familia Extendida',
`# Extended Family - Familia Extendida

- **Grandfather** - Abuelo
- **Grandmother** - Abuela
- **Uncle** - Tío
- **Aunt** - Tía
- **Cousin** - Primo

> **I have a big family.** - Tengo una familia grande.`, 2, 'theory')

addLesson('a2674aa2-5eb3-4783-a73f-3eecd79a12b1', 'Quiz: La Familia',
`Pon a prueba tu vocabulario familiar.`, 3, 'quiz')

// Module 8: COMIDA
addLesson('d5dbaa66-bac7-4888-96dd-0458dcef2720', 'Food - Comida Básica',
`# Food - Comida Básica

## Fruits
- **Apple** - Manzana
- **Banana** - Plátano
- **Orange** - Naranja

## Drinks
- **Water** - Agua
- **Coffee** - Café
- **Juice** - Jugo

> **I like apples.** - Me gustan las manzanas.`, 1, 'theory')

addLesson('d5dbaa66-bac7-4888-96dd-0458dcef2720', 'Meals - Comidas',
`# Meals - Comidas

- **Breakfast** - Desayuno
- **Lunch** - Almuerzo
- **Dinner** - Cena
- **Snack** - Merienda

## Useful Phrases
- **I am hungry.** - Tengo hambre.
- **I am thirsty.** - Tengo sed.

> **I eat breakfast at 7 AM.**`, 2, 'theory')

addLesson('d5dbaa66-bac7-4888-96dd-0458dcef2720', 'Quiz: Comida y Bebidas',
`¿Cuánta comida conoces en inglés?`, 3, 'quiz')

// Module 9: RUTINAS
addLesson('026b82b3-da65-4d79-96ad-2edb91e91a59', 'Daily Activities - Actividades Diarias',
`# Daily Activities - Actividades Diarias

- **Wake up** - Despertarse
- **Brush teeth** - Cepillarse los dientes
- **Take a shower** - Ducharse
- **Go to work** - Ir al trabajo
- **Go to bed** - Ir a la cama

> **I wake up at 6 AM every day.**`, 1, 'theory')

addLesson('026b82b3-da65-4d79-96ad-2edb91e91a59', 'Time Expressions - Expresiones de Tiempo',
`# Time Expressions - Expresiones de Tiempo

- **In the morning** - En la mañana
- **In the afternoon** - En la tarde
- **In the evening** - En la noche
- **At night** - En la noche

> **I go to work in the morning.**`, 2, 'theory')

addLesson('026b82b3-da65-4d79-96ad-2edb91e91a59', 'Quiz: Rutinas Diarias',
`Pon a prueba tus conocimientos sobre rutinas.`, 3, 'quiz')

// Module 10: YES/NO QUESTIONS
addLesson('4cff1c1d-078f-4731-8af4-e084ecbdfa0e', 'Yes/No Questions - Preguntas Sí/No',
`# Yes/No Questions - Preguntas Sí/No

## Structure
**Auxiliary + Subject + Main Verb?**

- **Are you ready?** - ¿Estás listo?
- **Do you like pizza?** - ¿Te gusta la pizza?
- **Can you swim?** - ¿Sabes nadar?

> **Do you speak English?** - ¿Hablas inglés?`, 1, 'theory')

addLesson('4cff1c1d-078f-4731-8af4-e084ecbdfa0e', 'Short Answers - Respuestas Cortas',
`# Short Answers - Respuestas Cortas

## Affirmative
- **Yes, I am.** - Sí, lo soy.
- **Yes, he is.** - Sí, él es.

## Negative
- **No, I'm not.** - No, no lo soy.
- **No, she isn't.** - No, ella no es.

> **Are you ready? - Yes, I am.**`, 2, 'theory')

addLesson('4cff1c1d-078f-4731-8af4-e084ecbdfa0e', 'Quiz: Yes/No Questions',
`Pon a prueba tus conocimientos de preguntas sí/no.`, 3, 'quiz')

// Module 11: WH-QUESTIONS
addLesson('ddcecc39-d7f7-4636-b122-aa5eae6a160f', 'Wh- Questions - Preguntas Wh',
`# Wh- Questions - Preguntas Wh

- **What** - Qué
- **Who** - Quién
- **Where** - Dónde
- **When** - Cuándo
- **Why** - Por qué
- **How** - Cómo

> **What is your name?** - ¿Cuál es tu nombre?
> **Where do you live?** - ¿Dónde vives?`, 1, 'theory')

addLesson('ddcecc39-d7f7-4636-b122-aa5eae6a160f', 'More Wh- Questions',
`# More Wh- Questions

- **How old are you?** - ¿Cuántos años tienes?
- **What time is it?** - ¿Qué hora es?
- **How do you spell that?** - ¿Cómo se deletrea eso?

> **How much is this?** - ¿Cuánto cuesta esto?`, 2, 'theory')

addLesson('ddcecc39-d7f7-4636-b122-aa5eae6a160f', 'Quiz: Wh- Questions',
`Demuestra tu conocimiento de las preguntas Wh.`, 3, 'quiz')

// Module 12: ALFABETO
addLesson('6935807d-f99e-40c1-9a6e-f473db3ae723', 'The English Alphabet - El Alfabeto Inglés',
`# The English Alphabet - El Alfabeto Inglés

A, B, C, D, E, F, G
H, I, J, K, L, M, N
O, P, Q, R, S, T
U, V, W, X, Y, Z

## Pronunciation
- **A** /eɪ/ (like "ay")
- **Z** /zed/ (UK) or /ziː/ (US)

> **A, B, C, D, E, F, G...**`, 1, 'theory')

addLesson('6935807d-f99e-40c1-9a6e-f473db3ae723', 'Spelling - Deletrear',
`# Spelling - Deletrear

## How to spell
- **How do you spell...?** - ¿Cómo se deletrea...?

## Examples
> **Hello: H-E-L-L-O**
> **My name is John: J-O-H-N**

## NATO Alphabet
- **A** = Alpha
- **B** = Bravo

> **Can you spell your name?**`, 2, 'theory')

addLesson('6935807d-f99e-40c1-9a6e-f473db3ae723', 'Quiz: El Alfabeto',
`Pon a prueba tu conocimiento del alfabeto inglés.`, 3, 'quiz')

// ============================================
// A2 MODULES (1-12)
// ============================================

// Module 1: PAST SIMPLE REGULAR
addLesson('ff0baace-f07f-444d-9942-c46cfb9ca9df', 'Past Simple - Verbos Regulares',
`# Past Simple Regular Verbs - Verbos Regulares en Pasado

## Formation
Add **-ed** to the base form:
- **work** → **worked**
- **play** → **played**
- **watch** → **watched**

## Time Expressions
- **yesterday** - ayer
- **last week** - la semana pasada
- **ago** - hace

> **I worked yesterday.** - Trabajé ayer.`, 1, 'theory')

addLesson('ff0baace-f07f-444d-9942-c46cfb9ca9df', 'Spelling Rules - Reglas de Ortografía',
`# Spelling Rules - Reglas de Ortografía

## Rules
1. Verbs ending in **e**: + **d** (love → loved)
2. Consonant + **y**: **y** → **ied** (study → studied)
3. CVC: double final consonant (stop → stopped)

> **She studied English last year.**`, 2, 'theory')

addLesson('ff0baace-f07f-444d-9942-c46cfb9ca9df', 'Quiz: Past Simple Regular',
`Pon a prueba tu conocimiento de verbos regulares en pasado.`, 3, 'quiz')

// Module 2: PAST SIMPLE IRREGULAR
addLesson('730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', 'Past Simple - Verbos Irregulares',
`# Past Simple Irregular Verbs - Verbos Irregulares

## Common Irregular Verbs
| Base | Past |
|------|------|
| go | went |
| see | saw |
| eat | ate |
| buy | bought |

> **I went to the park yesterday.**`, 1, 'theory')

addLesson('730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', 'More Irregular Verbs',
`# More Irregular Verbs

| Base | Past |
|------|------|
| have | had |
| do | did |
| say | said |
| get | got |

> **She had a dream.** - Ella tuvo un sueño.`, 2, 'theory')

addLesson('730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', 'Quiz: Past Simple Irregular',
`¿Conoces los verbos irregulares en pasado?`, 3, 'quiz')

// Module 3: COMPARATIVOS
addLesson('18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', 'Comparative Adjectives - Adjetivos Comparativos',
`# Comparative Adjectives - Adjetivos Comparativos

## Short Adjectives (1 syllable)
Add **-er**:
- **tall** → **taller**
- **fast** → **faster**

## Long Adjectives (2+ syllables)
Use **more**:
- **beautiful** → **more beautiful**
- **interesting** → **more interesting**

> **He is taller than me.**`, 1, 'theory')

addLesson('18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', 'Irregular Comparatives',
`# Irregular Comparatives - Comparativos Irregulares

| Adjective | Comparative |
|-----------|-------------|
| good | better |
| bad | worse |
| far | farther |

> **This book is better than that one.**`, 2, 'theory')

addLesson('18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', 'Quiz: Comparativos',
`Pon a prueba tus conocimientos de comparativos.`, 3, 'quiz')

// Module 4: SUPERLATIVOS
addLesson('5d7fab44-e643-4342-a5e2-f06cc72ec106', 'Superlative Adjectives - Superlativos',
`# Superlative Adjectives - Superlativos

## Short Adjectives
Add **-est**:
- **tall** → **the tallest**
- **fast** → **the fastest**

## Long Adjectives
Use **the most**:
- **beautiful** → **the most beautiful**

> **He is the tallest in the class.**`, 1, 'theory')

addLesson('5d7fab44-e643-4342-a5e2-f06cc72ec106', 'Irregular Superlatives',
`# Irregular Superlatives - Superlativos Irregulares

| Adjective | Superlative |
|-----------|------------|
| good | the best |
| bad | the worst |
| far | the farthest |

> **This is the best movie ever!**`, 2, 'theory')

addLesson('5d7fab44-e643-4342-a5e2-f06cc72ec106', 'Quiz: Superlativos',
`Demuestra tu conocimiento de superlativos.`, 3, 'quiz')

// Module 5: PRESENT PERFECT
addLesson('681c91ed-d66e-4da5-810c-2a09cb14a600', 'Present Perfect - Formación',
`# Present Perfect - Formación

## Structure
**Have/Has + Past Participle**

- **I have worked** (I've worked)
- **She has seen** (She's seen)

## Common Past Participles
- work → worked
- see → seen
- go → gone

> **I have seen that movie.**`, 1, 'theory')

addLesson('681c91ed-d66e-4da5-810c-2a09cb14a600', 'Present Perfect - Usage',
`# Present Perfect - Uso

## When to use
1. Life experiences: **I have been to Paris.**
2. Unfinished time: **I have eaten today.**
3. Recent actions: **I have just arrived.**

## Time Expressions
- **already, just, yet, ever, never**

> **She has lived here for 5 years.**`, 2, 'theory')

addLesson('681c91ed-d66e-4da5-810c-2a09cb14a600', 'Quiz: Present Perfect',
`Pon a prueba tu conocimiento del Present Perfect.`, 3, 'quiz')

// Module 6: MODALES DE HABILIDAD
addLesson('fa9639ec-950b-4bcd-812c-4fcacf985a93', 'Can / Could - Habilidad',
`# Can / Could - Habilidad

## Can (present)
- **I can swim.** - Sé nadar.
- **Can you speak English?** - ¿Puedes hablar inglés?

## Could (past)
- **I could run fast when I was young.**
- **She could play piano at age 5.**

> **Can you help me?** - ¿Puedes ayudarme?`, 1, 'theory')

addLesson('fa9639ec-950b-4bcd-812c-4fcacf985a93', 'Be Able To - Ser Capaz De',
`# Be Able To - Ser Capaz De

## All tenses
- **I am able to** (present)
- **I was able to** (past)
- **I will be able to** (future)

> **She is able to solve complex problems.**
> **I was able to finish on time.**`, 2, 'theory')

addLesson('fa9639ec-950b-4bcd-812c-4fcacf985a93', 'Quiz: Modales de Habilidad',
`¿Dominas el uso de Can, Could y Be able to?`, 3, 'quiz')

// Module 7: CONDICIONAL TIPO 1
addLesson('efd093d2-20dd-4815-ae3a-3cce556dd06d', 'First Conditional - Formación',
`# First Conditional - Formación

## Structure
**If + Present Simple, Will + Infinitive**

- **If it rains, I will stay home.**
- **If you study, you will pass.**

> **If I save money, I will buy a car.**`, 1, 'theory')

addLesson('efd093d2-20dd-4815-ae3a-3cce556dd06d', 'First Conditional - Usage',
`# First Conditional - Uso

## Real possibilities
Used for real/possible situations in the future.

- **If I save money, I will buy a car.**
- **If she calls, tell her I'm busy.**

## Variations
- **Unless** = If not

> **If it's sunny, we will go to the beach.**`, 2, 'theory')

addLesson('efd093d2-20dd-4815-ae3a-3cce556dd06d', 'Quiz: First Conditional',
`Pon a prueba tu conocimiento del First Conditional.`, 3, 'quiz')

// Module 8: ADVERBIOS DE FRECUENCIA
addLesson('1fbfe140-e1bc-4b08-8407-6a150ffdca8b', 'Adverbs of Frequency - Adverbios de Frecuencia',
`# Adverbs of Frequency - Adverbios de Frecuencia

## Order (0% to 100%)
- **Never** (0%) - Nunca
- **Rarely** (10%) - Raramente
- **Sometimes** (50%) - A veces
- **Often** (70%) - A menudo
- **Always** (100%) - Siempre

> **I always drink coffee in the morning.**`, 1, 'theory')

addLesson('1fbfe140-e1bc-4b08-8407-6a150ffdca8b', 'Position in Sentences',
`# Position of Adverbs - Posición de Adverbios

## Rules
1. Before main verb: **I often go**
2. After "to be": **He is always late**
3. After auxiliary: **I have never been**

> **She usually arrives early.**
> **We rarely go out on weekdays.**`, 2, 'theory')

addLesson('1fbfe140-e1bc-4b08-8407-6a150ffdca8b', 'Quiz: Adverbs of Frequency',
`¿Sabes usar los adverbios de frecuencia?`, 3, 'quiz')

// Module 9: PAST CONTINUOUS
addLesson('4e679eef-2d76-4a3f-b216-78f70cf889e1', 'Past Continuous - Formación',
`# Past Continuous - Formación

## Structure
**Was/Were + Verb-ing**

- **I was working** - Yo estaba trabajando
- **They were playing** - Ellos estaban jugando

> **It was raining yesterday at 5 PM.**`, 1, 'theory')

addLesson('4e679eef-2d76-4a3f-b216-78f70cf889e1', 'Past Continuous - Usage',
`# Past Continuous - Uso

## When to use
1. Interrupted actions: **I was sleeping when the phone rang.**
2. Parallel actions: **I was cooking while he was cleaning.**

> **They were watching TV at 8 PM.**`, 2, 'theory')

addLesson('4e679eef-2d76-4a3f-b216-78f70cf889e1', 'Quiz: Past Continuous',
`Pon a prueba tu conocimiento del Past Continuous.`, 3, 'quiz')

// Module 10: RELATIVE CLAUSES
addLesson('3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', 'Relative Clauses - Cláusulas Relativas',
`# Relative Clauses - Cláusulas Relativas

## Relative Pronouns
- **Who** - para personas
- **Which** - para cosas
- **That** - personas o cosas

> **The man who lives next door is a doctor.**
> **The book that I bought is interesting.**`, 1, 'theory')

addLesson('3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', 'More Relative Clauses',
`# More Relative Clauses

## With prepositions
- **The person I spoke to...**
- **The city where I was born...**

> **She is the teacher who taught me English.**`, 2, 'theory')

addLesson('3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', 'Quiz: Relative Clauses',
`Demuestra tu conocimiento de cláusulas relativas.`, 3, 'quiz')

// Module 11: USED TO
addLesson('9a606585-b685-456a-ba03-be7d5541591d', 'Used To - Hábitos Pasados',
`# Used To - Hábitos Pasados

## Structure
**Used to + Infinitive** (pasado habitual)

- **I used to smoke.** - Solía fumar.
- **She used to live in London.**

> **I used to be fat, but now I'm fit.**`, 1, 'theory')

addLesson('9a606585-b685-456a-ba03-be7d5541591d', 'Used To vs Would',
`# Used To vs Would

## Differences
- **Used to** = past habits + states
- **Would** = past habits ONLY (not states)

## Examples
- **I used to be fat.** (correct)
- **I would be fat.** (INCORRECT)

> **I used to have long hair.**`, 2, 'theory')

addLesson('9a606585-b685-456a-ba03-be7d5541591d', 'Quiz: Used To',
`Pon a prueba tu conocimiento de Used To.`, 3, 'quiz')

// Module 12: TOO/ENOUGH
addLesson('d15f49cb-7add-4e1e-98be-37bb9f00e8b7', 'Too / Enough - Demasiado / Suficiente',
`# Too / Enough - Demasiado / Suficiente

## Too = excessive
- **It's too hot.** - Está demasiado caliente.
- **He is too young.** - Él es demasiado joven.

## Enough = sufficient
- **We have enough time.** - Tenemos suficiente tiempo.
- **Is it big enough?** - ¿Es suficientemente grande?

> **This shirt is too expensive for me.**`, 1, 'theory')

addLesson('d15f49cb-7add-4e1e-98be-37bb9f00e8b7', 'Position Rules',
`# Position Rules - Reglas de Posición

## Too
- **Too + adjective**: too big, too small
- **Too much/many + noun**: too much water

## Enough
- **Adjective + enough**: big enough
- **Enough + noun**: enough money

> **The box is too heavy for me to lift.**`, 2, 'theory')

addLesson('d15f49cb-7add-4e1e-98be-37bb9f00e8b7', 'Quiz: Too / Enough',
`¿Dominas el uso de Too y Enough?`, 3, 'quiz')

// ============================================
// B1 MODULES (1-12)
// ============================================

// Module 1: PRESENT TENSES REVIEW
addLesson('8bac8e2a-6bca-4b93-861a-244e1ac4cd60', 'Present Tenses Review - Present Simple',
`# Present Tenses Review - Present Simple

## Usage
- Habits: **I go to the gym every day.**
- Facts: **The sun rises in the east.**
- Schedules: **The train leaves at 9 AM.**

## Structure
- **I work** / **He works** (3rd person +s)

> **I usually wake up at 7 AM.**`, 1, 'theory')

addLesson('8bac8e2a-6bca-4b93-861a-244e1ac4cd60', 'Present Continuous vs Present Perfect',
`# Present Continuous & Present Perfect

## Present Continuous
- **I am working** (right now)
- **She is studying** (at the moment)

## Present Perfect
- **I have worked** (life experience)
- **I have lived here for 10 years.**

> **Look! It's raining.** (Present Continuous)`, 2, 'theory')

addLesson('8bac8e2a-6bca-4b93-861a-244e1ac4cd60', 'Quiz: Present Tenses Review',
`Repasa todos los tiempos presentes.`, 3, 'quiz')

// Module 2: PAST TENSES REVIEW
addLesson('11721179-d8a9-4d96-9250-34e6731287a7', 'Past Tenses Review - Overview',
`# Past Tenses Review - Overview

## Past Simple
- **I worked** / **I went** (finished actions)

## Past Continuous
- **I was working** (interrupted/ongoing)

## Past Perfect
- **I had worked** (before another past action)

> **When I arrived, the movie had started.**`, 1, 'theory')

addLesson('11721179-d8a9-4d96-9250-34e6731287a7', 'Past Perfect Continuous',
`# Past Perfect Continuous

## Structure
**Had been + Verb-ing**

## Usage
- Duration before something in the past:
- **I had been working for 3 hours when he called.**

> **They had been waiting for an hour when the bus arrived.**`, 2, 'theory')

addLesson('11721179-d8a9-4d96-9250-34e6731287a7', 'Quiz: Past Tenses Review',
`Pon a prueba tu conocimiento de los tiempos pasados.`, 3, 'quiz')

// Module 3: FUTURE TENSES
addLesson('0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', 'Future Tenses - Will vs Going To',
`# Future: Will vs Going To

## Will
- Predictions: **It will rain tomorrow.**
- Decisions at moment: **I'll help you!**

## Going To
- Plans: **I'm going to travel to Paris.**
- Evidence: **Look at those clouds! It's going to rain.**

> **I think it will be sunny tomorrow.**`, 1, 'theory')

addLesson('0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', 'Present Continuous for Future',
`# Present Continuous for Future

## Arrangements (not plans!)
- **I am meeting John tonight.**
- **She is flying to London tomorrow.**

> **Are you doing anything tonight?**`, 2, 'theory')

addLesson('0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', 'Quiz: Future Tenses',
`¿Dominas los tiempos futuros?`, 3, 'quiz')

// Module 4: PASSIVE VOICE
addLesson('f05e0d37-ccfc-4014-ac45-79c778818f17', 'Passive Voice - Formación',
`# Passive Voice - Formación

## Structure
**Be + Past Participle**

## Active vs Passive
- **Active**: **John wrote this book.**
- **Passive**: **This book was written by John.**

> **Coffee is grown in Colombia.**`, 1, 'theory')

addLesson('f05e0d37-ccfc-4014-ac45-79c778818f17', 'Passive Voice - Usage',
`# Passive Voice - Uso

## Reasons to use Passive
1. Agent unknown: **My car was stolen.**
2. Agent obvious: **The bank was robbed.**
3. More formal: **The decision was made.**

> **The letter was delivered yesterday.**`, 2, 'theory')

addLesson('f05e0d37-ccfc-4014-ac45-79c778818f17', 'Quiz: Passive Voice',
`Pon a prueba tu conocimiento de la voz pasiva.`, 3, 'quiz')

// Module 5: REPORTED SPEECH
addLesson('31e12d00-1589-4637-a516-2818949db9f7', 'Reported Speech - Statements',
`# Reported Speech - Statements

## Changes
| Direct | Reported |
|--------|----------|
| I am | He was |
| will | would |
| here | there |

> **"I am happy"** → **He said he was happy.**`, 1, 'theory')

addLesson('31e12d00-1589-4637-a516-2818949db9f7', 'Reported Questions & Commands',
`# Reported Questions & Commands

## Questions
- **"Where do you live?"** → **He asked where I lived.**

## Commands
- **"Close the door"** → **He told me to close the door.**

> **She asked if I liked pizza.**`, 2, 'theory')

addLesson('31e12d00-1589-4637-a516-2818949db9f7', 'Quiz: Reported Speech',
`Demuestra tu dominio del discurso reportado.`, 3, 'quiz')

// Module 6: THIRD CONDITIONAL
addLesson('c24d012b-d629-49a6-890f-7ecf9e7a8e94', 'Third Conditional - Formación',
`# Third Conditional - Formación

## Structure
**If + Past Perfect, Would Have + Past Participle**

- **If I had studied, I would have passed.**
- **If she had called, I would have answered.**

> **If I had known, I would have helped you.**`, 1, 'theory')

addLesson('c24d012b-d629-49a6-890f-7ecf9e7a8e94', 'Third Conditional - Usage',
`# Third Conditional - Uso

## Hypothetical past situations
Impossible now because the time is past.

- **If I had been rich, I would have bought that house.**
- **If it hadn't rained, we would have gone out.**

> **I would have traveled if I had had money.**`, 2, 'theory')

addLesson('c24d012b-d629-49a6-890f-7ecf9e7a8e94', 'Quiz: Third Conditional',
`Pon a prueba tu conocimiento del Third Conditional.`, 3, 'quiz')

// Module 7: MIXED CONDITIONALS
addLesson('117f83e0-a250-4f5a-9909-1e67bffe8f4f', 'Mixed Conditionals - Type 1 (Past→Present)',
`# Mixed Conditionals (Past → Present)

## Structure
**If + Past Perfect, Would + Infinitive**

- **If I had studied** (past) **, I would be** (present) **an engineer now.**

> **If I had taken that job, I would be rich today.**`, 1, 'theory')

addLesson('117f83e0-a250-4f5a-9909-1e67bffe8f4f', 'Mixed Conditionals - Type 2 (Present→Past)',
`# Mixed Conditionals (Present → Past)

## Structure
**If + Past Simple, Would Have + Past Participle**

- **If I were** (present) **you, I would have studied** (past) **harder.**

> **If I weren't busy now, I would have gone to the party yesterday.**`, 2, 'theory')

addLesson('117f83e0-a250-4f5a-9909-1e67bffe8f4f', 'Quiz: Mixed Conditionals',
`¿Dominas los condicionales mixtos?`, 3, 'quiz')

// Module 8: WISH EXPRESSIONS
addLesson('37ce5759-d809-4b9b-8717-db8321ad031e', 'Wish - Present/Future Regrets',
`# Wish - Present/Future Regrets

## Structure
**Wish + Past Simple** (for present/future)

- **I wish I knew** (but I don't know)
- **I wish it were** (but it isn't)
- **I wish I could** (but I can't)

> **I wish I spoke Chinese.**`, 1, 'theory')

addLesson('37ce5759-d809-4b9b-8717-db8321ad031e', 'Wish - Past Regrets',
`# Wish - Past Regrets

## Structure
**Wish + Past Perfect** (for past)

- **I wish I had studied** (but I didn't)
- **I wish I hadn't said** (but I said)

## If Only
- **If only I had known!**

> **I wish I had been more careful.**`, 2, 'theory')

addLesson('37ce5759-d809-4b9b-8717-db8321ad031e', 'Quiz: Wish Expressions',
`Pon a prueba tu conocimiento de Wish.`, 3, 'quiz')

// Module 9: MODALS ADVANCED
addLesson('95cbccf7-d6ed-4a24-85d2-45873f505dc3', 'Modals - Deduction & Possibility',
`# Modals - Deduction & Possibility

## Present Deduction
- **It must be** (99% sure): **He must be rich.**
- **It can't be** (99% sure not): **He can't be poor.**
- **It might/could be** (50%): **He might be tired.**

> **He must be at home by now.**`, 1, 'theory')

addLesson('95cbccf7-d6ed-4a24-85d2-45873f505dc3', 'Modals - Past Deduction',
`# Modals - Past Deduction

## Past Deduction
- **It must have been** (99% sure)
- **It can't have been** (99% sure not)
- **It might have been** (50%)

> **She must have gone home already.**`, 2, 'theory')

addLesson('95cbccf7-d6ed-4a24-85d2-45873f505dc3', 'Quiz: Advanced Modals',
`Demuestra tu dominio de los modales avanzados.`, 3, 'quiz')

// Module 10: CAUSATIVE HAVE
addLesson('3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', 'Causative Have - Formación',
`# Causative Have - Formación

## Structure
**Have/Get + Object + Past Participle**

- **I had my car repaired.** (I paid someone)
- **She got her hair cut.**

> **I had my photo taken yesterday.**`, 1, 'theory')

addLesson('3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', 'Causative Have - Tenses',
`# Causative Have - Tenses

## All tenses
- Present: **I have/get my car serviced.**
- Past: **I had/got my car serviced.**
- Future: **I will have/get my car serviced.**

> **We got our photos taken yesterday.**`, 2, 'theory')

addLesson('3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', 'Quiz: Causative Have',
`Pon a prueba tu conocimiento del causativo Have.`, 3, 'quiz')

// Module 11: INVERSIONS
addLesson('9c925db7-e916-4d20-82b4-df4871c4961b', 'Inversions - Negative Adverbials',
`# Inversions - Negative Adverbials

## Structure
**Negative + Auxiliary + Subject + Verb**

- **Never have I seen** such a thing.
- **Rarely do we go** there.
- **Seldom does he eat** breakfast.

> **Hardly ever do I go to bed before midnight.**`, 1, 'theory')

addLesson('9c925db7-e916-4d20-82b4-df4871c4961b', 'More Inversions',
`# More Inversions

## Advanced patterns
- **Hardly had I arrived** when it started to rain.
- **No sooner had I left** than the phone rang.
- **Only then did I understand** the problem.

> **Only after the movie did I realize the time.**`, 2, 'theory')

addLesson('9c925db7-e916-4d20-82b4-df4871c4961b', 'Quiz: Inversions',
`¿Dominas las inversiones en inglés?`, 3, 'quiz')

// Module 12: EMPHASIZING
addLesson('d47c360d-a026-4f64-b744-332839ab0b76', 'Emphasizing - Cleft Sentences',
`# Emphasizing - Cleft Sentences

## It-clefts
- **It was John who** called. (not Mary)
- **It is English that** I teach. (not Math)

## Wh-clefts
- **What I need is** a vacation.
- **What she wants is** to be famous.

> **It was yesterday that I met him.**`, 1, 'theory')

addLesson('d47c360d-a026-4f64-b744-332839ab0b76', 'Emphasizing - Other Methods',
`# Other Emphasizing Methods

## Auxiliary DO
- **I DO like pizza!** (strong emphasis)
- **She DOES work hard!**

## Fronting
- **Big he is!** (not just "He is big")
- **Never will I go back!**

> **The one thing I love is traveling.**`, 2, 'theory')

addLesson('d47c360d-a026-4f64-b744-332839ab0b76', 'Quiz: Emphasizing',
`Pon a prueba tu conocimiento del énfasis en inglés.`, 3, 'quiz')

// ============================================
// INSERT LESSONS INTO DATABASE
// ============================================

console.log(`\n📝 Total lessons to insert: ${lessons.length}\n`)

// Insert in batches of 50
const batchSize = 50
for (let i = 0; i < lessons.length; i += batchSize) {
  const batch = lessons.slice(i, i + batchSize)
  const { error } = await supabase
    .from('lessons')
    .upsert(batch, { onConflict: 'id' })
  
  if (error) {
    console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message)
    process.exit(1)
  }
  
  console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1} inserted (${batch.length} lessons)`)
}

console.log(`\n✅ ${lessons.length} lessons seeded successfully!`)
console.log('\n📊 Summary:')
console.log('  A1 (12 modules): 36 lessons (24 theory + 12 quizzes)')
console.log('  A2 (12 modules): 36 lessons (24 theory + 12 quizzes)')
console.log('  B1 (12 modules): 36 lessons (24 theory + 12 quizzes)')
console.log('  Total: 108 lessons')
