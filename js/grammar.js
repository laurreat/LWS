document.addEventListener("DOMContentLoaded", () => {
   const gameArea = document.getElementById("game-area");
   const optionsContainer = document.getElementById("options");
   const progress = document.getElementById("progress");
   const feedbackMessage = document.getElementById("feedback-message");

   let currentGameData = [];
   let currentQuestionIndex = 0;
   let correctAnswers = 0;

   // Grammar data for each level
   const grammarData = {
       A1: [
           {
               question: "Choose the correct form of the verb 'to be':",
               sentence: "I ____ a student.",
               options: ["am", "is", "are"],
               correct: 0,
               explanation: "Para la primera persona singular (I) usamos 'am'"
           },
           {
               question: "Choose the correct article:",
               sentence: "____ apple a day keeps the doctor away.",
               options: ["A", "An", "The"],
               correct: 1,
               explanation: "Usamos 'an' antes de palabras que empiezan con sonido vocal"
           },
           {
               question: "Choose the correct plural form:",
               sentence: "I have two ____.",
               options: ["dog", "dogs", "dog's"],
               correct: 1,
               explanation: "Para plurales regulares añadimos -s al sustantivo"
           },
           {
               question: "Choose the correct verb form:",
               sentence: "She ____ to school every day.",
               options: ["go", "goes", "going"],
               correct: 1,
               explanation: "Para tercera persona singular (she/he/it) en presente simple añadimos -s"
           },
           {
               question: "Choose the correct form:",
               sentence: "They ____ playing football.",
               options: ["is", "am", "are"],
               correct: 2,
               explanation: "Para tercera persona plural (they) usamos 'are' con el gerundio (-ing)"
           }
       ],
       A2: [
           {
               question: "Choose the correct past tense:",
               sentence: "Yesterday I ____ to the park.",
               options: ["go", "goes", "went"],
               correct: 2,
               explanation: "El pasado irregular de 'go' es 'went'"
           },
           {
               question: "Choose the correct preposition:",
               sentence: "The book is ____ the table.",
               options: ["in", "on", "under"],
               correct: 1,
               explanation: "Usamos 'on' para indicar posición sobre una superficie"
           },
           {
               question: "Choose the correct comparative:",
               sentence: "This movie is ____ than the one we saw last week.",
               options: ["good", "better", "best"],
               correct: 1,
               explanation: "Para comparar dos cosas usamos el comparativo 'better'"
           },
           {
               question: "Choose the correct future form:",
               sentence: "Tomorrow I ____ visit my grandparents.",
               options: ["am going to", "going to", "go to"],
               correct: 0,
               explanation: "Para planes futuros usamos 'am going to' + verbo"
           },
           {
               question: "Choose the correct adverb:",
               sentence: "She speaks English ____.",
               options: ["good", "well", "better"],
               correct: 1,
               explanation: "Para describir cómo se hace una acción usamos adverbios, 'well' es el adverbio de 'good'"
           }
       ],
       B1: [
           {
               question: "Choose the correct conditional:",
               sentence: "If I ____ enough money, I would buy a new car.",
               options: ["have", "had", "have had"],
               correct: 1,
               explanation: "En condicionales tipo 2 (irreal presente) usamos past simple en la cláusula si"
           },
           {
               question: "Choose the correct passive voice:",
               sentence: "The letter ____ by John yesterday.",
               options: ["was written", "is written", "has been written"],
               correct: 0,
               explanation: "Para pasado simple en voz pasiva usamos was/were + past participle"
           },
           {
               question: "Choose the correct modal verb:",
               sentence: "You ____ see a doctor if you feel sick.",
               options: ["can", "should", "must"],
               correct: 1,
               explanation: "Para dar consejos usamos 'should'"
           },
           {
               question: "Choose the correct relative pronoun:",
               sentence: "The woman ____ lives next door is a doctor.",
               options: ["who", "which", "whose"],
               correct: 0,
               explanation: "Para referirnos a personas usamos 'who' como pronombre relativo"
           },
           {
               question: "Choose the correct reported speech:",
               sentence: "She said she ____ tired.",
               options: ["is", "was", "will be"],
               correct: 1,
               explanation: "En estilo indirecto cambiamos los tiempos verbales hacia el pasado"
           }
       ]
   };

   function initGame() {
       const urlParams = new URLSearchParams(window.location.search);
       const level = urlParams.get("level");
       
       if (!level || !grammarData[level]) {
           alert("Invalid or missing level! Redirecting to the main menu.");
           window.location.href = "index.html";
           return;
       }

       currentGameData = grammarData[level];
       currentQuestionIndex = 0;
       correctAnswers = 0;
       
       loadQuestion();
   }

   function loadQuestion() {
       // Clear game area
       gameArea.innerHTML = "";
       optionsContainer.innerHTML = "";
       feedbackMessage.textContent = "";
       feedbackMessage.style.opacity = "0";

       // Update progress
       progress.textContent = `Question ${currentQuestionIndex + 1} of ${currentGameData.length}`;

       const questionObj = currentGameData[currentQuestionIndex];

       // Create question element
       const questionElement = document.createElement("div");
       questionElement.className = "question";
       questionElement.innerHTML = `
           <p>${questionObj.question}</p>
           <h3>${questionObj.sentence}</h3>
       `;
       gameArea.appendChild(questionElement);

       // Create options
       questionObj.options.forEach((option, index) => {
           const button = document.createElement("button");
           button.textContent = option;
           button.className = "option-button";
           button.dataset.index = index;
           
           button.addEventListener("click", () => {
               checkAnswer(index, questionObj.correct, questionObj.explanation);
           });
           
           optionsContainer.appendChild(button);
       });
   }

   function checkAnswer(selectedIndex, correctIndex, explanation) {
       const buttons = document.querySelectorAll(".option-button");
       
       // Disable all buttons
       buttons.forEach(button => {
           button.disabled = true;
       });
       
       // Check if answer is correct
       if (selectedIndex === correctIndex) {
           correctAnswers++;
           feedbackMessage.textContent = "¡Correcto! " + explanation;
           feedbackMessage.style.color = "var(--success-color)";
       } else {
           feedbackMessage.textContent = "Incorrecto. " + explanation;
           feedbackMessage.style.color = "var(--error-color)";
           
           // Highlight correct answer
           buttons[correctIndex].style.background = "var(--success-color)";
       }
       
       feedbackMessage.style.opacity = "1";
       
       // Move to next question after a delay
       setTimeout(() => {
           currentQuestionIndex++;
           
           if (currentQuestionIndex < currentGameData.length) {
               loadQuestion();
           } else {
               showFinalResults();
           }
       }, 2000);
   }

   function showFinalResults() {
       gameArea.innerHTML = "";
       optionsContainer.innerHTML = "";
       
       const scorePercentage = Math.round((correctAnswers / currentGameData.length) * 100);
       
       gameArea.innerHTML = `
           <h2>¡Juego completado!</h2>
           <p>Respondiste ${correctAnswers} de ${currentGameData.length} preguntas correctamente.</p>
           <p>Tu puntaje: ${scorePercentage}%</p>
       `;
       
       // Add restart button
       const restartButton = document.createElement("button");
       restartButton.textContent = "Jugar de nuevo";
       restartButton.className = "restart-button";
       restartButton.addEventListener("click", () => {
           initGame();
       });
       gameArea.appendChild(restartButton);
       
       // Add home button
       const homeButton = document.createElement("button");
       homeButton.textContent = "Volver al inicio";
       homeButton.className = "home-button";
       homeButton.addEventListener("click", () => {
           window.location.href = "index.html";
       });
       gameArea.appendChild(homeButton);
   }

   // Initialize game when DOM is loaded
   initGame();
});