document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("difficulty-modal");
  const infoModal = document.getElementById("info-modal");
  const gameButtons = document.querySelectorAll(".game-button");
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
  const closeModalButtons = document.querySelectorAll(".close-modal");
  const startGameButton = document.getElementById("start-game");
  const infoTitle = document.getElementById("info-title");
  const infoContent = document.getElementById("info-content");

  let selectedGame = "";
  let selectedLevel = "";

  // Verificar que existan todos los elementos necesarios
  if (
    !modal ||
    !infoModal ||
    gameButtons.length === 0 ||
    difficultyButtons.length === 0 ||
    closeModalButtons.length === 0 ||
    !startGameButton ||
    !infoTitle ||
    !infoContent
  ) {
    console.error("Uno o más elementos del DOM no existen. Verifica el HTML.");
    return;
  }

  // Función auxiliar para mostrar/ocultar modales
  const setModalDisplay = (modalElement, displayValue) => {
    modalElement.style.display = displayValue;
  };

  // Asignar eventos a los botones de juego
  gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "documentation") {
        window.location.href = "documentacion.html";
      } else {
        selectedGame = button.id;
        setModalDisplay(modal, "flex");
      }
    });
  });

  // Manejar selección de dificultad
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedLevel = button.dataset.level;
      if (selectedGame && selectedLevel) {
        setModalDisplay(modal, "none");
        showInfoModal(selectedGame, selectedLevel);
      } else {
        console.error("Error: Nivel o juego no seleccionados.");
      }
    });
  });

  // Función para mostrar modal de información
  function showInfoModal(game, level) {
    const topics = getTopics(game, level);
    infoTitle.textContent = `Temas a considerar (${level})`;
    infoContent.innerHTML = `
      <p>${topics.description}</p>
      ${topics.video ? `<video controls src="${topics.video}" width="100%"></video>` : ""}
    `;
    setModalDisplay(infoModal, "flex");
  }

  // Función para obtener temas según juego y nivel
  function getTopics(game, level) {
    const data = {
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

    return (data[game] && data[game][level]) || {
      description: "Información no disponible.",
    };
  }

  // Iniciar juego
  startGameButton.addEventListener("click", () => {
    if (selectedGame && selectedLevel) {
      window.location.href = `${selectedGame}.html?level=${selectedLevel}`;
    } else {
      console.error("Error: Juego o nivel no seleccionados.");
    }
  });

  // Cerrar modales
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setModalDisplay(modal, "none");
      setModalDisplay(infoModal, "none");
    });
  });

  // Al hacer clic en "Inicio" se desplaza suavemente hacia el top y se asegura que la navbar se muestre
  const homeButton = document.querySelector("a[href='#home']");
  homeButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".navbar").style.display = "flex";
  });
});
