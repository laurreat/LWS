const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://blejydopouxfohqcwlty.supabase.co', 'sb_publishable_k2crG-Z1sviKoRU6a10rGQ_TqRozIXR');

const lessonsData = [
  // --- SALUDOS Y PRESENTACIONES ---
  {
    module_id: '7f851801-3f51-4198-a141-2288ca60f184',
    title: 'Greetings & Introductions (Theory)',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# Saludos y Presentaciones 🤝
Aprender a saludar es el primer paso para comunicarte en inglés. Existen dos tipos de contextos: **Formal** e **Informal**.

## 1. Formal Greetings (Saludos Formales)
Usa estos saludos en el trabajo, con desconocidos o personas mayores.
- **Hello** (Hola)
- **Good morning** (Buenos días - 6:00 AM a 12:00 PM)
- **Good afternoon** (Buenas tardes - 12:00 PM a 6:00 PM)
- **Good evening** (Buenas noches - Al llegar a un lugar de noche)

## 2. Informal Greetings (Saludos Informales)
Para amigos, familia y ambientes relajados.
- **Hi! / Hey!** (¡Hola!)
- **What's up?** (¿Qué onda? / ¿Cómo va todo?)
- **How's it going?** (¿Cómo te va?)

## 3. Introducing Yourself (Presentarse)
Para decir quién eres, usamos la estructura: **"I am..."** o **"My name is..."**

> **Ejemplo:**
> "Hi! My name is Mario. Nice to meet you!"
`
  },
  // --- EL VERBO TO BE ---
  {
    module_id: 'c7af74e5-d2f9-45fc-b425-c688067239a9',
    title: 'The Verb To Be (Basis)',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# El Verbo To Be (Ser o Estar) 🌟
Es el verbo más importante del inglés. Se usa para nombres, profesiones, sentimientos y ubicaciones.

## Conjugación en Presente
| Pronombre | Verbo To Be | Traducción |
|-----------|-------------|------------|
| I         | **am**      | Yo soy / estoy |
| You       | **are**     | Tú eres / estás |
| He/She/It | **is**      | Él/Ella/Eso es / está |
| We        | **are**     | Nosotros somos / estamos |
| They      | **are**     | Ellos son / están |

## Ejemplos clave:
1. **Description:** I am happy. (Estoy feliz).
2. **Profession:** She is a teacher. (Ella es profesora).
3. **Location:** We are at school. (Estamos en la escuela).

⚠️ **Tip Pro:** En inglés hablado usamos contracciones:
- I am -> **I'm**
- You are -> **You're**
- He is -> **He's**
`
  },
  // --- ARTÍCULOS ---
  {
    module_id: '78f965f3-efd5-4b1e-8e88-b21f80720b65',
    title: 'Articles: A, AN, THE',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# Los Artículos: A, AN, THE 🍎
Los artículos nos ayudan a definir si hablamos de algo específico o general.

## 1. Indefinite Articles: A / AN (Un, Una)
Se usan cuando hablamos de **uno** de muchos, algo no específico.
- **A**: Se usa antes de sonido de **CONSONANTE**.
  - *Example:* **A** **c**at, **A** **d**og.
- **AN**: Se usa antes de sonido de **VOCAL**.
  - *Example:* **An** **a**pple, **An** **e**lephant.

## 2. Definite Article: THE (El, La, Los, Las)
Se usa para algo **específico** que ya conocemos.
- *Example:* **The** sun (El sol - solo hay uno).
- *Example:* Give me **the** blue book (El libro azul específico).

> **Resumen rápido:**
> - "I want **a** sandwich" (Cualquiera).
> - "I want **the** sandwich on the table" (Ese específicamente).
`
  },
  // --- DEMOSTRATIVOS ---
  {
    module_id: 'a9aca475-280b-4ec1-a446-ad0d2f9673b8',
    title: 'Demonstratives: This, That, These, Those',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# Demostrativos (This, That, These, Those) 📍
Los usamos para señalar cosas dependiendo de si están **cerca** o **lejos** y si son **una** o **varias**.

| Distancia | Singular (1) | Plural (2+) |
|-----------|--------------|-------------|
| **Cerca** | **This** (Este/a) | **These** (Estos/as) |
| **Lejos** | **That** (Ese/a) | **Those** (Esos/as) |

## Ejemplos para memorizar:
- 👆 **This** apple is red (Esta manzana aquí).
- ✋ **That** star is bright (Esa estrella allá lejos).
- 👆👆 **These** shoes are new (Estos zapatos puestos).
- ✋✋ **Those** birds are singing (Esos pájaros allá).
`
  },
  // --- NÚMEROS 1-10 ---
  {
    module_id: '4724a72f-85f1-44e4-a278-1838ee44d2e4',
    title: 'Numbers 1-10 (Counting)',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# Los Números 1-10 🔢
Contar es fundamental. Aquí tienes la lista con su pronunciación figurada:

1. **One** (uán)
2. **Two** (tú)
3. **Three** (zrii - pon la lengua entre los dientes)
4. **Four** (fóor)
5. **Five** (fáiv)
6. **Six** (siks)
7. **Seven** (séven)
8. **Eight** (éit)
9. **Nine** (náin)
10. **Ten** (ten)

## Práctica de uso:
- "I have **two** eyes."
- "There are **five** fingers on one hand."
- "I am **eight** years old."
`
  },
  // --- COLORES ---
  {
    module_id: 'dfa13cda-d31c-40be-8c7d-0ed469ecb16f',
    title: 'The Colors (Vocabulary)',
    order_num: 1,
    lesson_type: 'theory',
    content: `
# Los Colores en Inglés 🎨
¡Dale color a tus frases!

- 🔴 **Red** (Rojo)
- 🔵 **Blue** (Azul)
- 🟢 **Green** (Verde)
- 🟡 **Yellow** (Amarillo)
- ⚫ **Black** (Negro)
- ⚪ **White** (Blanco)
- 🟠 **Orange** (Naranja)
- 🟣 **Purple** (Morado)
- 🌸 **Pink** (Rosa)

## ¿Cómo usarlos?
En inglés, el color va **antes** del objeto:
- ✅ *Red car* (Coche rojo)
- ❌ *Car red* (Incorrecto)

**Pregunta típica:**
- "What is your favorite color?" (¿Cuál es tu color favorito?)
`
  }
];

async function populate() {
  console.log('Iniciando carga de lecciones...');

  for (const lesson of lessonsData) {
    const { data, error } = await supabase
      .from('lessons')
      .insert([lesson])
      .select();

    if (error) {
      console.error(`Error en lección ${lesson.title}:`, error.message);
    } else {
      console.log(`✅ Cargada: ${lesson.title}`);
    }
  }

  console.log('--- Proceso finalizado ---');
  process.exit();
}

populate();
