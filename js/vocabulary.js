document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const optionsContainer = document.getElementById("options");
  const vocabImage = document.getElementById("vocab-image");
  const progress = document.getElementById("progress");
  const feedbackMessage = document.getElementById("feedback-message");

  let currentGameWords = [];
  let currentWordIndex = 0;
  let correctAnswers = 0; // Contador de respuestas correctas

  // Vocabulary data for each level
  const vocabularyData = {
    A1: [
      {
        word: "Apple",
        image: "apple.png",
        options: ["Banana", "Apple", "Orange"],
      },
      {
        word: "Dog",
        image: "dog.png",
        options: ["Bird", "Cat", "Dog"],
      },
      {
        word: "Car",
        image: "car.png",
        options: ["Bus", "Bike", "Car"],
      },
      {
        word: "House",
        image: "house.png",
        options: ["Villa", "House", "Apartment"],
      },
      {
        word: "Book",
        image: "book.png",
        options: ["Paper", "Pen", "Book"],
      },
      {
        word: "Chair",
        image: "chair.png",
        options: ["Table", "Sofa", "Chair"],
      },
      {
        word: "Ball",
        image: "ball.png",
        options: ["Glove", "Bat", "Ball"],
      },
      {
        word: "Cat",
        image: "cat.png",
        options: ["Cat", "Bird", "Dog"],
      },
      {
        word: "Tree",
        image: "tree.png",
        options: ["Flower", "Bush", "Tree"],
      },
      {
        word: "Water",
        image: "water.png",
        options: ["Milk", "Water", "Juice"],
      },
      {
        word: "Milk",
        image: "milk.png",
        options: ["Juice", "Milk", "Water"],
      },
      {
        word: "Fish",
        image: "fish.png",
        options: ["Cow", "Fish", "Bird"],
      },
      {
        word: "Bird",
        image: "bird.png",
        options: ["Cat", "Bird", "Dog"],
      },
      {
        word: "Flower",
        image: "flower.png",
        options: ["Bush", "Flower", "Tree"],
      },
      {
        word: "Hat",
        image: "hat.png",
        options: ["Shoes", "Hat", "Gloves"],
      },
      {
        word: "Bread",
        image: "bread.png",
        options: ["Pasta", "Bread", "Rice"],
      },
      {
        word: "Pen",
        image: "pen.png",
        options: ["Pencil", "Marker", "Pen"],
      },
      {
        word: "Shoe",
        image: "shoe.png",
        options: ["Boot", "Shoe", "Sock"],
      },
      {
        word: "Cup",
        image: "cup.png",
        options: ["Bowl", "Plate", "Cup"],
      },
      {
        word: "Table",
        image: "table.png",
        options: ["Sofa", "Table", "Chair"],
      },
      {
        word: "Window",
        image: "window.png",
        options: ["Window", "Roof", "Door"],
      },
      {
        word: "Clock",
        image: "clock.png",
        options: ["Watch", "Timer", "Clock"],
      },
      {
        word: "Sun",
        image: "sun.png",
        options: ["Star", "Moon", "Sun"],
      },
      {
        word: "Rain",
        image: "rain.png",
        options: ["Cloud", "Rain", "Snow"],
      },
      {
        word: "Tea",
        image: "tea.png",
        options: ["Tea", "Juice", "Milk"],
      },
      {
        word: "Bus",
        image: "bus.png",
        options: ["Train", "Car", "Bus"],
      },
      {
        word: "School",
        image: "school.png",
        options: ["Library", "School", "Office"],
      },
      {
        word: "Plant",
        image: "plant.png",
        options: ["Grass", "Plant", "Tree"],
      },
      {
        word: "Garden",
        image: "garden.png",
        options: ["Yard", "Park", "Garden"],
      },
      {
        word: "Cake",
        image: "cake.png",
        options: ["Cookie", "Pie", "Cake"],
      },
      {
        word: "Moon",
        image: "moon.png",
        options: ["Planet", "Moon", "Star"],
      },
      {
        word: "Bottle",
        image: "bottle.png",
        options: ["Jar", "Bottle", "Cup"],
      },
      {
        word: "Fork",
        image: "fork.png",
        options: ["Spoon", "Knife", "Fork"],
      },
      {
        word: "Beach",
        image: "beach.png",
        options: ["River", "Mountain", "Beach"],
      },
      {
        word: "Horse",
        image: "horse.png",
        options: ["Cow", "Pig", "Horse"],
      },
      {
        word: "Duck",
        image: "duck.png",
        options: ["Chicken", "Duck", "Goose"],
      },
      {
        word: "Cloud",
        image: "cloud.png",
        options: ["Fog", "Cloud", "Smoke"],
      },
      {
        word: "Paper",
        image: "paper.png",
        options: ["Notebook", "Paper", "Book"],
      },
      {
        word: "Lamp",
        image: "lamp.png",
        options: ["Light", "Fan", "Lamp"],
      },
      {
        word: "Key",
        image: "tree.png",
        options: ["Key", "Flower", "Tree"],
      },
    ],
    A2: [
      {
        word: "Elephant",
        image: "elephant.png",
        options: ["Elephant", "Tiger", "Lion"],
      },
      {
        word: "Guitar",
        image: "guitar.png",
        options: ["Guitar", "Piano", "Drums"],
      },
      {
        word: "Mountain",
        image: "mountain.png",
        options: ["Ocean", "Mountain", "Lake"],
      },
      {
        word: "Train",
        image: "train.png",
        options: ["Bus", "Train", "Car"],
      },
      {
        word: "River",
        image: "river.png",
        options: ["Sea", "River", "Lake"],
      },
      {
        word: "Lemon",
        image: "lemon.png",
        options: ["Orange", "Apple", "Lemon"],
      },
      {
        word: "Bridge",
        image: "bridge.png",
        options: ["Bridge", "Road", "Tunnel"],
      },
      {
        word: "Forest",
        image: "forest.png",
        options: ["Park", "Forest", "Jungle"],
      },
      {
        word: "Castle",
        image: "castle.png",
        options: ["Palace", "Castle", "Tower"],
      },
      {
        word: "Rocket",
        image: "rocket.png",
        options: ["Airplane", "Rocket", "Satellite"],
      },
      {
        word: "Island",
        image: "island.png",
        options: ["Continent", "Peninsula", "Island"],
      },
      {
        word: "Helmet",
        image: "helmet.png",
        options: ["Cap", "Helmet", "Hat"],
      },
      {
        word: "Market",
        image: "market.png",
        options: ["Mall", "Shop", "Market"],
      },
      {
        word: "Statue",
        image: "statue.png",
        options: ["Monument", "Building", "Statue"],
      },
      {
        word: "Candle",
        image: "candle.png",
        options: ["Torch", "Candle", "Lamp"],
      },
      {
        word: "Doknkey",
        image: "donkey.png",
        options: ["Donkey", "Horse", "Zebra"],
      },
      {
        word: "Desert",
        image: "desert.png",
        options: ["Mountain", "Forest", "Desert"],
      },
      {
        word: "Ocean",
        image: "ocean.png",
        options: ["River", "Ocean", "Lake"],
      },
      {
        word: "Eraser",
        image: "eraser.png",
        options: ["Pencil", "Eraser", "Sharpener"],
      },
      {
        word: "Stadium",
        image: "stadium.png",
        options: ["Arena", "Stadium", "Park"],
      },
      {
        word: "Violin",
        image: "violin.png",
        options: ["Guitar", "Cello", "Violin"],
      },
      {
        word: "Cave",
        image: "cave.png",
        options: ["Pit", "Cave", "Tunnel"],
      },
      {
        word: "Pyramid",
        image: "pyramid.png",
        options: ["Temple", "Pyramid", "Castle"],
      },
      {
        word: "Gloves",
        image: "gloves.png",
        options: ["Socks", "Hat", "Gloves"],
      },
      {
        word: "Volcano",
        image: "volcano.png",
        options: ["Hill", "Volcano", "Mountain"],
      },
      {
        word: "Sand",
        image: "sand.png",
        options: ["Mud", "Grass", "Sand"],
      },
      {
        word: "Umbrella",
        image: "umbrella.png",
        options: ["Raincoat", "Umbrella", "Hat"],
      },
      {
        word: "Tower",
        image: "tower.png",
        options: ["Fort", "Tower", "Castle"],
      },
      {
        word: "Knife",
        image: "knife.png",
        options: ["Fork", "Spoon", "Knife"],
      },
      {
        word: "Painting",
        image: "painting.png",
        options: ["Drawing", "Painting", "Sculpture"],
      },
      {
        word: "Pier",
        image: "pier.png",
        options: ["Ramp", "Pier", "Bridge"],
      },
      {
        word: "Drums",
        image: "drums.png",
        options: ["Flute", "Drums", "Piano"],
      },
      {
        word: "Bag",
        image: "bag.png",
        options: ["Box", "Bag", "Basket"],
      },
      {
        word: "Glasses",
        image: "glasses.png",
        options: ["Binoculars", "Glasses", "Sunglasses"],
      },
      {
        word: "Fan",
        image: "fan.png",
        options: ["Heater", "Fan", "AC"],
      },
      {
        word: "Balloon",
        image: "balloon.png",
        options: ["Kite", "Bubble", "Balloon"],
      },
      {
        word: "Bicycle",
        image: "bicycle.png",
        options: ["Scooter", "Bicycle", "Motorcycle"],
      },
      {
        word: "Pillow",
        image: "pillow.png",
        options: ["Cushion", "Blanket", "Pillow"],
      },
      {
        word: "Jacket",
        image: "jacket.png",
        options: ["Coat", "Jacket", "Sweater"],
      },
      {
        word: "Camera",
        image: "camera.png",
        options: ["Phone", "Tablet", "Camera"],
      },
    ],
    B1: [
      {
        word: "Laptop",
        image: "laptop.png",
        options: ["Tablet", "Laptop", "Phone"],
      },
      {
        word: "Planet",
        image: "planet.png",
        options: ["Galaxy", "Planet", "Star"],
      },
      {
        word: "Satellite",
        image: "satellite.png",
        options: ["Spacecraft", "Satellite", "Rocket"],
      },
      {
        word: "Aquarium",
        image: "aquarium.png",
        options: ["Fish Tank", "Aquarium", "Lake"],
      },
      {
        word: "Factory",
        image: "factory.png",
        options: ["Factory", "Workshop", "Warehouse"],
      },
      {
        word: "Library",
        image: "library.png",
        options: ["Office", "Library", "School"],
      },
      {
        word: "Astronaut",
        image: "astronaut.png",
        options: ["Astronaut", "Pilot", "Scientist"],
      },
      {
        word: "Compass",
        image: "compass.png",
        options: ["Ruler", "Compass", "Map"],
      },
      {
        word: "Dinosaur",
        image: "dinosaur.png",
        options: ["Dragon", "Dinosaur", "Lizard"],
      },
      {
        word: "Fossil",
        image: "fossil.png",
        options: ["Rock", "Bone", "Fossil"],
      },
      {
        word: "Microscope",
        image: "microscope.png",
        options: ["Lens", "Microscope", "Telescope"],
      },
      {
        word: "Telescope",
        image: "telescope.png",
        options: ["Binoculars", "Microscope", "Telescope"],
      },
      {
        word: "Spaceship",
        image: "spaceship.png",
        options: ["Rocket", "Satellite", "Spaceship"],
      },
      {
        word: "Museum",
        image: "museum.png",
        options: ["Gallery", "Library", "Museum"],
      },
      {
        word: "Parachute",
        image: "parachute.png",
        options: ["Glider", "Wingsuit", "Parachute"],
      },
      {
        word: "Laboratory",
        image: "laboratory.png",
        options: ["Workshop", "Factory", "Laboratory"],
      },
      {
        word: "Submarine",
        image: "submarine.png",
        options: ["Ship", "Submarine", "Boat"],
      },
      {
        word: "Harbor",
        image: "harbor.png",
        options: ["Dock", "Port", "Harbor"],
      },
      {
        word: "Blueprint",
        image: "blueprint.png",
        options: ["Draft", "Sketch", "Blueprint"],
      },
      {
        word: "Dome",
        image: "dome.png",
        options: ["Spire", "Dome", "Tower"],
      },
      {
        word: "Elevator",
        image: "elevator.png",
        options: ["Staircase", "Elevator", "Escalator"],
      },
      {
        word: "Runway",
        image: "runway.png",
        options: ["Track", "Runway", "Road"],
      },
      {
        word: "Greenhouse",
        image: "greenhouse.png",
        options: ["Farm", "Greenhouse", "Garden"],
      },
      {
        word: "Crater",
        image: "crater.png",
        options: ["Pit", "Hole", "Crater"],
      },
      {
        word: "Orchestra",
        image: "orchestra.png",
        options: ["Band", "Orchestra", "Choir"],
      },
      {
        word: "Radar",
        image: "radar.png",
        options: ["Sonar", "Compass", "Radar"],
      },
      {
        word: "Windmill",
        image: "windmill.png",
        options: ["Fan", "Windmill", "Turbine"],
      },
      {
        word: "Tram",
        image: "tram.png",
        options: ["Bus", "Tram", "Train"],
      },
      {
        word: "Monument",
        image: "monument.png",
        options: ["Statue", "Tower", "Monument"],
      },
      {
        word: "Cathedral",
        image: "cathedral.png",
        options: ["Church", "Cathedral", "Temple"],
      },
      {
        word: "Canyon",
        image: "canyon.png",
        options: ["Cliff", "Canyon", "Ravine"],
      },
      {
        word: "Skyscraper",
        image: "skyscraper.png",
        options: ["Building", "Tower", "Skyscraper"],
      },
      {
        word: "Generator",
        image: "generator.png",
        options: ["Battery", "Generator", "Motor"],
      },
      {
        word: "Ferry",
        image: "ferry.png",
        options: ["Boat", "Ferry", "Ship"],
      },
      {
        word: "Tunnel",
        image: "tunnel.png",
        options: ["Bridge", "Ramp", "Tunnel"],
      },
      {
        word: "Aqueduct",
        image: "aqueduct.png",
        options: ["Bridge", "Dam", "Aqueduct"],
      },
      {
        word: "Observatory",
        image: "observatory.png",
        options: ["Planetarium", "Observatory", "Museum"],
      },
      {
        word: "Chimney",
        image: "chimney.png",
        options: ["Vent", "Tower", "Chimney"],
      },
      {
        word: "Hurricane",
        image: "hurricane.png",
        options: ["Tornado", "Storm", "Hurricane"],
      },
      {
        word: "Coral Reef",
        image: "coral_reef.png",
        options: ["Island", "Ocean", "Coral Reef"],
      },
    ],
  };

  // Función para obtener el nivel de la URL
  const getLevelFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get("level");
    if (!level || !vocabularyData[level]) {
      alert("Invalid or missing level! Redirecting to the main menu.");
      window.location.href = "index.html";
    }
    return level;
  };

  // Obtener y validar el nivel de la URL
  currentLevel = getLevelFromURL();

  // Función para obtener palabras aleatorias del nivel seleccionado, evitando repeticiones
  const getWordsForGame = (level, count = 20) => {
    const availableWords = vocabularyData[level];
    const usedWords =
      JSON.parse(localStorage.getItem(`usedWords_${level}`)) || [];

    // Filtrar palabras no utilizadas
    const unusedWords = availableWords.filter(
      (word) => !usedWords.includes(word.word)
    );

    if (unusedWords.length < count) {
      // Si no hay suficientes palabras, reiniciar el almacenamiento de palabras usadas
      localStorage.setItem(`usedWords_${level}`, JSON.stringify([]));
      return shuffleArray(availableWords).slice(0, count);
    }

    const selectedWords = shuffleArray(unusedWords).slice(0, count);
    const usedWordsForCurrentGame = [
      ...usedWords,
      ...selectedWords.map((word) => word.word),
    ];

    // Guardar las palabras utilizadas en el localStorage para evitar que se repitan
    localStorage.setItem(
      `usedWords_${level}`,
      JSON.stringify(usedWordsForCurrentGame)
    );

    return selectedWords;
  };

  // Función para mezclar las palabras
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Función para cargar una palabra en el juego
  const loadWord = () => {
    const currentWord = currentGameWords[currentWordIndex];
    vocabImage.src = `assets/images/${currentWord.image}`;
    optionsContainer.innerHTML = "";

    currentWord.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option-button";
      button.addEventListener("click", () => checkAnswer(option, button));
      optionsContainer.appendChild(button);
    });

    progress.textContent = `Word ${currentWordIndex + 1} of ${
      currentGameWords.length
    }`;
  };

  // Función para verificar la respuesta seleccionada
  const checkAnswer = (selectedOption, button) => {
    const currentWord = currentGameWords[currentWordIndex];

    if (selectedOption === currentWord.word) {
      feedbackMessage.textContent = "Correct!";
      feedbackMessage.className = "correct";
      button.classList.add("correct");
      correctAnswers++; // Incrementar contador de respuestas correctas
    } else {
      feedbackMessage.textContent = "Incorrect!";
      feedbackMessage.className = "incorrect";
      button.classList.add("incorrect");
    }

    setTimeout(() => {
      feedbackMessage.textContent = "";
      button.classList.remove("correct", "incorrect");

      if (currentWordIndex === currentGameWords.length - 1) {
        showSummary();
      } else {
        currentWordIndex++;
        loadWord();
      }
    }, 1000);
  };

  // Función para mostrar el resumen al final del juego
  const showSummary = () => {
    gameArea.style.display = "none";

    const summaryDiv = document.createElement("div");
    summaryDiv.id = "game-summary";
    summaryDiv.innerHTML = `
      <h3>Game Over!</h3>
      <p>You answered ${correctAnswers} out of ${currentGameWords.length} correctly.</p>
      <a id="restart-button" href="index.html">Back to Menu</a>
    `;
    document.querySelector("main").appendChild(summaryDiv);
  };

  // Inicializar el juego con el nivel seleccionado
  const initializeGame = (level) => {
    currentGameWords = getWordsForGame(level, 12); // Obtener 12 palabras aleatorias
    loadWord();
  };

  // Iniciar el juego
  initializeGame(currentLevel);
});
