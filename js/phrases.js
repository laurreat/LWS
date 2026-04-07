const phrasesByLevel = {
  A1: [
    {
      sentence: "This is a dog.",
      words: ["This", "is", "a", "dog."],
      explanation:
        "En inglés, se usa 'this is' para indicar algo cercano y se acompaña con un sustantivo.",
      translation: "Esto es un perro.",
    },
    {
      sentence: "I like apples.",
      words: ["I", "like", "apples."],
      explanation:
        "La estructura básica es sujeto + verbo + objeto. 'Like' indica preferencia.",
      translation: "Me gustan las manzanas.",
    },
    {
      sentence: "She is my friend.",
      words: ["She", "is", "my", "friend."],
      explanation:
        "Se usa 'is' para describir una relación o estado. 'My friend' es el objeto.",
      translation: "Ella es mi amiga",
    },
    {
      sentence: "We have a big house.",
      words: ["We", "have", "a", "big", "house."],
      explanation: "El verbo 'have' se usa para expresar posesión.",
      translation: "Tenemos una casa grande.",
    },
    {
      sentence: "The cat is under the table.",
      words: ["The", "cat", "is", "under", "the", "table."],
      explanation: "Se usa 'under' para indicar posición.",
      translation: "El gato está debajo de la mesa.",
    },
    {
      sentence: "He has a red car.",
      words: ["He", "has", "a", "red", "car."],
      explanation: "El adjetivo 'red' describe al sustantivo 'car'.",
      translation: "Él tiene un coche rojo.",
    },
    {
      sentence: "I am happy today.",
      words: ["I", "am", "happy", "today."],
      explanation:
        "Se usa 'am' con un adjetivo para describir emociones o estados temporales.",
      translation: "Estoy feliz hoy.",
    },
    {
      sentence: "They are in the garden.",
      words: ["They", "are", "in", "the", "garden."],
      explanation: "La preposición 'in' indica ubicación.",
      translation: "Ellos están en el jardín.",
    },
    {
      sentence: "Can I have some water?.",
      words: ["Can", "I", "have", "some", "water?."],
      explanation:
        "La estructura 'Can I have' se usa para hacer una solicitud educada.",
      translation: "¿Puedo tomar un poco de agua?.",
    },
    {
      sentence: "She likes to read books.",
      words: ["She", "likes", "to", "read", "books."],
      explanation:
        "Se usa 'likes' para expresar preferencia, seguido de un verbo en infinitivo.",
      translation: "A ella le gusta leer libros.",
    },
    {
      sentence: "I don't understand.",
      words: ["I", "don't", "understand."],
      explanation: "Se usa 'don't' para expresar negación en presente simple.",
      translation: "No entiendo.",
    },
    {
      sentence: "What is your name?.",
      words: ["What", "is", "your", "name?."],
      explanation: "Se usa 'What is' para preguntar información personal.",
      translation: "¿Cuál es tu nombre?.",
    },
    {
      sentence: "The book is on the table.",
      words: ["The", "book", "is", "on", "the", "table."],
      explanation:
        "La preposición 'on' indica que algo está sobre una superficie.",
      translation: "El libro está sobre la mesa.",
    },
    {
      sentence: "Do you like pizza?.",
      words: ["Do", "you", "like", "pizza?."],
      explanation:
        "Se usa 'Do you like' para hacer preguntas sobre preferencias.",
      translation: "¿Te gusta la pizza?.",
    },
    {
      sentence: "Where are you from?.",
      words: ["Where", "are", "you", "from?."],
      explanation:
        "Se usa 'Where are you from' para preguntar la procedencia de alguien.",
      translation: "¿De dónde eres?.",
    },
    {
      sentence: "I have two brothers.",
      words: ["I", "have", "two", "brothers."],
      explanation: "Se usa 'have' para expresar posesión.",
      translation: "Tengo dos hermanos.",
    },
    {
      sentence: "The weather is nice today.",
      words: ["The", "weather", "is", "nice", "today."],
      explanation: "Se usa 'is' para describir el clima.",
      translation: "El clima está agradable hoy.",
    },
    {
      sentence: "Do you speak English?.",
      words: ["Do", "you", "speak", "English?."],
      explanation:
        "Se usa 'Do you speak' para preguntar si alguien habla un idioma.",
      translation: "¿Hablas inglés?.",
    },
    {
      sentence: "How old are you?.",
      words: ["How", "old", "are", "you?."],
      explanation: "Se usa 'How old are you' para preguntar la edad.",
      translation: "¿Cuántos años tienes?.",
    },
    {
      sentence: "I need a pen.",
      words: ["I", "need", "a", "pen."],
      explanation: "Se usa 'need' para expresar necesidad.",
      translation: "Necesito un bolígrafo.",
    },
    {
      sentence: "He is a doctor.",
      words: ["He", "is", "a", "doctor."],
      explanation: "Se usa 'is' para describir ocupaciones.",
      translation: "Él es doctor.",
    },
    {
      sentence: "We are students.",
      words: ["We", "are", "students."],
      explanation: "Se usa 'are' para describir un grupo.",
      translation: "Nosotros somos estudiantes.",
    },
    {
      sentence: "The car is blue.",
      words: ["The", "car", "is", "blue."],
      explanation: "Se usa 'is' para describir características físicas.",
      translation: "El coche es azul.",
    },
    {
      sentence: "My house is big.",
      words: ["My", "house", "is", "big."],
      explanation: "Se usa 'is' con un adjetivo para describir algo.",
      translation: "Mi casa es grande.",
    },
    {
      sentence: "Do they live here?.",
      words: ["Do", "they", "live", "here?."],
      explanation:
        "Se usa 'Do they live' para preguntar si alguien vive en un lugar.",
      translation: "¿Ellos viven aquí?.",
    },
    {
      sentence: "Where is the bathroom?.",
      words: ["Where", "is", "the", "bathroom?."],
      explanation: "Se usa 'Where is' para preguntar por una ubicación.",
      translation: "¿Dónde está el baño?.",
    },
    {
      sentence: "The shop is closed.",
      words: ["The", "shop", "is", "closed."],
      explanation: "Se usa 'is' para describir estados temporales.",
      translation: "La tienda está cerrada.",
    },
    {
      sentence: "I like to play football.",
      words: ["I", "like", "to", "play", "football."],
      explanation:
        "Se usa 'like to play' para expresar interés en actividades.",
      translation: "Me gusta jugar al fútbol.",
    },
    {
      sentence: "She is very kind.",
      words: ["She", "is", "very", "kind."],
      explanation: "Se usa 'is' con un adjetivo para describir personalidad.",
      translation: "Ella es muy amable.",
    },
  ],
  A2: [
    {
      sentence: "The sun is shining brightly.",
      words: ["The", "sun", "is", "shining", "brightly."],
      explanation:
        "Se usa 'is' como verbo auxiliar para formar el presente continuo ('is shining') y describir algo que sucede ahora.",
      translation: "El sol brilla intensamente."
    },
    {
      sentence: "We are going to the park.",
      words: ["We", "are", "going", "to", "the", "park."],
      explanation:
        "El presente continuo 'are going' se usa para describir planes futuros o acciones en curso.",
      translation: "Vamos al parque."
    },
    {
      sentence: "I have never been to France.",
      words: ["I", "have", "never", "been", "to", "France."],
      explanation:
        "La estructura 'have never been' se usa en el presente perfecto para expresar experiencias no vividas.",
      translation: "Nunca he estado en Francia."
    },
    {
      sentence: "She is wearing a beautiful dress.",
      words: ["She", "is", "wearing", "a", "beautiful", "dress."],
      explanation:
        "El presente continuo 'is wearing' describe algo que está sucediendo en este momento.",
      translation: "Ella está usando un vestido hermoso."
    },
    {
      sentence: "They will arrive tomorrow morning.",
      words: ["They", "will", "arrive", "tomorrow", "morning."],
      explanation:
        "La estructura 'will' se usa para hablar de eventos futuros.",
      translation: "Ellos llegarán mañana por la mañana."
    },
    {
      sentence: "Can you help me with this?",
      words: ["Can", "you", "help", "me", "with", "this?"],
      explanation:
        "Se usa 'Can you' para pedir ayuda de manera educada.",
      translation: "¿Puedes ayudarme con esto?"
    },
    {
      sentence: "There is a bank near the station.",
      words: ["There", "is", "a", "bank", "near", "the", "station."],
      explanation:
        "La expresión 'There is' se usa para indicar la existencia de algo.",
      translation: "Hay un banco cerca de la estación."
    },
    {
      sentence: "I forgot to bring my wallet.",
      words: ["I", "forgot", "to", "bring", "my", "wallet."],
      explanation:
        "Se usa 'forgot to' para hablar de algo que no hicimos.",
      translation: "Olvidé traer mi billetera."
    },
    {
      sentence: "She often goes to the library.",
      words: ["She", "often", "goes", "to", "the", "library."],
      explanation:
        "El adverbio 'often' se usa para describir la frecuencia de una acción.",
      translation: "Ella va a menudo a la biblioteca."
    },
    {
      sentence: "We must finish this project soon.",
      words: ["We", "must", "finish", "this", "project", "soon."],
      explanation:
        "El modal 'must' expresa obligación o necesidad.",
      translation: "Debemos terminar este proyecto pronto."
    },
    {
      sentence: "He doesn't like spicy food.",
      words: ["He", "doesn't", "like", "spicy", "food."],
      explanation:
        "Se usa 'doesn't' para expresar negación en presente simple.",
      translation: "A él no le gusta la comida picante."
    },
    {
      sentence: "Why are you late?",
      words: ["Why", "are", "you", "late?"],
      explanation:
        "La pregunta 'Why are you' se usa para indagar razones.",
      translation: "¿Por qué llegas tarde?"
    },
    {
      sentence: "I prefer tea over coffee.",
      words: ["I", "prefer", "tea", "over", "coffee."],
      explanation:
        "Se usa 'prefer' para expresar preferencias comparativas.",
      translation: "Prefiero el té al café."
    },
    {
      sentence: "My sister is taller than me.",
      words: ["My", "sister", "is", "taller", "than", "me."],
      explanation:
        "El comparativo 'taller than' se usa para comparar dos cosas o personas.",
      translation: "Mi hermana es más alta que yo."
    },
    {
      sentence: "The movie was very exciting.",
      words: ["The", "movie", "was", "very", "exciting."],
      explanation:
        "El adjetivo 'exciting' describe algo que causa emoción o interés.",
      translation: "La película fue muy emocionante."
    },
    {
      sentence: "We have already finished our homework.",
      words: ["We", "have", "already", "finished", "our", "homework."],
      explanation:
        "El presente perfecto 'have already finished' indica que algo ya se ha completado.",
      translation: "Ya hemos terminado nuestra tarea."
    },
    {
      sentence: "It is important to eat healthy food.",
      words: ["It", "is", "important", "to", "eat", "healthy", "food."],
      explanation:
        "La estructura 'It is important to' se usa para enfatizar recomendaciones o consejos.",
      translation: "Es importante comer alimentos saludables."
    },
    {
      sentence: "I haven't seen her in weeks.",
      words: ["I", "haven't", "seen", "her", "in", "weeks."],
      explanation:
        "El presente perfecto negativo 'haven't seen' describe algo que no ha ocurrido en un período de tiempo.",
      translation: "No la he visto en semanas."
    },
    {
      sentence: "Do you know where the nearest bus stop is?",
      words: [
        "Do",
        "you",
        "know",
        "where",
        "the",
        "nearest",
        "bus",
        "stop",
        "is?"
      ],
      explanation:
        "Se usa 'Do you know' para pedir información de manera indirecta.",
      translation: "¿Sabes dónde está la parada de autobús más cercana?"
    },
    {
      sentence: "We are planning a trip to the mountains.",
      words: ["We", "are", "planning", "a", "trip", "to", "the", "mountains."],
      explanation:
        "El presente continuo 'are planning' describe un plan futuro.",
      translation: "Estamos planeando un viaje a las montañas."
    },
    {
      sentence: "She was born in 1990.",
      words: ["She", "was", "born", "in", "1990."],
      explanation:
        "Se usa 'was born' para hablar de fechas de nacimiento.",
      translation: "Ella nació en 1990."
    },
    {
      sentence: "The children are playing in the garden.",
      words: ["The", "children", "are", "playing", "in", "the", "garden."],
      explanation:
        "El presente continuo 'are playing' describe una acción en curso.",
      translation: "Los niños están jugando en el jardín."
    },
    {
      sentence: "It will probably rain tomorrow.",
      words: ["It", "will", "probably", "rain", "tomorrow."],
      explanation:
        "El adverbio 'probably' indica probabilidad.",
      translation: "Probablemente lloverá mañana."
    },
    {
      sentence: "I usually go to bed at 10 PM.",
      words: ["I", "usually", "go", "to", "bed", "at", "10", "PM."],
      explanation:
        "El adverbio 'usually' describe hábitos regulares.",
      translation: "Normalmente me acuesto a las 10 PM."
    },
    {
      sentence: "We need to buy some bread.",
      words: ["We", "need", "to", "buy", "some", "bread."],
      explanation:
        "La estructura 'need to' expresa necesidad o requerimiento.",
      translation: "Necesitamos comprar pan."
    },
    {
      sentence: "He is looking for his keys.",
      words: ["He", "is", "looking", "for", "his", "keys."],
      explanation:
        "El presente continuo 'is looking for' indica que alguien está buscando algo.",
      translation: "Él está buscando sus llaves."
    },
    {
      sentence: "She speaks English fluently.",
      words: ["She", "speaks", "English", "fluently."],
      explanation:
        "El adverbio 'fluently' describe cómo se realiza una acción.",
      translation: "Ella habla inglés con fluidez."
    },
    {
      sentence: "I didn't know about the meeting.",
      words: ["I", "didn't", "know", "about", "the", "meeting."],
      explanation:
        "Se usa 'didn't' para expresar negación en pasado simple.",
      translation: "No sabía sobre la reunión."
    },
    {
      sentence: "Can we meet at 5 PM?",
      words: ["Can", "we", "meet", "at", "5", "PM?"],
      explanation:
        "La estructura 'Can we' se usa para sugerir planes o reuniones.",
      translation: "¿Podemos reunirnos a las 5 PM?"
    }
  ],
  B1: [
    {
      sentence: "She has been working all day.",
      words: ["She", "has", "been", "working", "all", "day."],
      explanation:
        "El presente perfecto continuo 'has been working' describe una acción que comenzó en el pasado y continúa en el presente.",
      translation: "Ella ha estado trabajando todo el día."
    },
    {
      sentence: "It was a challenging experience.",
      words: ["It", "was", "a", "challenging", "experience."],
      explanation:
        "Se usa 'was' para describir algo en el pasado. 'Challenging experience' es un sustantivo compuesto.",
      translation: "Fue una experiencia desafiante."
    },
    {
      sentence: "I would have called you if I had known.",
      words: ["I", "would", "have", "called", "you", "if", "I", "had", "known."],
      explanation:
        "El condicional perfecto 'would have called' se usa para hablar de acciones que no ocurrieron en el pasado pero podrían haber sucedido bajo ciertas condiciones.",
      translation: "Te habría llamado si lo hubiera sabido."
    },
    {
      sentence: "They are planning to move abroad next year.",
      words: [
        "They",
        "are",
        "planning",
        "to",
        "move",
        "abroad",
        "next",
        "year."
      ],
      explanation:
        "El presente continuo 'are planning' indica intenciones o planes futuros.",
      translation: "Ellos están planeando mudarse al extranjero el próximo año."
    },
    {
      sentence: "I regret not studying harder for the exam.",
      words: ["I", "regret", "not", "studying", "harder", "for", "the", "exam."],
      explanation:
        "El verbo 'regret' seguido de un gerundio expresa arrepentimiento por una acción pasada.",
      translation: "Lamento no haber estudiado más para el examen."
    },
    {
      sentence: "We had been waiting for hours before they arrived.",
      words: [
        "We",
        "had",
        "been",
        "waiting",
        "for",
        "hours",
        "before",
        "they",
        "arrived."
      ],
      explanation:
        "El pasado perfecto continuo 'had been waiting' describe una acción continua que ocurrió antes de otra acción en el pasado.",
      translation:
        "Habíamos estado esperando durante horas antes de que llegaran."
    },
    {
      sentence: "If I were you, I would take the job.",
      words: ["If", "I", "were", "you", "I", "would", "take", "the", "job."],
      explanation:
        "El condicional tipo 2 describe situaciones hipotéticas. 'If I were' es una forma común en estas estructuras.",
      translation: "Si yo fuera tú, tomaría el trabajo."
    },
    {
      sentence: "He is used to waking up early.",
      words: ["He", "is", "used", "to", "waking", "up", "early."],
      explanation:
        "La expresión 'is used to' seguida de un gerundio indica que alguien está acostumbrado a algo.",
      translation: "Él está acostumbrado a levantarse temprano."
    },
    {
      sentence: "I can't stand people being rude.",
      words: ["I", "can't", "stand", "people", "being", "rude."],
      explanation:
        "'Can't stand' seguido de un gerundio expresa fuerte aversión hacia algo.",
      translation: "No soporto que la gente sea grosera."
    },
    {
      sentence: "She will have finished her project by tomorrow.",
      words: [
        "She",
        "will",
        "have",
        "finished",
        "her",
        "project",
        "by",
        "tomorrow."
      ],
      explanation:
        "El futuro perfecto 'will have finished' se usa para hablar de algo que estará completado antes de un punto específico en el futuro.",
      translation: "Ella habrá terminado su proyecto para mañana."
    },
    {
      sentence: "We should have left earlier to avoid the traffic.",
      words: [
        "We",
        "should",
        "have",
        "left",
        "earlier",
        "to",
        "avoid",
        "the",
        "traffic."
      ],
      explanation:
        "La estructura 'should have' indica algo que se debería haber hecho en el pasado.",
      translation: "Deberíamos haber salido antes para evitar el tráfico."
    },
    {
      sentence: "I wish I had more time to travel.",
      words: ["I", "wish", "I", "had", "more", "time", "to", "travel."],
      explanation:
        "'I wish' seguido de un pasado simple expresa un deseo sobre algo irreal o no alcanzado.",
      translation: "Ojalá tuviera más tiempo para viajar."
    },
    {
      sentence: "The book that I borrowed was very interesting.",
      words: [
        "The",
        "book",
        "that",
        "I",
        "borrowed",
        "was",
        "very",
        "interesting."
      ],
      explanation:
        "La oración relativa 'that I borrowed' da información adicional sobre el sustantivo 'book'.",
      translation: "El libro que tomé prestado era muy interesante."
    },
    {
      sentence: "Despite the rain, we decided to go hiking.",
      words: ["Despite", "the", "rain", "we", "decided", "to", "go", "hiking."],
      explanation:
        "'Despite' introduce una idea opuesta a lo esperado, seguido de un sustantivo o gerundio.",
      translation: "A pesar de la lluvia, decidimos ir de excursión."
    },
    {
      sentence: "He hasn't replied to my email yet.",
      words: ["He", "hasn't", "replied", "to", "my", "email", "yet."],
      explanation:
        "'Yet' se usa con el presente perfecto para indicar que algo no ha ocurrido pero se espera que ocurra.",
      translation: "Él no ha respondido mi correo todavía."
    },
    {
      sentence: "The more you practice, the better you get.",
      words: ["The", "more", "you", "practice", "the", "better", "you", "get."],
      explanation:
        "La estructura 'The more... the better' muestra una relación proporcional entre dos acciones.",
      translation: "Cuanto más practicas, mejor te vuelves."
    },
    {
      sentence: "I was wondering if you could help me.",
      words: ["I", "was", "wondering", "if", "you", "could", "help", "me."],
      explanation:
        "La estructura 'I was wondering if' se usa para hacer solicitudes educadas.",
      translation: "Me preguntaba si podrías ayudarme."
    },
    {
      sentence: "He regrets having made that mistake.",
      words: ["He", "regrets", "having", "made", "that", "mistake."],
      explanation:
        "'Regrets having made' expresa arrepentimiento por una acción pasada.",
      translation: "Él lamenta haber cometido ese error."
    },
    {
      sentence: "They had already left when we arrived.",
      words: ["They", "had", "already", "left", "when", "we", "arrived."],
      explanation:
        "El pasado perfecto 'had already left' indica que algo ocurrió antes de otra acción en el pasado.",
      translation: "Ellos ya se habían ido cuando llegamos."
    },
    {
      sentence: "She was supposed to meet us here.",
      words: ["She", "was", "supposed", "to", "meet", "us", "here."],
      explanation:
        "'Was supposed to' se usa para hablar de algo que debía ocurrir pero no sucedió.",
      translation: "Se suponía que ella iba a encontrarse con nosotros aquí."
    },
    {
      sentence: "I am looking forward to meeting you.",
      words: ["I", "am", "looking", "forward", "to", "meeting", "you."],
      explanation:
        "La expresión 'looking forward to' seguida de un gerundio expresa entusiasmo por algo en el futuro.",
      translation: "Estoy deseando conocerte."
    },
    {
      sentence: "He could have told us about the delay.",
      words: ["He", "could", "have", "told", "us", "about", "the", "delay."],
      explanation:
        "'Could have' expresa algo que era posible pero no sucedió.",
      translation: "Él podría habernos contado sobre el retraso."
    },
    {
      sentence: "By the time we arrived, the show had started.",
      words: [
        "By",
        "the",
        "time",
        "we",
        "arrived",
        "the",
        "show",
        "had",
        "started."
      ],
      explanation:
        "El pasado perfecto 'had started' indica que algo ocurrió antes de otra acción en el pasado.",
      translation: "Cuando llegamos, el espectáculo ya había comenzado."
    },
    {
      sentence: "He denied having stolen the money.",
      words: ["He", "denied", "having", "stolen", "the", "money."],
      explanation:
        "'Denied having stolen' indica que alguien rechazó haber hecho algo.",
      translation: "Él negó haber robado el dinero."
    },
    {
      sentence: "If we had taken the train, we would have arrived on time.",
      words: [
        "If",
        "we",
        "had",
        "taken",
        "the",
        "train",
        "we",
        "would",
        "have",
        "arrived",
        "on",
        "time."
      ],
      explanation:
        "El condicional tipo 3 describe situaciones irreales en el pasado.",
      translation: "Si hubiéramos tomado el tren, habríamos llegado a tiempo."
    },
    {
      sentence: "I didn't expect the movie to be so good.",
      words: [
        "I",
        "didn't",
        "expect",
        "the",
        "movie",
        "to",
        "be",
        "so",
        "good."
      ],
      explanation:
        "'Didn't expect' se usa para expresar sorpresa por algo inesperado.",
      translation: "No esperaba que la película fuera tan buena."
    },
    {
      sentence: "You should consider joining the team.",
      words: ["You", "should", "consider", "joining", "the", "team."],
      explanation:
        "'Should consider' seguido de un gerundio sugiere algo como una buena idea.",
      translation: "Deberías considerar unirte al equipo."
    },
    {
      sentence: "I had no idea you were so talented.",
      words: ["I", "had", "no", "idea", "you", "were", "so", "talented."],
      explanation:
        "'Had no idea' expresa sorpresa o falta de conocimiento.",
      translation: "No tenía idea de que eras tan talentoso."
    }
  ],  
};
class LanguageLearningGame {
  constructor(phrasesByLevel) {
    this.phrasesByLevel = phrasesByLevel;
    this.translationManager = new TranslationManager();
    this.explanationManager = new ExplanationManager();
    this.currentLevel = this.getLevelFromURL();
    this.currentPhraseIndex = 0;
    this.usedPhrases = new Set();
    this.currentPhrases = [];
  }

