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
    homeButton: document.querySelector("a[href='#home']")
  };

  let state = {
    selectedGame: "",
    selectedLevel: ""
  };

  if (!validateEssentialElements(elements)) {
    console.error("Elementos esenciales no encontrados");
    return;
  }

  setupResponsiveMenu(elements.menuToggle, elements.navbarNav);
  setupModalHandlers(elements, state);
  setupGameHandlers(elements, state);
  setupAdditionalBehaviors(elements);

  function validateEssentialElements({ modal, infoModal, gameButtons, startGameButton }) {
    return modal && infoModal && gameButtons.length > 0 && startGameButton;
  }

  function setupResponsiveMenu(menuToggle, navbarNav) {
    // Toggle del menú móvil
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Cerrar menú al hacer click en enlaces (mobile)
    document.querySelectorAll('.navbar nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navbarNav.classList.remove('active');
          menuToggle.querySelector('i').classList.remove('fa-times');
        }
      });
    });

    // Cerrar menú al redimensionar ventana
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

    // Manejo de cierre de modales
    closeModalButtons.forEach(button => {
      button.addEventListener("click", () => {
        modalActions.hide(modal);
        modalActions.hide(infoModal);
      });
    });

    return { modalActions };
  }

  function setupGameHandlers({ gameButtons, difficultyButtons, startGameButton, infoTitle, infoContent }, state) {
    // Configurar botones de juego
    gameButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.id === "documentation") {
          window.location.href = "documentacion.html";
        } else {
          state.selectedGame = button.id;
          modalActions.show(elements.modal);
        }
      });
    });

    // Configurar niveles de dificultad
    difficultyButtons.forEach(button => {
      button.addEventListener("click", () => {
        state.selectedLevel = button.dataset.level;
        if (state.selectedGame && state.selectedLevel) {
          modalActions.hide(elements.modal);
          showInfoModal(state.selectedGame, state.selectedLevel);
        }
      });
    });

    // Iniciar juego
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
      modalActions.show(elements.infoModal);
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
    };

    return gameData[game]?.[level] || { description: "Información no disponible." };
  }
}

function setupAdditionalBehaviors({ homeButton, navbarNav }) {
  // Comportamiento del botón Home
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
