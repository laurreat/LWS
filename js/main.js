document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // 1. DECLARACIÓN DE VARIABLES
  // ======================
  const elements = {
    modal: document.getElementById("difficulty-modal"),
    infoModal: document.getElementById("info-modal"),
    gameButtons: document.querySelectorAll(".game-button"),
    difficultyButtons: document.querySelectorAll(".difficulty-button"),
    closeModalButtons: document.querySelectorAll(".close-modal"),
    startGameButton: document.getElementById("start-game"),
    infoTitle: document.getElementById("info-title"),
    infoContent: document.getElementById("info-content"),
    menuToggle: document.querySelector('.menu-toggle'),
    navbarNav: document.querySelector('.navbar nav'),
    homeButton: document.querySelector("a[href='#home']"),
    navLinks: document.querySelectorAll('.navbar nav ul li a')
  };

  let state = {
    selectedGame: "",
    selectedLevel: ""
  };

  // ======================
  // 2. VALIDACIÓN INICIAL
  // ======================
  if (!validateEssentialElements(elements)) {
    console.error("Elementos esenciales no encontrados");
    return;
  }

  // ======================
  // 3. CONFIGURACIÓN RESPONSIVE
  // ======================
  setupResponsiveMenu(elements.menuToggle, elements.navbarNav, elements.navLinks);
  setupModalHandlers(elements, state);
  setupGameHandlers(elements, state);
  setupAdditionalBehaviors(elements);

  // ======================
  // FUNCIONES DE APOYO
  // ======================
  function validateEssentialElements({ modal, infoModal, gameButtons, startGameButton }) {
    return modal && infoModal && gameButtons.length > 0 && startGameButton;
  }

  function setupResponsiveMenu(menuToggle, navbarNav, navLinks) {
    // Toggle del menú móvil
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Cerrar menú al seleccionar opción (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navbarNav.classList.remove('active');
          menuToggle.querySelector('i').classList.remove('fa-times');
        }
      });
    });

    // Resetear menú al redimensionar
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navbarNav.classList.contains('active')) {
        navbarNav.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
      }
    });
  }

  function setupModalHandlers({ modal, infoModal, closeModalButtons }, state) {
    const modalActions = {
      show: (element) => element.style.display = "flex",
      hide: (element) => element.style.display = "none"
    };

    closeModalButtons.forEach(button => {
      button.addEventListener("click", () => {
        modalActions.hide(modal);
        modalActions.hide(infoModal);
      });
    });

    return { modalActions };
  }

function setupGameHandlers({ gameButtons, difficultyButtons, startGameButton, infoTitle, infoContent }, state) {
     gameButtons.forEach(button => {
       button.addEventListener("click", () => {
         if (button.id === "documentation") {
           window.location.href = "documentacion.html";
         } else if (button.id === "grammar") {
           window.location.href = "grammar.html";
         } else {
           state.selectedGame = button.id;
           elements.modal.style.display = "flex";
         }
       });
     });

    difficultyButtons.forEach(button => {
      button.addEventListener("click", () => {
        state.selectedLevel = button.dataset.level;
        if (state.selectedGame && state.selectedLevel) {
          elements.modal.style.display = "none";
          showInfoModal(state.selectedGame, state.selectedLevel);
        }
      });
    });

    startGameButton.addEventListener("click", () => {
      if (state.selectedGame && state.selectedLevel) {
        window.location.href = `${state.selectedGame}.html?level=${state.selectedLevel}`;
      }
    });

    function showInfoModal(game, level) {
      const topics = getGameTopics(game, level);
      infoTitle.textContent = `Temas a considerar (${level})`;
      infoContent.innerHTML = `
        <p>${topics.description}</p>
        ${topics.video ? `<video controls src="${topics.video}" width="100%"></video>` : ""}
      `;
      elements.infoModal.style.display = "flex";
    }

// Función para obtener temas según juego y nivel
   function getGameTopics(game, level) {
     const gameData  = {
       phrases: {
         A1: {
           description:
             "Aprenderás frases básicas como saludos, despedidas, adjetivos, verbos. / You will learn basic phrases such as greetings, farewells, adjectives, verbs.",
           video: "assets/videos/phrases-a1.mp4",
         },
         A2: {
           description:
             "Frases comunes para describir actividades diarias, adjetivos a objetos, preguntas, lugares, hora. / Common phrases to describe daily activities, adjectives to objects, questions, places, time, etc.",
           video: "assets/videos/phrases-a2.mp4",
         },
         B1: {
           description: "Frases para discusiones más complejas y opiniones. / ",
           video: "assets/videos/phrases-b1.mp4",
         },
       },
       vocabulary: {
         A1: {
           description:
             "Vocabulario básico como animales, objetos, climas y otros. / Basic vocabulary such as animals, objects, climates and others.",
           video: "assets/videos/vocabulary-a1.mp4",
         },
         A2: {
           description:
             "Vocabulario intermedio como animales, lugares. / Intermediate vocabulary such as animals, places.",
           video: "assets/videos/vocabulary-a2.mp4",
         },
         B1: {
           description:
             "Vocabulario avanzado para contextos profesionales. / Advanced vocabulary for professional contexts.",
           video: "assets/videos/vocabulary-b1.mp4",
         },
       },
       organizeSentence: {
         A1: {
           description:
             "Organiza las palabras para formar la oración correcta. / Arrange the words to form the correct sentence.",
           video: "assets/videos/organize-a1.mp4",
         },
         A2: {
           description:
             "Escribe la oración correcta a partir de las palabras desordenadas. / Type the correct sentence based on the scrambled words.",
           video: "assets/videos/organize-a2.mp4",
         },
         B1: {
           description:
             "Utiliza los audios de cada palabra para organizar la oración. / Use the audio cues to arrange the sentence.",
           video: "assets/videos/organize-b1.mp4",
         },
       },
       grammar: {
         A1: {
           description:
             "Aprenderás los conceptos básicos de gramática: sujeto y verbo, artículos (a, an, the), plurales simples y el verbo 'to be' en presente. / You will learn basic grammar concepts: subject and verb, articles (a, an, the), simple plurals and the verb 'to be' in present tense.",
           video: "assets/videos/grammar-a1.mp4",
         },
         A2: {
           description:
             "Practicarás tiempos verbales (presente, pasado, futuro), preposiciones de lugar y tiempo, y estructuras comparativas. / You will practice verb tenses (present, past, future), place and time prepositions, and comparative structures.",
           video: "assets/videos/grammar-a2.mp4",
         },
         B1: {
           description:
             "Profundizarás en gramática avanzada: condicionales, verbos modales, voz pasiva y oraciones complejas con conectores. / You will deepen your knowledge of advanced grammar: conditionals, modal verbs, passive voice and complex sentences with connectors.",
           video: "assets/videos/grammar-b1.mp4",
         },
       },
     };

    return gameData[game]?.[level] || { description: "Información no disponible." };
  }
}

function setupAdditionalBehaviors({ homeButton, navbarNav }) {
  if (homeButton) {
    homeButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.innerWidth <= 768) {
        navbarNav.classList.add('active');
      }
    });
  }
}
});