  initGame() {
    this.generatePhrases();
    this.loadPhrase();
  }

  getLevelFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get("level");
    if (!level || !this.phrasesByLevel[level]) {
      alert("Invalid or missing level! Redirecting to the main menu.");
      window.location.href = "index.html";
    }
    return level;
  }

  generatePhrases() {
    const allPhrases = this.phrasesByLevel[this.currentLevel];
    const availablePhrases = allPhrases.filter(
      (_, index) => !this.usedPhrases.has(index)
    );

    if (availablePhrases.length < 20) {
      // Reset the used phrases if not enough phrases are left
      this.usedPhrases.clear();
    }

    const shuffled = availablePhrases.sort(() => Math.random() - 0.5);
    this.currentPhrases = shuffled.slice(0, 20);
    this.currentPhraseIndex = 0;

    // Mark these phrases as used
    this.currentPhrases.forEach((phrase) => {
      const index = allPhrases.indexOf(phrase);
      this.usedPhrases.add(index);
    });
  }

  // Load a new phrase for the current level
  loadPhrase() {
    const sentenceSpace = document.getElementById("sentence-space");
    const wordBank = document.getElementById("word-bank");

    sentenceSpace.innerHTML = "";
    wordBank.innerHTML = "";

    const currentPhrase = this.currentPhrases[this.currentPhraseIndex];
    const shuffledWords = [...currentPhrase.words].sort(
      () => Math.random() - 0.5
    );

    shuffledWords.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.textContent = word;
      wordElement.classList.add("word");
      wordElement.setAttribute("draggable", true);
      wordElement.addEventListener("dragstart", this.dragStart.bind(this));
      wordBank.appendChild(wordElement);
    });

    currentPhrase.words.forEach(() => {
      const placeholder = document.createElement("div");
      placeholder.classList.add("word-placeholder");
      placeholder.setAttribute("data-placeholder", "true");
      placeholder.addEventListener("dragover", this.dragOver);
      placeholder.addEventListener("drop", this.drop.bind(this));
      sentenceSpace.appendChild(placeholder);
    });
  }

  // Drag and Drop Event Handlers
  dragStart(event) {
    this.draggedWord = event.target;
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    const placeholder = event.target;

    if (placeholder.getAttribute("data-placeholder") && this.draggedWord) {
      placeholder.textContent = this.draggedWord.textContent;
      placeholder.classList.remove("word-placeholder");
      placeholder.classList.add("word");
      placeholder.removeAttribute("data-placeholder");

      this.draggedWord.remove();
      this.checkSentence();
    }
  }

  // Check if sentence is correctly formed
  checkSentence() {
    const sentenceSpace = document.getElementById("sentence-space");
    const currentPhrase = this.currentPhrases[this.currentPhraseIndex];
    const allFilled = Array.from(sentenceSpace.children).every(
      (child) => child.textContent.trim() !== ""
    );

    if (allFilled) {
      const formedSentence = Array.from(sentenceSpace.children)
        .map((child) => child.textContent)
        .join(" ");
      const isCorrect = formedSentence === currentPhrase.sentence;

      if (isCorrect) {
        sentenceSpace.classList.add("completed");
      }
      this.showResultMessage(isCorrect);
    }
  }

  // Show result message after sentence completion
  showResultMessage(isCorrect) {
    const sentenceSpace = document.getElementById("sentence-space");
    const overlay = document.createElement("div");
    overlay.id = "result-overlay";

    const currentPhrase = this.currentPhrases[this.currentPhraseIndex];

    if (isCorrect) {
      overlay.innerHTML = `
        <p class="result-message">Well done!</p>
        <p><strong>English:</strong> ${currentPhrase.sentence}</p>
        <p><strong>Spanish:</strong> ${this.translationManager.translate(
        currentPhrase.sentence
      )}</p>
        <button id="next-button">${this.currentPhraseIndex < this.currentPhrases.length - 1
          ? "Next Phrase"
          : "Finish"
        }</button>
      `;
    } else {
      overlay.innerHTML = `
        <p class="result-message">Almost there!</p>
        <p><strong>Correct Phrase:</strong> ${currentPhrase.sentence}</p>
        <p><strong>Explanation:</strong> ${this.explanationManager.getExplanation(
        currentPhrase.sentence
      )}</p>
        <button id="next-button">Continue</button>
      `;
    }

    sentenceSpace.appendChild(overlay);

    document.getElementById("next-button").addEventListener("click", () => {
      overlay.remove();
      if (isCorrect) {
        this.currentPhraseIndex++;
        if (this.currentPhraseIndex < this.currentPhrases.length) {
          this.loadPhrase();
        } else {
          this.showSummary();
        }
      } else {
        this.loadPhrase();
      }
    });
  }

  // Show summary when all phrases are completed
  showSummary() {
    const gameArea = document.getElementById("game-area");
    const main = document.querySelector("main");

    gameArea.style.display = "none";

    const summaryDiv = document.createElement("div");
    summaryDiv.id = "game-summary";

    const totalPhrases = this.currentPhrases.length;
    const summaryText = `
      <h3>Game Over!</h3>
      <p>You completed all ${totalPhrases} phrases in level ${this.currentLevel}!</p>
      <p>¡Has completado todas las ${totalPhrases} frases del nivel ${this.currentLevel}!</p>
      <button id="restart-button">Restart</button>
    `;
    summaryDiv.innerHTML = summaryText;
    main.appendChild(summaryDiv);

    document.getElementById("restart-button").addEventListener("click", () => {
      summaryDiv.remove();
      gameArea.style.display = "block";
      this.generatePhrases();
      this.loadPhrase();
    });
  }
}

