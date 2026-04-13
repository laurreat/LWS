"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Headphones, Mic, FileText, ChevronDown, ChevronUp,
  GraduationCap, ArrowRight, CheckCircle
} from "lucide-react";
import Link from "next/link";
import { Card, Button } from "@/components/ui";

const resources = [
  {
    category: "Vocabulario",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    items: [
      { 
        title: "¿Qué es el vocabulario?", 
        content: `El vocabulario (vocabulary) es el conjunto de palabras que conoces en un idioma. 
        
Cuántas palabras necesito?
- Nivel A1: Entre 500-800 palabras
- Nivel A2: Entre 1000-1500 palabras  
- Nivel B1: Entre 2000-2500 palabras

El vocabulario incluye:
- Palabras individuales (words)
- Expresiones comunes (phrases)
- phrasal verbs (verbos con partículas)
- Colocaciones (palabras que van juntas)`,
      },
      { 
        title: "Palabras esenciales A1 (100 palabras)", 
        content: `SALUDOS Y PRESENTACIONES:
- Hello / Hi = Hola
- Good morning/afternoon/evening = Buenos días/tardes/noches
- Goodbye = Adiós
- Nice to meet you = Encantado/a
- What's your name? = ¿Cómo te llamas?
- My name is... = Me llamo...

PRONOMBRES PERSONALES:
- I = Yo
- You = Tú/Vous
- He/She/It = Él/Ella/Eso
- We = Nosotros
- They = Ellos

NÚMEROS 1-20:
One, two, three, four, five, six, seven, eight, nine, ten
Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty

COLORES:
Red, blue, green, yellow, orange, purple, black, white, brown, pink, gray

FAMILIA:
Mother (madre), Father (padre), Sister (hermana), Brother (hermano)
Wife (esposa), Husband (esposo), Daughter (hija), Son (hijo)
Grandmother (abuela), Grandfather (abuelo)

DIAS DE LA SEMANA:
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

MESES:
January, February, March, April, May, June, July, August, September, October, November, December`,
      },
      { 
        title: "Vocabulario A2 (expresiones)", 
        content: `EMOCIONES Y SENTIMIENTOS:
- Happy = Feliz
- Sad = Triste
- Angry = Enojado
- Tired = Cansado
- Excited = Emocionado
- Nervous = Nervioso
- Bored = Aburrido
- Worried = Preocupado

EL CLIMA:
- Sunny = Soleado
- Rainy = Lluvioso
- Cloudy = Nublado
- Windy = Ventoso
- Snowy = Nevando
- Hot = Caliente
- Cold = Frío

LUGARES DE LA CIUDAD:
- Library = Biblioteca
- Hospital = Hospital
- Restaurant = Restaurante
- Airport = Aeropuerto
- Station = Estación
- Museum = Museo
- Park = Parque
- Market = Mercado

PROFESIONES:
- Doctor = Doctor
- Teacher = Maestro
- Engineer = Ingeniero
- Lawyer = Abogado
- Nurse = Enfermero
- Accountant = Contador
- Driver = Conductor
- Chef = Chef

COMPRAS:
- Price = Precio
- Discount = Descuento
- Receipt = Recibo
- Cash = Efectivo
- Credit card = Tarjeta de crédito
- Sale = Venta
- Expensive = Caro`,
      },
      { 
        title: "Vocabulario B1 (avanzado)", 
        content: `TECNOLOGÍA:
- Software = Software
- Hardware = Hardware
- Update = Actualizar
- Password = Contraseña
- Username = Nombre de usuario
- Device = Dispositivo
- Screen = Pantalla
- Charger = Cargador
- Battery = Batería
- Connect = Conectar
- Download = Descargar
- Upload = Subir

NEGOCIOS:
- Meeting = Reunión
- Deadline = Fecha límite
- Client = Cliente
- Contract = Contrato
- Proposal = Propuesta
- Budget = Presupuesto
- Invoice = Factura
- Employee = Empleado

MEDIO AMBIENTE:
- Pollution = Contaminación
- Recycling = Reciclaje
- Renewable = Renovable
- Energy = Energía
- Climate change = Cambio climático
- Conservation = Conservación
- Sustainable = Sostenible
- Environment = Medio ambiente

ARTE:
- Exhibition = Exposición
- Sculpture = Escultura
- Gallery = Galería
- Paint = Pintar
- Canvas = Lienzo
- Brush = Pincel`,
      },
      { 
        title: "Cómo aprender vocabulario", 
        content: `TÉCNICAS EFECTIVAS:

1. TARJETAS (FLASHCARDS)
   Escribe la palabra en una tarjeta y su traducción en la otra.
   Repasa 10 tarjetas 3 veces al día.

2. APRENDE EN CONTEXTO
   No memorize palabras sueltas. Aprende frases completas.
   Ejemplo: No memorize "apple", aprende "An apple a day keeps the doctor away"

3. REPASO ESPACIADO
   Revisa palabras nuevas:
   - El mismo día
   - Al día siguiente
   - 3 días después
   - 1 semana después
   - 1 mes después

4. ASOCIACIÓN VISUAL
   Vincula cada palabra con una imagen mental.
   Mientras más absurda o graciosa, mejor la recordarás.

5. USA LAS PALABRAS
   Intenta usar 3 palabras nuevas cada día en conversación.

6. ESCUCHA MÚSICA
   Llena los espacios en las letras de canciones.
   Busca: Ed Sheeran, Adele, Bruno Mars

7. LEE TODO LO QUE PUEDAS
   Libros, artículos, posts en redes...
   Las palabras se repiten en diferentes contextos.`,
      },
    ],
  },
  {
    category: "Listening",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    items: [
      { 
        title: "¿Qué es el Listening?", 
        content: `El listening (comprensión auditiva) es la habilidad de entender lo que escuchas en inglés.

Por qué es importante?
- Te permite comunicarte con hablantes nativos
- Entiendes películas, música, noticias
- Desarrollas el "oído" para el idioma
- Mejora tu pronunciación copiando

Diferencia entre hearing y listening:
- Hearing (oír): Tu sistema auditivo recibe sonidos
- Listening (escuchar): Entiendes y procesas el significado`,
      },
      { 
        title: "Estrategias para nivel A1", 
        content: `COMIENZA CON DIÁLOGOS SIMPLES:

1. Saludos básicos:
   "Hello, how are you?"
   "I'm fine, thank you!"

2. Entiende preguntas cortas:
   "What's your name?"
   "Where do you live?"
   "How old are you?"

3. Númerosteléfono:
   "My phone number is..."

4. Instrucciones simples:
   "Open the book."
   "Listen and repeat."

TÉCNICAS:

✓ Mira videos con subtítulos en inglés
✓ Repite en voz alta lo que escuchas
✓ Escucha la misma canción 5 vezes
✓ Usa apps como: Spotify, YouTube
✓ Práctica con series para niños: Peppa Pig, Dora

QUÉ NO HACER:
✗ Tratar de entender cada palabra (es imposible)
✗ Usar subtítulos en español
✗ Disculparse por no entender`,
      },
      { 
        title: "Mejorando comprensión A2", 
        content: `AUMENTA LA DIFICULTAD GRADUALMENTE:

1. Escucha noticias cortas (1-2 minutos)
   - BBC Learning English
   - VOA Learning English

2. Identifica ideas PRINCIPALES, no cada palabra:
   ¿De qué trata? ¿Quién? ¿Qué pasó?

3. Toma notas mientras escuchas:
   - Palabras clave
   - Números
   - Fechas

4. Practica con diferentes acentos:
   - Americano
   - Británico
   - Australiano
   - Indio

RECURSOS RECOMENDADOS:
- YouTube: EnglishAddict with MrDuncan
- ESL Pod (podcast)
- The English We Speak (BBC)
- CNN Student News

EJERCICIO:
Escucha 15 minutos diarios durante 30 días.
Verás résultats significativos.`,
      },
      { 
        title: "Nivel B1 - Comprensión avanzada", 
        content: `EN ESTE NIVEL PUEDES:

✓ Entender conversaciones telefónicas
✓ Seguir instrucciones paso a paso
✓ Identificar opiniones y sentimientos
✓ Comprender películas sin subtítulos
✓ Entender podcasts simples

TÉCNICAS AVANZADAS:

1. Context Clues (pistas del contexto):
   Usa las palabras anteriores para adivinar nuevas.

2. Connected Speech:
   Aprende cómo se reducen sonidos:
   - "going to" → "gonna"
   - "want to" → "wanna"
   - "kind of" → "kinda"

3. Thought Groups:
   Separa las ideas en grupos:
   "I went to the store / to buy some milk / for breakfast"

4. Predicting:
   Anticipa lo que van a decir.

PRÁCTICA:
- Ve películas originales (sin Dub)
- Escucha podcasts en inglés
- Habla con nativos`,
      },
      { 
        title: "Errores comunes en listening", 
        content: `ERRORES FRECUENTES Y CÓMO EVITARLOS:

1. ✗ Querer traducir todo
   ✓ Escucha el "sentido", no palabras individuales

2. ✗ Parar cuando noentiendesuna palabra
   ✓ Sigue adelante, el contexto te ayuda

3. ✗ Usar subtítulos en español
   ✓ Usa subtítulos EN INGLÉS

4. ✗ Solo escuchar una vez
   ✓ Repite el mismo audio múltiples veces

5. ✗ No practicar regularmente
   ✓ Establece una rutina diaria (mínimo 15 min)

6. ✗ Evitar acentos diferentes
   ✓ Exponte a varios acentos desde el principio

CONSEJO PRINCIPAL:
El listening mejora con exposición constante.
15 minutos diarios es mejor que 1 hora 1 vez por semana.`,
      },
    ],
  },
  {
    category: "Speaking",
    icon: Mic,
    color: "from-cyan-500 to-blue-500",
    items: [
      { 
        title: "¿Qué es el Speaking?", 
        content: `El speaking (expresión oral) es la habilidad de comunicarse en voz alta en inglés.

Incluye:
- Pronunciación correcta
- Entonación adecuada
- Fluidez al hablar
- Usar estructuras gramaticales

Por qué es difícil?
- Require producción activa (no pasiva)
- Necesitas pensar rápido
- Involucra memoria y músculo

"La lengua nativa se aprende hablando, no leyendo."`,
      },
      { 
        title: "Frases esenciales A1", 
        content: `PRESENTARTE:
"Hi, I'm [nombre]."
"I'm from [país]."
"Nice to meet you."

SALUDOS:
"Good morning/afternoon/evening!"
"How are you?"
"What's up?" (informal)

PREGUNTAS BÁSICAS:
"What's your name?"
"Where do you live?"
"How old are you?"
"What do you do?" (trabajo)
"Do you have...?"

COMPRAS:
"How much is this?"
"Can I pay by card?"
"Where can I find...?"
"Do you have... in another size?"

EN RESTAURANTE:
"Can I see the menu?"
"I would like to order..."
"The bill, please."

EXPRESIONES ÚTILES:
"Please" = Por favor
"Thank you" = Gracias
"You're welcome" = De nada
"Sorry" = Lo siento
"Excuse me" = Disculpe
"I don't understand" = No entiendo
"Can you repeat?" = ¿Puede repetir?`,
      },
      { 
        title: "Conversación A2", 
        content: `DESCRIBIR EL DÍA:
"I went to the market yesterday."
"I usually wake up at 7."

HACER PREGUNTAS:
"Have you ever...?"
"Did you use to...?"
"What would you do if...?"

EXPRESAR OPINIÓN:
"I think that..."
"In my opinion..."
"I believe that..."
"I agree/disagree."

DAR CONSEJOS:
"You should..."
"It's better to..."
"I recommend..."
"You ought to..."

COMPARAR:
"This is better than..."
"Not as... as..."
"Compared to..."

EXPRESAR PREFERENCIES:
"I prefer... to..."
"I'd rather... than..."
"Either way, I prefer..."

PEDIR OPINIÓN:
"What do you think about...?"
"How do you feel about...?"`,
      },
      { 
        title: "Expresión fluida B1", 
        content: `DEBATIR TEMAS:
"From my point of view..."
"On the one hand... on the other hand..."
"Taking everything into account..."

NARRAR EXPERIENCIAS:
"It was one of the best/worst experiences..."
"The thing that surprised me most was..."
"I had never thought about it until..."

DESCRIBIR PLANES:
"I'm planning to..."
"I'm thinking about..."
"I've decided to..."

EXPRESAR PROBABILIDADES:
"It's likely/unlikely that..."
"There's a chance that..."
"Most probably..."

CONECTORES:
"Moreover,..."
"However,..."
"Furthermore,..."
"Therefore,..."

REPORTAR:
"He said that..."
"She told me to..."
"As far as I know,..."

CAMBIAR DE TEMA:
"That reminds me..."
"By the way..."
"Moving on to..."`,
      },
      { 
        title: "Cómo superar el miedo a hablar", 
        content: `4 MITOS SOBRE HABLAR INGLÉS:

MITO 1: "Necesitohablar perfecto"
REALIDAD: Los nativos cometen errores. ¡Están bien!

MITO 2: "No tengo con quien practicar"
REALIDAD: Puedes hablar contigo mismo, frente al espejo, o con IAs.

MITO 3: "Todos me van a juzgar"
REALIDAD: La mayoría appreciates el esfuerzo.

MITO 4: "Ya es muy tarde para aprender"
REALIDAD: ¡Nunca es tarde! Adults pueden aprender.

EJERCICIOS PRÁCTICOS:

1. Habla solo/a frente al espejo (10 min/día)
2. Grábate y escucha (sin juzgarte)
3. Describe lo que estás haciendo en voz alta
4. Canta canciones en inglés
5. Imita a hablantes nativos (shadowing)
6. No traducir del español - pensa en inglés

PISTA SECRETA:
El error es tu mejor maestra.
Cada error = aprendizaje.

¡No te rindas! La práctica constante lleva a la perfección.`,
      },
    ],
  },
  {
    category: "Gramática",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    items: [
      { 
        title: "¿Qué es la Gramática?", 
        content: `La gramática (grammar) es el conjunto de reglas que determinan cómo combinar palabras para formar oraciones con sentido.

En inglés, el orden de palabras es diferente del español:

ESPAÑOL:Yo soy mexicano
INGLÉS: I am Mexican

ESPAÑOL:Ella tiene 25 años
INGLÉS: She is 25 years old

Por qué estudiarla?
- Comunica claramente
- Evita malentendidos
- Entiende mejor a otros
- Escribe correctamente`,
      },
      { 
        title: "Gramática básica A1", 
        content: `VERBO TO BE (Ser/Estar):

AFIRMATIVO:
I am = I'm
You are = You're
He is = He's
She is = She's  
It is = It's
We are = We're
They are = They're

NEGATIVO:
I am not = I'm not
You aren't
He isn't
She isn't
It isn't
We aren't
They aren't

INTERROGATIVO:
Am I...?
Are you...?
Is he...?
Is she...?

PRESENTE SIMPLE:

AFIRMATIVO:
I work
You work
He/She/It works (con -s)
We/They work

NEGATIVO:
I don't work
He doesn't work (3ra persona)

INTERROGATIVO:
Do you work?
Does he work?

ARTÍCULOS:
a / an = (indefinido)
the = (definido)

USA "A" antes de vocal sonido:
- a apple
- a university

USA "AN" antes de vocal sonido:
- an apple
- an hour

PRONOMBRESPOSESIVOS:
my, your, his, her, its, our, their`,
      },
      { 
        title: "Gramática nivel A2", 
        content: `PAST SIMPLE (Pasado simple):

VERBOS REGULARES (añade -ed):
work → worked
play → played
-live → lived
study → studied

VERBOS IRREGULARES (memoriza):
go → went
have → had
make → made
say → said
take → took
come → came
see → saw
know → knew
think → thought
give → gave

PRESENT PERFECT:

FÓRMULA:Have/Has + participio pasado
I have worked
She has gone

USOS:
- Acciones que empezaron en el pasado y continúan
- Experiencias de vida
- Acciones reciente con "yet, already, just"

CONDICIONAL (if + presente, will + verbo):
If you study, you will pass
If it rains, I'll stay home

COMPARATIVOS:
more adj (than): more beautiful
adj + er: taller
Irregulares: better, worse, more

SUPERLATIVOS:
the most adj: the most beautiful
adj + est: the tallest
Irregulares: the best, the worst`,
      },
      { 
        title: "Gramática nivel B1", 
        content: `PASSIVE VOICE (Voz pasiva):

FÓRMULA:Sujeto + be + participio
The book was written (por García Márquez)
Coffee is grown in Colombia

REPORTED SPEECH (Discurso reportado):

Cambios de tiempo:
present → past
present perfect → past perfect
will → would
can → could
may → might

"Hi, I'm Maria" → She said she was Maria
"I'll help you" → He said he would help

RELATIVE CLAUSES:

who = personas
which = cosas
that = personas/cosas

"The person who called"
"The book which I read"
"The movie that we saw"

MODALES AVANZADOS:

must = obligación fuerte
- You must be here at 9

could = posibilidad pasada
- She could be at home

might = posibilidad pequeña
- It might rain

would = hipótesis
- If I were you, I would...

should = consejo
- You should study more

would rather = preferir
- I'd rather stay home`,
      },
      { 
        title: "Errores comunes", 
        content: `ERRORES QUE DEBES EVITAR:

✗ I am agree
✓ I agree

✗ I don't understand  
✓ I don't understand

✗ She don't like
✓ She doesn't like

✗ He is more taller
✓ He is taller

✗ I am boring
✓ I am bored (emoción)
  vs I am boring (causando aburrimiento)

✗ My name is from
✓ I'm from

✗ I went to yesterday
✓ I went yesterday

✗ I have many times
✓ I have been many times

✗ Too much many friends
✓ Too many friends

✗ I'm agree with you
✓ I agree with you

CONSEJO:
Lee tus oraciones en voz alta.
Si suena rara, probablemente tiene error.

Usa el corrector de Duolingo o Google para verificar.`,
      },
    ],
  },
  {
    category: "Pronunciación",
    icon: Headphones,
    color: "from-red-500 to-orange-500",
    items: [
      { 
        title: "Fundamentos de pronunciación", 
        content: `La pronunciación (pronunciation) se refiere a cómo sonar como un hablante nativo.

Diferencia entre letras y sonido:
- "word" se escribe con letras W-O-R-D
- Suena: /wɜːrd/

Importante:
- No es lo mismo escribir que sonar
- Hay letras mudas
- Los sonidos cambian según contexto

British vs American:
- Color /ˈkʌl.ər/ vs /ˈkʌl.ɚ/
- Neither /ˈnaɪ.ðər/ vs /ˈniː.ðɚ/

El objetivo no es sonar nativo (imposible para la mayoría).
El objetivo es ser ENTENDIBLE.`,
      },
      { 
        title: "Sonidos difíciles para hispanohablantes", 
        content: `SONIDO /θ/ (como en "think"):
No existe en español. Pon la lengua entre los dientes:
- think → /θɪŋk/
- thanks → /θæŋks/
- through → /θruː/
- math → /mæθ/

Práctica: Think, thought, Thursday, thin, thick, thief

SONIDO /ð/ (como en "this"):
 tampoco existe:
- this → /ðɪs/
- that → /ðæt/
- the → /ðə/
- there → /ðeər/

Práctica: This, that, these, those, there, then

SONIDO /ʃ/ (como en "ship"):
- ship → /ʃɪp/
- shore → /ʃɔːr/
- nation → /ˈneɪ.ʃən/

SONIDO /dʒ/ (como en "jump"):
- jump → /dʒʌmp/
- gentle → /ˈdʒen.t̬əl/
- language → /ˈlæŋ.gwɪdʒ/

CONSEJO: Aprende fonética IPA básica.`,
      },
      { 
        title: "Connected Speech (enlaces)", 
        content: `EN INGLÉS SE UNEN LOS SONIDOS:

"nice to meet you"
Se escucha como una palabra:
  /naɪs tuː miːt juː/

REGLA 1: consonant vowel consonant vowel
"kind of" → /kaɪn dəv/
"lot of" → /lɒt əv/
"must of" → /mʌs təv/

REGLA 2: Sonidos que desaparecen:
"him" → /ɪm/ (sin h)
"her" → /ɜːr/  
"have" → /æf/

REGLA 3: Linking sounds:
"go + to" → "gonna"
"want + to" → "wanna"
"kind + of" → "kinda"

CÓMO PRACTICAR:
1. Escucha una canción
2. Transcribe lo que escuchas
3. Compara con la letra real
4. Canta siguiendo el ritmo`,
      },
      { 
        title: "Reducción de sonidos", 
        content: `LOS NATIVOS REDUCEN SONIDOS:

have to → /ˈhæf tə/ (hafta)
"I have to go" → "I hafta go"

want to → /ˈwɒn tə/ (wanna)
"I want to eat" → "I wanna eat"

kind of → /kaɪnd əv/ (kinda)
"He's kind of tired" → "He's kinda tired"

could have → /ˈkʊ dəv/ (coulda)
"You could have told me"

must have → /ˈmʌ səv/
"She must have left"

because → /bɪˈkɒz/
"I'm late 'cause I woke up late"

gotta = got to (tener que)
"I gotta go"

wanna = want to (querer)
"I wanna dance"

gonna = going to (ir a)
"I'm gonna be late"

CONSEJO: Aprende las formas reducidas viendo películas.`,
      },
      { 
        title: "Entonación", 
        content: `LA ENTONACIÓN DA SIGNIFICADO:

TONO SUBE en preguntas:
"Are you COMING?" (sorpresa)
"ARE you coming?" (pregunta genuina)

TONO BAJA en afirmaciones:
"I love it." ↓
"It's BEAUTiful." ↓

EN LISTAS, el último tiene tono bajo:
"I like apples, oranges, and BANANAS." ↓

CONTRASTE con "but":
"It's COLD but NIce." ↑ then ↓

EXPRESAR EMOCIONES:
- Tono alto + rápido = emocionado
- Tono bajo + lento = aburrido
- Tono fluctúa = sarcástico

PRÁCTICA:
1. Imita a nativos con películas
2. Grávate
3. Compara
4. Ajusta

"The more you practice, the better you get."`,
      },
    ],
  },
];

export default function ResourcesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Recursos Educativos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Todo lo que necesitas para dominar el inglés
          </p>
        </motion.div>

        <div className="space-y-4">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.05 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{category.category}</h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isExpanded = expanded === globalIndex;
                    
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => toggleExpand(globalIndex)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-200">{item.title}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="px-5 pb-5">
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                    {item.content}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link href="/courses">
            <Button size="lg" className="gap-2">
              <GraduationCap className="w-5 h-5" />
              Comenzar a Aprender
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}