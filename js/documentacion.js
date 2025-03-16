document.addEventListener("DOMContentLoaded", () => {
  // Objeto con la información detallada para cada tema
  const resourceDetails = {
    toBe: {
      title: "Verbo To Be (A1)",
      content: `
        <p>
          El verbo <strong>to be</strong> es fundamental en inglés y se usa para describir estados, identidades y ubicaciones.
        </p>
        <h3>Formas del Verbo To Be:</h3>
        <ul>
          <li><strong>Presente:</strong> I am, You are, He/She/It is, We are, They are.</li>
          <li><strong>Pasado:</strong> I was, You were, He/She/It was, We were, They were.</li>
        </ul>
        <h3>Ejemplos:</h3>
        <ul>
          <li>I am a student.</li>
          <li>You are my friend.</li>
          <li>He is from Spain.</li>
        </ul>
        <p>
          Además, se usa para formar la voz pasiva y tiempos compuestos.
        </p>
      `,
    },
    tiempos: {
      title: "Tiempos Verbales Básicos (A2)",
      content: `
        <p>
          Los tiempos verbales son esenciales para situar las acciones en el tiempo. Los principales tiempos en inglés incluyen:
        </p>
        <ul>
          <li><strong>Presente Simple:</strong> Hechos habituales. Ej: "I eat breakfast every day."</li>
          <li><strong>Presente Continuo:</strong> Acciones en curso. Ej: "I am eating breakfast now."</li>
          <li><strong>Pasado Simple:</strong> Acciones completadas en el pasado. Ej: "I ate breakfast yesterday."</li>
          <li><strong>Presente Perfecto:</strong> Conexión con el presente. Ej: "I have eaten breakfast."</li>
          <li><strong>Futuro Simple:</strong> Acciones futuras. Ej: "I will eat breakfast tomorrow."</li>
        </ul>
        <p>
          Conocer cada uno te ayudará a expresarte con precisión.
        </p>
      `,
    },
    oraciones: {
      title: "Construcción de Oraciones (A1/A2)",
      content: `
        <p>
          La estructura básica de una oración en inglés es <strong>Sujeto + Verbo + Objeto</strong>.
        </p>
        <h3>Ejemplos:</h3>
        <ul>
          <li><strong>Afirmativa:</strong> "She reads a book."</li>
          <li><strong>Negativa:</strong> "She does not read a book."</li>
          <li><strong>Interrogativa:</strong> "Does she read a book?"</li>
        </ul>
        <p>
          Dominar estas estructuras es esencial para construir oraciones correctas.
        </p>
      `,
    },
    modalverbs: {
      title: "Modal Verbs y Expresiones (A2/B1)",
      content: `
        <p>
          Los modal verbs (can, could, will, would, should, must) se usan para expresar habilidad, posibilidad, permiso y obligación.
        </p>
        <h3>Ejemplos:</h3>
        <ul>
          <li><strong>Can:</strong> "I can swim."</li>
          <li><strong>Should:</strong> "You should study."</li>
          <li><strong>Will:</strong> "I will help you."</li>
        </ul>
        <p>
          Estos verbos son fundamentales para matizar el significado en diversas situaciones.
        </p>
      `,
    },
    prepositions: {
      title: "Preposiciones y Adverbios (A2)",
      content: `
        <p>
          Las preposiciones y adverbios establecen relaciones de lugar, tiempo y modo.
        </p>
        <ul>
          <li><strong>In, On, At:</strong> Ubicación y momentos específicos. Ej: "I live in Spain."</li>
          <li><strong>By, With, For:</strong> Medios o finalidad. Ej: "Written by Shakespeare."</li>
        </ul>
        <p>
          Su dominio es clave para una comunicación precisa.
        </p>
      `,
    },
    idioms: {
      title: "Expresiones Idiomáticas (B1)",
      content: `
        <p>
          Las expresiones idiomáticas son frases cuyo significado no es literal y enriquecen el lenguaje.
        </p>
        <ul>
          <li><strong>Break the ice:</strong> Romper el hielo, iniciar una conversación.</li>
          <li><strong>Once in a blue moon:</strong> Algo que ocurre raramente.</li>
          <li><strong>Piece of cake:</strong> Algo muy fácil de hacer.</li>
        </ul>
        <p>
          Conocer estos modismos te ayudará a hablar de forma más natural.
        </p>
      `,
    },
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