// Translation Manager
class TranslationManager {
  constructor() {
    this.translations = {
      //A1
      "This is a dog.": "Esto es un perro.",
      "I like apples.": "Me gustan las manzanas.",
      "She is my friend.": "Ella es mi amiga.",
      "We have a big house.": "Tenemos una casa grande.",
      "The cat is under the table.": "El gato está debajo de la mesa.",
      "He has a red car.": "Él tiene un coche rojo.",
      "I am happy today.": "Estoy feliz hoy.",
      "They are in the garden.": "Ellos están en el jardín.",
      "Can I have some water?.": "¿Puedo tomar un poco de agua?.",
      "She likes to read books.": "A ella le gusta leer libros.",
      "I don't understand.": "No entiendo.",
      "What is your name?.": "¿Cuál es tu nombre?.",
      "The book is on the table.": "El libro está sobre la mesa.",
      "Do you like pizza?.": "¿Te gusta la pizza?.",
      "Where are you from?.": "¿De dónde eres?.",
      "I have two brothers.": "Tengo dos hermanos.",
      "The weather is nice today.": "El clima está agradable hoy.",
      "Do you speak English?.": "¿Hablas inglés?.",
      "How old are you?.": "¿Cuántos años tienes?.",
      "I need a pen.": "Necesito un bolígrafo.",
      "He is a doctor.": "Él es doctor.",
      "We are students.": "Nosotros somos estudiantes.",
      "The car is blue.": "El coche es azul.",
      "My house is big.": "Mi casa es grande.",
      "Do they live here?.": "¿Ellos viven aquí?.",
      "Where is the bathroom?.": "¿Dónde está el baño?.",
      "The shop is closed.": "La tienda está cerrada.",
      "I like to play football.": "Me gusta jugar al fútbol.",
      "She is very kind.": "Ella es muy amable.",
      "The sun is shining brightly.": "El sol brilla intensamente.",
      "We are going to the park.": "Vamos al parque.",
      "She has been working all day.": "Ella ha estado trabajando todo el día.",
      "It was a challenging experience.": "Fue una experiencia desafiante.",
      //A2
      "The sun is shining brightly.": "El sol brilla intensamente.",
      "We are going to the park.": "Vamos al parque.",
      "I have never been to France.": "Nunca he estado en Francia.",
      "She is wearing a beautiful dress.": "Ella está usando un vestido hermoso.",
      "They will arrive tomorrow morning.": "Ellos llegarán mañana por la mañana.",
      "Can you help me with this?": "¿Puedes ayudarme con esto?",
      "There is a bank near the station.": "Hay un banco cerca de la estación.",
      "I forgot to bring my wallet.": "Olvidé traer mi billetera.",
      "She often goes to the library.": "Ella va a menudo a la biblioteca.",
      "We must finish this project soon.": "Debemos terminar este proyecto pronto.",
      "He doesn't like spicy food.": "A él no le gusta la comida picante.",
      "Why are you late?": "¿Por qué llegas tarde?",
      "I prefer tea over coffee.": "Prefiero el té al café.",
      "My sister is taller than me.": "Mi hermana es más alta que yo.",
      "The movie was very exciting.": "La película fue muy emocionante.",
      "We have already finished our homework.": "Ya hemos terminado nuestra tarea.",
      "It is important to eat healthy food.": "Es importante comer alimentos saludables.",
      "I haven't seen her in weeks.": "No la he visto en semanas.",
      "Do you know where the nearest bus stop is?": "¿Sabes dónde está la parada de autobús más cercana?",
      "We are planning a trip to the mountains.": "Estamos planeando un viaje a las montañas.",
      "She was born in 1990.": "Ella nació en 1990.",
      "The children are playing in the garden.": "Los niños están jugando en el jardín.",
      "It will probably rain tomorrow.": "Probablemente lloverá mañana.",
      "I usually go to bed at 10 PM.": "Normalmente me acuesto a las 10 PM.",
      "We need to buy some bread.": "Necesitamos comprar pan.",
      "He is looking for his keys.": "Él está buscando sus llaves.",
      "She speaks English fluently.": "Ella habla inglés con fluidez.",
      "I didn't know about the meeting.": "No sabía sobre la reunión.",
      "Can we meet at 5 PM?": "¿Podemos reunirnos a las 5 PM?",
      //B1
      "She has been working all day.": "Ella ha estado trabajando todo el día.",
      "It was a challenging experience.": "Fue una experiencia desafiante.",
      "I would have called you if I had known.": "Te habría llamado si lo hubiera sabido.",
      "They are planning to move abroad next year.": "Ellos están planeando mudarse al extranjero el próximo año.",
      "I regret not studying harder for the exam.": "Lamento no haber estudiado más para el examen.",
      "We had been waiting for hours before they arrived.": "Habíamos estado esperando durante horas antes de que llegaran.",
      "If I were you, I would take the job.": "Si yo fuera tú, tomaría el trabajo.",
      "He is used to waking up early.": "Él está acostumbrado a levantarse temprano.",
      "I can't stand people being rude.": "No soporto que la gente sea grosera.",
      "She will have finished her project by tomorrow.": "Ella habrá terminado su proyecto para mañana.",
      "We should have left earlier to avoid the traffic.": "Deberíamos haber salido antes para evitar el tráfico.",
      "I wish I had more time to travel.": "Ojalá tuviera más tiempo para viajar.",
      "The book that I borrowed was very interesting.": "El libro que tomé prestado era muy interesante.",
      "Despite the rain, we decided to go hiking.": "A pesar de la lluvia, decidimos ir de excursión.",
      "He hasn't replied to my email yet.": "Él no ha respondido mi correo todavía.",
      "The more you practice, the better you get.": "Cuanto más practicas, mejor te vuelves.",
      "I was wondering if you could help me.": "Me preguntaba si podrías ayudarme.",
      "He regrets having made that mistake.": "Él lamenta haber cometido ese error.",
      "They had already left when we arrived.": "Ellos ya se habían ido cuando llegamos.",
      "She was supposed to meet us here.": "Se suponía que ella iba a encontrarse con nosotros aquí.",
      "I am looking forward to meeting you.": "Estoy deseando conocerte.",
      "He could have told us about the delay.": "Él podría habernos contado sobre el retraso.",
      "By the time we arrived, the show had started.": "Cuando llegamos, el espectáculo ya había comenzado.",
      "He denied having stolen the money.": "Él negó haber robado el dinero.",
      "If we had taken the train, we would have arrived on time.": "Si hubiéramos tomado el tren, habríamos llegado a tiempo.",
      "I didn't expect the movie to be so good.": "No esperaba que la película fuera tan buena.",
      "You should consider joining the team.": "Deberías considerar unirte al equipo.",
      "I had no idea you were so talented.": "No tenía idea de que eras tan talentoso."
    };
  }

