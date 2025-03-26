document.addEventListener("DOMContentLoaded", () => {
  // Objeto con información detallada para cada tema
  const resourceDetails = {
    toBe: {
      title: "Verbo To Be (A1)",
      content: `
        <p>
          El verbo <strong>to be</strong> es fundamental en inglés y se usa para describir estados, identidades, características y ubicaciones.
        </p>
        <h3>Formas y Uso:</h3>
        <ul>
          <li><strong>Afirmativa:</strong> I am, You are, He/She/It is, We are, They are.</li>
          <li><strong>Negativa:</strong> I am not, You are not, He/She/It is not, We are not, They are not.</li>
          <li><strong>Interrogativa:</strong> Am I?, Are you?, Is he/she/it?, Are we?, Are they?</li>
        </ul>
        <h3>Estructura de la Oración:</h3>
        <p>
          Una oración simple con el verbo <em>to be</em> sigue la estructura:
          <strong>Sujeto + To Be + Complemento</strong>.
        </p>
        <p>
          <strong>Ejemplo:</strong> "She is a teacher." Aquí, "She" es el sujeto, "is" el verbo y "a teacher" el complemento que define la identidad.
        </p>
      `,
    },
    tiempos: {
      title: "Tiempos Verbales Básicos (A2)",
      content: `
        <p>
          Los tiempos verbales permiten situar las acciones en el tiempo. A continuación se detallan los principales:
        </p>
        <h3>Presente Simple:</h3>
        <p>
          Se utiliza para hábitos y hechos generales. Estructura: <strong>Sujeto + Verbo (forma base) + Complemento</strong>.
          <br><em>Ejemplo:</em> "I eat breakfast every day."
        </p>
        <h3>Presente Continuo:</h3>
        <p>
          Indica acciones en curso. Estructura: <strong>Sujeto + To Be (am/is/are) + Verbo+ing + Complemento</strong>.
          <br><em>Ejemplo:</em> "I am eating breakfast now."
        </p>
        <h3>Pasado Simple:</h3>
        <p>
          Se utiliza para acciones terminadas en el pasado. Estructura: <strong>Sujeto + Verbo en pasado + Complemento</strong>.
          <br><em>Ejemplo:</em> "I ate breakfast yesterday."
        </p>
        <h3>Presente Perfecto:</h3>
        <p>
          Conecta el pasado con el presente. Estructura: <strong>Sujeto + Have/Has + Participio Pasado + Complemento</strong>.
          <br><em>Ejemplo:</em> "I have eaten breakfast."
        </p>
        <h3>Futuro Simple:</h3>
        <p>
          Se usa para acciones futuras. Estructura: <strong>Sujeto + Will + Verbo base + Complemento</strong>.
          <br><em>Ejemplo:</em> "I will eat breakfast tomorrow."
        </p>
      `,
    },
    oraciones: {
      title: "Construcción de Oraciones (A1/A2)",
      content: `
        <p>
          Entender la estructura de una oración es esencial para comunicarse correctamente en inglés. La estructura básica se compone de:
        </p>
        <ul>
          <li><strong>Sujeto:</strong> Quien realiza la acción.</li>
          <li><strong>Verbo:</strong> La acción o estado.</li>
          <li><strong>Complemento:</strong> Información adicional que completa la idea.</li>
        </ul>
        <h3>Ejemplo Detallado:</h3>
        <p>
          <strong>Oración:</strong> "She reads a book."<br>
          <strong>Sujeto:</strong> "She" (quien realiza la acción).<br>
          <strong>Verbo:</strong> "reads" (acción de leer).<br>
          <strong>Complemento:</strong> "a book" (lo que se lee).
        </p>
        <h3>Variaciones:</h3>
        <ul>
          <li><strong>Negativa:</strong> "She does not read a book." Se usa el auxiliar <em>do/does</em> para formar la negación.</li>
          <li><strong>Interrogativa:</strong> "Does she read a book?" Se invierte el auxiliar y el sujeto.</li>
        </ul>
      `,
    },
    modalverbs: {
      title: "Modal Verbs y Expresiones (A2/B1)",
      content: `
        <p>
          Los modal verbs se utilizan para expresar habilidad, posibilidad, permiso y obligación. Son esenciales para añadir matices a tus oraciones.
        </p>
        <h3>Principales Modal Verbs:</h3>
        <ul>
          <li><strong>Can:</strong> Habilidad o posibilidad. Ej: "I can swim."</li>
          <li><strong>Could:</strong> Pasado de "can" o posibilidad en el futuro. Ej: "I could help if needed."</li>
          <li><strong>Will:</strong> Futuro o determinación. Ej: "I will help you."</li>
          <li><strong>Would:</strong> Condicional o cortesía. Ej: "I would like a coffee."</li>
          <li><strong>Should:</strong> Consejo o recomendación. Ej: "You should study every day."</li>
          <li><strong>Must:</strong> Obligación o necesidad. Ej: "You must wear a seatbelt."</li>
        </ul>
        <h3>Estructura:</h3>
        <p>
          Los modal verbs se usan junto al verbo en su forma base, sin la "s" en tercera persona del singular.
        </p>
      `,
    },
    prepositions: {
      title: "Preposiciones y Adverbios (A2)",
      content: `
        <p>
          Las preposiciones y adverbios establecen relaciones de lugar, tiempo y modo en una oración.
        </p>
        <h3>Preposiciones Comunes:</h3>
        <ul>
          <li><strong>In:</strong> Para indicar ubicación dentro de algo (Ej: "in a room").</li>
          <li><strong>On:</strong> Para superficies (Ej: "on the table").</li>
          <li><strong>At:</strong> Para puntos específicos (Ej: "at the door").</li>
        </ul>
        <h3>Adverbios:</h3>
        <p>
          Se usan para modificar el verbo, indicando cómo, cuándo o dónde ocurre la acción.
          <br><em>Ejemplo:</em> "She sings beautifully." Aquí, "beautifully" describe el modo de cantar.
        </p>
      `,
    },
    idioms: {
      title: "Expresiones Idiomáticas (B1)",
      content: `
        <p>
          Las expresiones idiomáticas son frases cuyo significado no se deduce literalmente de las palabras que las componen. Dominar estos modismos te ayudará a comunicarte de forma natural y entender mejor a los hablantes nativos.
        </p>
        <h3>Ejemplos de Idioms:</h3>
        <ul>
          <li><strong>Break the ice:</strong> Romper el hielo, iniciar una conversación.</li>
          <li><strong>Once in a blue moon:</strong> Algo que ocurre muy raramente.</li>
          <li><strong>Piece of cake:</strong> Algo muy fácil de hacer.</li>
        </ul>
        <h3>Consejo:</h3>
        <p>
          Practica estos modismos en contextos reales para familiarizarte con su uso.
        </p>
      `,
    },
    articles: {
      title: "Artículos y Sustantivos (A1)",
      content: `
        <p>
          Los artículos definidos e indefinidos son cruciales para identificar y especificar sustantivos.
        </p>
        <h3>Artículos:</h3>
        <ul>
          <li><strong>Definido:</strong> "the" se usa para hablar de algo específico.</li>
          <li><strong>Indefinido:</strong> "a/an" se usa para hablar de algo en general.</li>
        </ul>
        <h3>Sustantivos:</h3>
        <p>
          Los sustantivos nombran personas, lugares, cosas o ideas. Su combinación con artículos y adjetivos forma el núcleo de la oración.
          <br><em>Ejemplo:</em> "A red apple" (Un manzana roja).
        </p>
      `,
    },
    pronunciation: {
      title: "Pronunciación e Intonación (A2/B1)",
      content: `
        <p>
          La correcta pronunciación e intonación son fundamentales para ser entendido en inglés. Este tema abarca:
        </p>
        <ul>
          <li><strong>Sonidos vocálicos y consonánticos:</strong> Identificar y practicar los sonidos específicos del inglés.</li>
          <li><strong>Estrés en las palabras:</strong> Determinar qué sílababa se pronuncia con mayor fuerza.</li>
          <li><strong>Intonación en oraciones:</strong> Usar la entonación para diferenciar preguntas, afirmaciones y emociones.</li>
        </ul>
        <p>
          <em>Ejemplo:</em> La oración "She didn't go" se pronuncia con énfasis en "didn't" para expresar negación enfática.
        </p>
      `,
    }
  };

  // Elementos del modal
  const modal = document.getElementById("detail-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const closeModalButton = document.querySelector(".close-modal");

  // 1. Evento para expandir/contraer tarjetas
  document.querySelectorAll(".card-header").forEach((header) => {
    header.addEventListener("click", () => {
      const card = header.closest(".resource-card");
      card.classList.toggle("active");
    });
  });

  // 2. Evento para abrir modal
  document.querySelectorAll(".view-more").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".resource-card");
      const topicKey = card.dataset.topic;

      if (resourceDetails[topicKey]) {
        modalTitle.innerHTML = resourceDetails[topicKey].title;
        modalBody.innerHTML = resourceDetails[topicKey].content;
        modal.style.display = "block";
      }
    });
  });

  // Cerrar modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