  // You can add methods to this class as needed, such as:
  translate(sentence) {
    return this.translations[sentence] || "Translation not found";
  }
}

class ExplanationManager {
  constructor() {
    this.explanations = {
      // A1 level explanations
      "This is a dog.": "En inglés, se usa 'this is' para indicar algo cercano y se acompaña con un sustantivo.",
      "I like apples.": "La estructura básica es sujeto + verbo + objeto. 'Like' indica preferencia.",
      "She is my friend.": "Se usa 'is' para describir una relación o estado. 'My friend' es el objeto.",
      "We have a big house.": "El verbo 'have' se usa para expresar posesión.",
      "The cat is under the table.": "Se usa 'under' para indicar posición.",
      "He has a red car.": "El adjetivo 'red' describe al sustantivo 'car'.",
      "I am happy today.": "Se usa 'am' con un adjetivo para describir emociones o estados temporales.",
      "They are in the garden.": "La preposición 'in' indica ubicación.",
      "Can I have some water?": "La estructura 'Can I have' se usa para hacer una solicitud educada.",
      "She likes to read books.": "Se usa 'likes' para expresar preferencia, seguido de un verbo en infinitivo.",
      "I don't understand.": "Se usa 'don't' para expresar negación en presente simple.",
      "What is your name?": "Se usa 'What is' para preguntar información personal.",
      "The book is on the table.": "La preposición 'on' indica que algo está sobre una superficie.",
      "Do you like pizza?": "Se usa 'Do you like' para hacer preguntas sobre preferencias.",
      "Where are you from?": "Se usa 'Where are you from' para preguntar la procedencia de alguien.",
      "I have two brothers.": "Se usa 'have' para expresar posesión.",
      "The weather is nice today.": "Se usa 'is' para describir el clima.",
      "Do you speak English?": "Se usa 'Do you speak' para preguntar si alguien habla un idioma.",
      "How old are you?": "Se usa 'How old are you' para preguntar la edad.",
      "I need a pen.": "Se usa 'need' para expresar necesidad.",
      "He is a doctor.": "Se usa 'is' para describir ocupaciones.",
      "We are students.": "Se usa 'are' para describir un grupo.",
      "The car is blue.": "Se usa 'is' para describir características físicas.",
      "My house is big.": "Se usa 'is' con un adjetivo para describir algo.",
      "Do they live here?": "Se usa 'Do they live' para preguntar si alguien vive en un lugar.",
      "Where is the bathroom?": "Se usa 'Where is' para preguntar por una ubicación.",
      "The shop is closed.": "Se usa 'is' para describir estados temporales.",
      "I like to play football.": "Se usa 'like to play' para expresar interés en actividades.",
      "She is very kind.": "Se usa 'is' con un adjetivo para describir personalidad.",

      // A2 level explanations
      "The sun is shining brightly.": "Se usa 'is' como verbo auxiliar para formar el presente continuo ('is shining') y describir algo que sucede ahora.",
      "We are going to the park.": "El presente continuo 'are going' se usa para describir planes futuros o acciones en curso.",
      "I have never been to France.": "La estructura 'have never been' se usa en el presente perfecto para expresar experiencias no vividas.",
      "She is wearing a beautiful dress.": "El presente continuo 'is wearing' describe algo que está sucediendo en este momento.",
      "They will arrive tomorrow morning.": "La estructura 'will' se usa para hablar de eventos futuros.",
      "Can you help me with this?": "Se usa 'Can you' para pedir ayuda de manera educada.",
      "There is a bank near the station.": "La expresión 'There is' se usa para indicar la existencia de algo.",
      "I forgot to bring my wallet.": "Se usa 'forgot to' para hablar de algo que no hicimos.",
      "She often goes to the library.": "El adverbio 'often' se usa para describir la frecuencia de una acción.",
      "We must finish this project soon.": "El modal 'must' expresa obligación o necesidad.",
      "He doesn't like spicy food.": "Se usa 'doesn't' para expresar negación en presente simple.",
      "Why are you late?": "La pregunta 'Why are you' se usa para indagar razones.",
      "I prefer tea over coffee.": "Se usa 'prefer' para expresar preferencias comparativas.",
      "My sister is taller than me.": "El comparativo 'taller than' se usa para comparar dos cosas o personas.",
      "The movie was very exciting.": "El adjetivo 'exciting' describe algo que causa emoción o interés.",
      "We have already finished our homework.": "El presente perfecto 'have already finished' indica que algo ya se ha completado.",
      "It is important to eat healthy food.": "La estructura 'It is important to' se usa para enfatizar recomendaciones o consejos.",
      "I haven't seen her in weeks.": "El presente perfecto negativo 'haven't seen' describe algo que no ha ocurrido en un período de tiempo.",
      "Do you know where the nearest bus stop is?": "Se usa 'Do you know' para pedir información de manera indirecta.",
      "We are planning a trip to the mountains.": "El presente continuo 'are planning' describe un plan futuro.",
      "She was born in 1990.": "Se usa 'was born' para hablar de fechas de nacimiento.",
      "The children are playing in the garden.": "El presente continuo 'are playing' describe una acción en curso.",
      "It will probably rain tomorrow.": "El adverbio 'probably' indica probabilidad.",
      "I usually go to bed at 10 PM.": "El adverbio 'usually' describe hábitos regulares.",
      "We need to buy some bread.": "La estructura 'need to' expresa necesidad o requerimiento.",
      "He is looking for his keys.": "El presente continuo 'is looking for' indica que alguien está buscando algo.",
      "She speaks English fluently.": "El adverbio 'fluently' describe cómo se realiza una acción.",
      "I didn't know about the meeting.": "Se usa 'didn't' para expresar negación en pasado simple.",
      "Can we meet at 5 PM?": "La estructura 'Can we' se usa para sugerir planes o reuniones.",

      // B1 level explanations
      "She has been working all day.": "El presente perfecto continuo 'has been working' describe una acción que comenzó en el pasado y continúa en el presente.",
      "It was a challenging experience.": "Se usa 'was' para describir algo en el pasado. 'Challenging experience' es un sustantivo compuesto.",
      "I would have called you if I had known.": "El condicional perfecto 'would have called' se usa para hablar de acciones que no ocurrieron en el pasado pero podrían haber sucedido bajo ciertas condiciones.",
      "They are planning to move abroad next year.": "El presente continuo 'are planning' indica intenciones o planes futuros.",
      "I regret not studying harder for the exam.": "El verbo 'regret' seguido de un gerundio expresa arrepentimiento por una acción pasada.",
      "We had been waiting for hours before they arrived.": "El pasado perfecto continuo 'had been waiting' describe una acción continua que ocurrió antes de otra acción en el pasado.",
      "If I were you, I would take the job.": "El condicional tipo 2 describe situaciones hipotéticas. 'If I were' es una forma común en estas estructuras.",
      "He is used to waking up early.": "La expresión 'is used to' seguida de un gerundio indica que alguien está acostumbrado a algo.",
      "I can't stand people being rude.": "'Can't stand' seguido de un gerundio expresa fuerte aversión hacia algo.",
      "She will have finished her project by tomorrow.": "El futuro perfecto 'will have finished' se usa para hablar de algo que estará completado antes de un punto específico en el futuro.",
      "We should have left earlier to avoid the traffic.": "La estructura 'should have' indica algo que se debería haber hecho en el pasado.",
      "I wish I had more time to travel.": "'I wish' seguido de un pasado simple expresa un deseo sobre algo irreal o no alcanzado.",
      "The book that I borrowed was very interesting.": "La oración relativa 'that I borrowed' da información adicional sobre el sustantivo 'book'.",
      "Despite the rain, we decided to go hiking.": "'Despite' introduce una idea opuesta a lo esperado, seguido de un sustantivo o gerundio.",
      "He hasn't replied to my email yet.": "'Yet' se usa con el presente perfecto para indicar que algo no ha ocurrido pero se espera que ocurra.",
      "The more you practice, the better you get.": "La estructura 'The more... the better' muestra una relación proporcional entre dos acciones.",
      "I was wondering if you could help me.": "La estructura 'I was wondering if' se usa para hacer solicitudes educadas.",
      "He regrets having made that mistake.": "'Regrets having made' expresa arrepentimiento por una acción pasada.",
      "They had already left when we arrived.": "El pasado perfecto 'had already left' indica que algo ocurrió antes de otra acción en el pasado.",
      "She was supposed to meet us here.": "'Was supposed to' se usa para hablar de algo que debía ocurrir pero no sucedió.",
      "I am looking forward to meeting you.": "La expresión 'looking forward to' seguida de un gerundio expresa entusiasmo por algo en el futuro.",
      "He could have told us about the delay.": "'Could have' expresa algo que era posible pero no sucedió.",
      "By the time we arrived, the show had started.": "El pasado perfecto 'had started' indica que algo ocurrió antes de otra acción en el pasado.",
      "He denied having stolen the money.": "'Denied having stolen' indica que alguien rechazó haber hecho algo.",
      "If we had taken the train, we would have arrived on time.": "El condicional tipo 3 describe situaciones irreales en el pasado.",
      "I didn't expect the movie to be so good.": "'Didn't expect' se usa para expresar sorpresa por algo inesperado.",
      "You should consider joining the team.": "'Should consider' seguido de un gerundio sugiere algo como una buena idea.",
      "I had no idea you were so talented.": "'Had no idea' expresa sorpresa o falta de conocimiento."
    };
  }

  // Método para recuperar la explicación de una frase
  getExplanation(sentence) {
    return this.explanations[sentence] || "No explanation found for this sentence.";
  }
}


// Función para inicializar el reconocimiento de voz
function initSpeechRecognition() {
   // Verificar si el navegador soporta el reconocimiento de voz
   if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
       const recognition = new SpeechRecognition();
       
       recognition.continuous = false;
       recognition.interimResults = false;
       recognition.lang = 'en-US';
       
       return recognition;
   }
   return null;
}

// Llamada para inicializar el juego
function initializeGame() {
   const game = new LanguageLearningGame(phrasesByLevel);
   game.initGame();
   
   // Inicializar reconocimiento de voz si está disponible
   const speechRecognition = initSpeechRecognition();
   if (speechRecognition) {
       window.speechRecognition = speechRecognition;
   }
   
   // Inicializar sistema de progreso si no existe
   if (typeof window.progressTracker === 'undefined') {
       const progressScript = document.createElement('script');
       progressScript.src = 'js/progress.js';
       document.head.appendChild(progressScript);
   }
}

// Inicializar el juego cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", initializeGame);
