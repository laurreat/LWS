document.addEventListener("DOMContentLoaded", () => {
  class SentenceOrganizerGame {
    constructor(sentencesByLevel) {
      this.sentencesByLevel = sentencesByLevel;
      this.currentLevel = this.getLevelFromURL();
      this.currentSentenceIndex = 0;
      this.currentSentences = [];
    }

    getLevelFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const level = urlParams.get("level");
      if (!level || !this.sentencesByLevel[level]) {
        alert("Invalid or missing level! Redirecting to the main menu.");
        window.location.href = "index.html";
      }
      return level;
    }

    initGame() {
      this.generateSentences();
      this.loadSentence();
    }

    generateSentences() {
      // Selecciona aleatoriamente 20 oraciones del nivel actual
      const allSentences = this.sentencesByLevel[this.currentLevel];
      const numberToPick = 20;
      this.currentSentences = allSentences
        .sort(() => Math.random() - 0.5)
        .slice(0, numberToPick);
      this.currentSentenceIndex = 0;
    }

    loadSentence() {
      const gameArea = document.getElementById("game-area");
      gameArea.innerHTML = ""; // Limpiar el área de juego

      const currentSentenceObj =
        this.currentSentences[this.currentSentenceIndex];
      const correctSentence = currentSentenceObj.sentence;
      const words = currentSentenceObj.words; // Array de palabras
      // Genera una versión mezclada de las palabras para mostrar la pista
      const scrambledWords = words.slice().sort(() => Math.random() - 0.5);

      if (this.currentLevel === "B1") {
        // --- MODO AUDIO + ESCRIBIR ---
        const instructions = document.createElement("p");
        instructions.textContent =
          "Listen to the audio and type the sentence you hear:";
        gameArea.appendChild(instructions);

        // Reproductor de audio
        const audio = document.createElement("audio");
        audio.controls = true;
        // Se usa la propiedad "audio" del objeto JSON (ej: "track-1.mp3")
        audio.src = `assets/audios/${currentSentenceObj.audio}`;
        gameArea.appendChild(audio);

        // Campo de entrada para que el usuario escriba la oración
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "sentence-input";
        inputField.placeholder = "Type the sentence here...";
        gameArea.appendChild(inputField);

        const checkButton = document.createElement("button");
        checkButton.id = "check-button";
        checkButton.textContent = "Check Sentence";
        gameArea.appendChild(checkButton);

        checkButton.addEventListener("click", () => {
          const userSentence = inputField.value.trim();
          this.checkSentence(userSentence, correctSentence);
        });
      } else if (this.currentLevel === "A2") {
        // --- MODO ESCRIBIR CON HINT (A2) ---
        const hintDiv = document.createElement("div");
        hintDiv.id = "word-hints";

        // Crea un span para cada palabra usando la clase "word-box"
        scrambledWords.forEach((word) => {
          const wordSpan = document.createElement("span");
          wordSpan.classList.add("word-box");
          wordSpan.textContent = word;
          hintDiv.appendChild(wordSpan);
        });

        gameArea.appendChild(hintDiv);

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "sentence-input";
        inputField.placeholder = "Type the sentence here...";
        gameArea.appendChild(inputField);

        const checkButton = document.createElement("button");
        checkButton.id = "check-button";
        checkButton.textContent = "Check Sentence";
        gameArea.appendChild(checkButton);

        checkButton.addEventListener("click", () => {
          const userSentence = inputField.value.trim();
          this.checkSentence(userSentence, correctSentence);
        });
      } else if (this.currentLevel === "A1") {
        // --- MODO ORDENAR PALABRAS (A1) ---
        const instructions = document.createElement("p");
        instructions.textContent =
          "Organiza las palabras para formar la oración correcta:";
        gameArea.appendChild(instructions);

        const hintDiv = document.createElement("div");
        hintDiv.id = "word-hints";

        // Mostrar cada palabra en un span con la clase "word-box"
        scrambledWords.forEach((word) => {
          const wordSpan = document.createElement("span");
          wordSpan.classList.add("word-box");
          wordSpan.textContent = word;
          hintDiv.appendChild(wordSpan);
        });

        gameArea.appendChild(hintDiv);

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "sentence-input";
        inputField.placeholder = "Escribe la oración aquí...";
        gameArea.appendChild(inputField);

        const checkButton = document.createElement("button");
        checkButton.id = "check-button";
        checkButton.textContent = "Verificar";
        gameArea.appendChild(checkButton);

        checkButton.addEventListener("click", () => {
          const userSentence = inputField.value.trim();
          this.checkSentence(userSentence, correctSentence);
        });
      }
    }

    checkSentence(userSentence, correctSentence) {
      if (userSentence.toLowerCase() === correctSentence.toLowerCase()) {
        this.showResult(true);
      } else {
        this.showResult(false);
      }
    }

showResult(isCorrect) {
       const gameArea = document.getElementById("game-area");
       const overlay = document.createElement("div");
       overlay.id = "result-overlay";

       if (isCorrect) {
         overlay.innerHTML = `
           <p class="result-message">Well done!</p>
           <p><strong>Correct Sentence:</strong> ${this.currentSentences[this.currentSentenceIndex].sentence}</p>
           <button id="next-button">${
             this.currentSentenceIndex < this.currentSentences.length - 1
               ? "Next Sentence"
               : "Finish"
           }</button>
         `;
       } else {
         overlay.innerHTML = `
           <p class="result-message">Incorrect, try again!</p>
           <p><strong>Correct Sentence:</strong> ${this.currentSentences[this.currentSentenceIndex].sentence}</p>
           <button id="retry-button">Retry</button>
         `;
       }

       gameArea.appendChild(overlay);

       if (isCorrect) {
         document.getElementById("next-button").addEventListener("click", () => {
           overlay.remove();
           this.currentSentenceIndex++;
           if (this.currentSentenceIndex < this.currentSentences.length) {
             this.loadSentence();
           } else {
             this.showSummary();
           }
         });
       } else {
         document.getElementById("retry-button").addEventListener("click", () => {
           overlay.remove();
           this.loadSentence();
         });
       }
     }
     
     // Función para mostrar notificación de logro
     showAchievementNotification(achievements) {
       achievements.forEach(achievement => {
         // Create notification element
         const notification = document.createElement("div");
         notification.className = "achievement-notification";
         notification.innerHTML = `
           <div class="achievement-content">
             <i class="fas ${achievement.icon} achievement-icon"></i>
             <div class="achievement-text">
               <h4>${achievement.name}</h4>
               <p>${achievement.description}</p>
               <span class="achievement-points">+${achievement.points} points</span>
             </div>
           </div>
         `;
         
         // Add styles if not already present
         if (!document.querySelector('.achievement-notification')) {
           const style = document.createElement("style");
           style.textContent = `
             .achievement-notification {
               position: fixed;
               bottom: 20px;
               right: 20px;
               background: var(--bg-dark);
               backdrop-filter: blur(10px);
               border: 2px solid var(--accent);
               border-radius: 15px;
               padding: 15px;
               display: flex;
               align-items: center;
               gap: 15px;
               box-shadow: 0 8px 15px var(--shadow-1), -8px -8px 15px var(--shadow-2);
               z-index: 1000;
               animation: slideIn 0.5s ease-out;
               max-width: 300px;
               font-family: "Poppins", sans-serif;
             }
             
             .achievement-icon {
               font-size: 2rem;
               color: var(--accent);
             }
             
             .achievement-text h4 {
               margin: 0 0 5px 0;
               color: var(--text-light);
               font-size: 1.2rem;
             }
             
             .achievement-text p {
               margin: 0;
               color: var(--secondary-text);
               font-size: 0.9rem;
             }
             
             .achievement-points {
               display: block;
               margin-top: 5px;
               font-weight: bold;
               color: var(--success-color);
               font-size: 0.9rem;
             }
             
             @keyframes slideIn {
               from {
                 transform: translateX(100%);
                 opacity: 0;
               }
               to {
                 transform: translateX(0);
                 opacity: 1;
               }
             }
             
             @keyframes slideOut {
               from {
                 transform: translateX(0);
                 opacity: 1;
               }
               to {
                 transform: translateX(100%);
                 opacity: 0;
               }
             }
           `;
           document.head.appendChild(style);
         }
         
         // Add notification to page
         document.body.appendChild(notification);
         
         // Remove after delay
         setTimeout(() => {
           notification.style.animation = "slideOut 0.5s ease-in";
           setTimeout(() => {
             notification.remove();
           }, 500);
         }, 5000);
       });
     }

showSummary() {
       const main = document.querySelector("main");
       const gameArea = document.getElementById("game-area");
       gameArea.style.display = "none";

       // Calculate score and points
       const correctCount = this.currentSentences.filter((_, index) => 
         index < this.currentSentenceIndex && 
         this.userAnswers[index] === this.currentSentences[index].sentence.toLowerCase()
       ).length;

       const totalQuestions = this.currentSentences.length;
       const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
       const pointsEarned = Math.round(correctCount * 10); // 10 points per correct answer

       const summaryDiv = document.createElement("div");
       summaryDiv.id = "game-summary";
       summaryDiv.innerHTML = `
         <h3>Game Over!</h3>
         <p>You completed ${correctCount} of ${totalQuestions} sentences correctly.</p>
         <p>Your score: ${scorePercentage}%</p>
         <p>Points earned: ${pointsEarned}</p>
         <button id="restart-button">Restart</button>
       `;
       main.appendChild(summaryDiv);

       document.getElementById("restart-button").addEventListener("click", () => {
         summaryDiv.remove();
         gameArea.style.display = "block";
         this.generateSentences();
         this.loadSentence();
       });
       
       // Add points to progress tracker
       setTimeout(() => {
         if (window.progressTracker) {
           const level = this.currentLevel;
           window.progressTracker.addPoints(level, "organizeSentence", pointsEarned);
           window.progressTracker.completeGame(level, "organizeSentence");
           
           // Show achievement notification if any
           const newAchievements = window.progressTracker.checkAchievements();
           if (newAchievements.length > 0) {
             showAchievementNotification(newAchievements);
           }
         }
       }, 500);
     }
  }

  // Ejemplo de estructura de datos para oraciones según nivel
  // Se incluyen 40 frases para cada nivel
  const sentencesByLevel = {
    "A1": [
      {
        "sentence": "I am a student.",
        "words": ["I", "am", "a", "student."]
      },
      {
        "sentence": "You are my friend.",
        "words": ["You", "are", "my", "friend."]
      },
      {
        "sentence": "He is happy.",
        "words": ["He", "is", "happy."]
      },
      {
        "sentence": "She is a teacher.",
        "words": ["She", "is", "a", "teacher."]
      },
      {
        "sentence": "We are siblings.",
        "words": ["We", "are", "siblings."]
      },
      {
        "sentence": "They are at home.",
        "words": ["They", "are", "at", "home."]
      },
      {
        "sentence": "It is a pen.",
        "words": ["It", "is", "a", "pen."]
      },
      {
        "sentence": "I like apples.",
        "words": ["I", "like", "apples."]
      },
      {
        "sentence": "You like oranges.",
        "words": ["You", "like", "oranges."]
      },
      {
        "sentence": "He likes bananas.",
        "words": ["He", "likes", "bananas."]
      },
      {
        "sentence": "She likes coffee.",
        "words": ["She", "likes", "coffee."]
      },
      {
        "sentence": "We like tea.",
        "words": ["We", "like", "tea."]
      },
      {
        "sentence": "They like milk.",
        "words": ["They", "like", "milk."]
      },
      {
        "sentence": "I eat bread.",
        "words": ["I", "eat", "bread."]
      },
      {
        "sentence": "You eat rice.",
        "words": ["You", "eat", "rice."]
      },
      {
        "sentence": "He eats soup.",
        "words": ["He", "eats", "soup."]
      },
      {
        "sentence": "She eats fruit.",
        "words": ["She", "eats", "fruit."]
      },
      {
        "sentence": "We drink water.",
        "words": ["We", "drink", "water."]
      },
      {
        "sentence": "They drink juice.",
        "words": ["They", "drink", "juice."]
      },
      {
        "sentence": "I go to school.",
        "words": ["I", "go", "to", "school."]
      },
      {
        "sentence": "You go to work.",
        "words": ["You", "go", "to", "work."]
      },
      {
        "sentence": "He goes home.",
        "words": ["He", "goes", "home."]
      },
      {
        "sentence": "She goes to bed.",
        "words": ["She", "goes", "to", "bed."]
      },
      {
        "sentence": "We play soccer.",
        "words": ["We", "play", "soccer."]
      },
      {
        "sentence": "They play games.",
        "words": ["They", "play", "games."]
      },
      {
        "sentence": "I run fast.",
        "words": ["I", "run", "fast."]
      },
      {
        "sentence": "You run well.",
        "words": ["You", "run", "well."]
      },
      {
        "sentence": "He walks slowly.",
        "words": ["He", "walks", "slowly."]
      },
      {
        "sentence": "She walks fast.",
        "words": ["She", "walks", "fast."]
      },
      {
        "sentence": "We talk together.",
        "words": ["We", "talk", "together."]
      },
      {
        "sentence": "They talk quietly.",
        "words": ["They", "talk", "quietly."]
      },
      {
        "sentence": "I read a book.",
        "words": ["I", "read", "a", "book."]
      },
      {
        "sentence": "You read a magazine.",
        "words": ["You", "read", "a", "magazine."]
      },
      {
        "sentence": "He reads a newspaper.",
        "words": ["He", "reads", "a", "newspaper."]
      },
      {
        "sentence": "She reads a letter.",
        "words": ["She", "reads", "a", "letter."]
      },
      {
        "sentence": "We write a note.",
        "words": ["We", "write", "a", "note."]
      },
      {
        "sentence": "They write emails.",
        "words": ["They", "write", "emails."]
      },
      {
        "sentence": "I watch TV.",
        "words": ["I", "watch", "TV."]
      },
      {
        "sentence": "You watch movies.",
        "words": ["You", "watch", "movies."]
      },
      {
        "sentence": "He watches cartoons.",
        "words": ["He", "watches", "cartoons."]
      }
    ],
    "A2": [
      {
        "sentence": "I wake up early every morning.",
        "words": ["I", "wake", "up", "early", "every", "morning."]
      },
      {
        "sentence": "She likes to read books at night.",
        "words": ["She", "likes", "to", "read", "books", "at", "night."]
      },
      {
        "sentence": "They go to school by bus.",
        "words": ["They", "go", "to", "school", "by", "bus."]
      },
      {
        "sentence": "He plays football with his friends.",
        "words": ["He", "plays", "football", "with", "his", "friends."]
      },
      {
        "sentence": "We have a small garden at home.",
        "words": ["We", "have", "a", "small", "garden", "at", "home."]
      },
      {
        "sentence": "My brother works in a big office.",
        "words": ["My", "brother", "works", "in", "a", "big", "office."]
      },
      {
        "sentence": "The cat sleeps on the warm sofa.",
        "words": ["The", "cat", "sleeps", "on", "the", "warm", "sofa."]
      },
      {
        "sentence": "I drink tea every afternoon.",
        "words": ["I", "drink", "tea", "every", "afternoon."]
      },
      {
        "sentence": "She sings a beautiful song.",
        "words": ["She", "sings", "a", "beautiful", "song."]
      },
      {
        "sentence": "They visit the park on weekends.",
        "words": ["They", "visit", "the", "park", "on", "weekends."]
      },
      {
        "sentence": "I cook dinner for my family.",
        "words": ["I", "cook", "dinner", "for", "my", "family."]
      },
      {
        "sentence": "He watches TV in the evening.",
        "words": ["He", "watches", "TV", "in", "the", "evening."]
      },
      {
        "sentence": "We study English at school.",
        "words": ["We", "study", "English", "at", "school."]
      },
      {
        "sentence": "She walks in the park daily.",
        "words": ["She", "walks", "in", "the", "park", "daily."]
      },
      {
        "sentence": "They enjoy playing board games.",
        "words": ["They", "enjoy", "playing", "board", "games."]
      },
      {
        "sentence": "I love to travel to new places.",
        "words": ["I", "love", "to", "travel", "to", "new", "places."]
      },
      {
        "sentence": "He buys fresh fruit from the market.",
        "words": ["He", "buys", "fresh", "fruit", "from", "the", "market."]
      },
      {
        "sentence": "The dog runs in the yard.",
        "words": ["The", "dog", "runs", "in", "the", "yard."]
      },
      {
        "sentence": "She writes a letter to her friend.",
        "words": ["She", "writes", "a", "letter", "to", "her", "friend."]
      },
      {
        "sentence": "We listen to music in the car.",
        "words": ["We", "listen", "to", "music", "in", "the", "car."]
      },
      {
        "sentence": "I learn new words every day.",
        "words": ["I", "learn", "new", "words", "every", "day."]
      },
      {
        "sentence": "He drives his car to work.",
        "words": ["He", "drives", "his", "car", "to", "work."]
      },
      {
        "sentence": "They clean the house on Saturday.",
        "words": ["They", "clean", "the", "house", "on", "Saturday."]
      },
      {
        "sentence": "She paints a picture in class.",
        "words": ["She", "paints", "a", "picture", "in", "class."]
      },
      {
        "sentence": "I take my dog for a walk.",
        "words": ["I", "take", "my", "dog", "for", "a", "walk."]
      },
      {
        "sentence": "He reads a newspaper every morning.",
        "words": ["He", "reads", "a", "newspaper", "every", "morning."]
      },
      {
        "sentence": "We eat lunch at noon.",
        "words": ["We", "eat", "lunch", "at", "noon."]
      },
      {
        "sentence": "The children play in the garden.",
        "words": ["The", "children", "play", "in", "the", "garden."]
      },
      {
        "sentence": "She drinks a glass of milk.",
        "words": ["She", "drinks", "a", "glass", "of", "milk."]
      },
      {
        "sentence": "I wear a blue shirt today.",
        "words": ["I", "wear", "a", "blue", "shirt", "today."]
      },
      {
        "sentence": "He fixes his bike on weekends.",
        "words": ["He", "fixes", "his", "bike", "on", "weekends."]
      },
      {
        "sentence": "They watch a movie at home.",
        "words": ["They", "watch", "a", "movie", "at", "home."]
      },
      {
        "sentence": "I call my friend on the phone.",
        "words": ["I", "call", "my", "friend", "on", "the", "phone."]
      },
      {
        "sentence": "She listens to the radio in the car.",
        "words": ["She", "listens", "to", "the", "radio", "in", "the", "car."]
      },
      {
        "sentence": "We visit our grandparents on Sundays.",
        "words": ["We", "visit", "our", "grandparents", "on", "Sundays."]
      },
      {
        "sentence": "He writes in his diary every night.",
        "words": ["He", "writes", "in", "his", "diary", "every", "night."]
      },
      {
        "sentence": "They have a picnic in the park.",
        "words": ["They", "have", "a", "picnic", "in", "the", "park."]
      },
      {
        "sentence": "I clean my room every week.",
        "words": ["I", "clean", "my", "room", "every", "week."]
      },
      {
        "sentence": "She rides her bike to school.",
        "words": ["She", "rides", "her", "bike", "to", "school."]
      },
      {
        "sentence": "We travel by train during holidays.",
        "words": ["We", "travel", "by", "train", "during", "holidays."]
      }
    ],
    "B1": [
      {
        "sentence": "Despite the cold weather, she went for a walk.",
        "words": ["Despite", "the", "cold", "weather,", "she", "went", "for", "a", "walk."],
        "audio": "track-1.mp3"
      },
      {
        "sentence": "He promised to finish the report by tomorrow.",
        "words": ["He", "promised", "to", "finish", "the", "report", "by", "tomorrow."],
        "audio": "track-2.mp3"
      },
      {
        "sentence": "They decided to postpone the meeting until next week.",
        "words": ["They", "decided", "to", "postpone", "the", "meeting", "until", "next", "week."],
        "audio": "track-3.mp3"
      },
      {
        "sentence": "The movie was interesting, but the ending was unexpected.",
        "words": ["The", "movie", "was", "interesting,", "but", "the", "ending", "was", "unexpected."],
        "audio": "track-4.mp3"
      },
      {
        "sentence": "She has been working at the company for five years.",
        "words": ["She", "has", "been", "working", "at", "the", "company", "for", "five", "years."],
        "audio": "track-5.mp3"
      },
      {
        "sentence": "He forgot to lock the door before leaving the house.",
        "words": ["He", "forgot", "to", "lock", "the", "door", "before", "leaving", "the", "house."],
        "audio": "track-6.mp3"
      },
      {
        "sentence": "The team celebrated their victory with a big party.",
        "words": ["The", "team", "celebrated", "their", "victory", "with", "a", "big", "party."],
        "audio": "track-7.mp3"
      },
      {
        "sentence": "Despite the traffic, they arrived on time.",
        "words": ["Despite", "the", "traffic,", "they", "arrived", "on", "time."],
        "audio": "track-8.mp3"
      },
      {
        "sentence": "She enjoys reading mystery novels in her free time.",
        "words": ["She", "enjoys", "reading", "mystery", "novels", "in", "her", "free", "time."],
        "audio": "track-9.mp3"
      },
      {
        "sentence": "He was impressed by the beautiful architecture of the city.",
        "words": ["He", "was", "impressed", "by", "the", "beautiful", "architecture", "of", "the", "city."],
        "audio": "track-10.mp3"
      },
      {
        "sentence": "The restaurant received excellent reviews from the critics.",
        "words": ["The", "restaurant", "received", "excellent", "reviews", "from", "the", "critics."],
        "audio": "track-11.mp3"
      },
      {
        "sentence": "They planned a surprise birthday party for their friend.",
        "words": ["They", "planned", "a", "surprise", "birthday", "party", "for", "their", "friend."],
        "audio": "track-12.mp3"
      },
      {
        "sentence": "Despite the rain, the event continued as scheduled.",
        "words": ["Despite", "the", "rain,", "the", "event", "continued", "as", "scheduled."],
        "audio": "track-13.mp3"
      },
      {
        "sentence": "She learned how to cook Italian dishes during the summer.",
        "words": ["She", "learned", "how", "to", "cook", "Italian", "dishes", "during", "the", "summer."],
        "audio": "track-14.mp3"
      },
      {
        "sentence": "He traveled to several countries to experience different cultures.",
        "words": ["He", "traveled", "to", "several", "countries", "to", "experience", "different", "cultures."],
        "audio": "track-15.mp3"
      },
      {
        "sentence": "The project was completed ahead of the deadline.",
        "words": ["The", "project", "was", "completed", "ahead", "of", "the", "deadline."],
        "audio": "track-16.mp3"
      },
      {
        "sentence": "They organized a charity event to help the community.",
        "words": ["They", "organized", "a", "charity", "event", "to", "help", "the", "community."],
        "audio": "track-17.mp3"
      },
      {
        "sentence": "She studied hard for the exam and passed with high marks.",
        "words": ["She", "studied", "hard", "for", "the", "exam", "and", "passed", "with", "high", "marks."],
        "audio": "track-18.mp3"
      },
      {
        "sentence": "He was determined to overcome the challenges he faced.",
        "words": ["He", "was", "determined", "to", "overcome", "the", "challenges", "he", "faced."],
        "audio": "track-19.mp3"
      },
      {
        "sentence": "The conference provided valuable insights into the industry.",
        "words": ["The", "conference", "provided", "valuable", "insights", "into", "the", "industry."],
        "audio": "track-20.mp3"
      },
      {
        "sentence": "Despite her busy schedule, she always finds time for her family.",
        "words": ["Despite", "her", "busy", "schedule,", "she", "always", "finds", "time", "for", "her", "family."],
        "audio": "track-21.mp3"
      },
      {
        "sentence": "They decided to renovate their house over the weekend.",
        "words": ["They", "decided", "to", "renovate", "their", "house", "over", "the", "weekend."],
        "audio": "track-22.mp3"
      },
      {
        "sentence": "He received a promotion after many years of hard work.",
        "words": ["He", "received", "a", "promotion", "after", "many", "years", "of", "hard", "work."],
        "audio": "track-23.mp3"
      },
      {
        "sentence": "The book offers a detailed analysis of the historical event.",
        "words": ["The", "book", "offers", "a", "detailed", "analysis", "of", "the", "historical", "event."],
        "audio": "track-24.mp3"
      },
      {
        "sentence": "She volunteered at the local shelter to help those in need.",
        "words": ["She", "volunteered", "at", "the", "local", "shelter", "to", "help", "those", "in", "need."],
        "audio": "track-25.mp3"
      },
      {
        "sentence": "Despite the difficulties, they managed to complete the task.",
        "words": ["Despite", "the", "difficulties,", "they", "managed", "to", "complete", "the", "task."],
        "audio": "track-26.mp3"
      },
      {
        "sentence": "He was excited to start his new job at the tech company.",
        "words": ["He", "was", "excited", "to", "start", "his", "new", "job", "at", "the", "tech", "company."],
        "audio": "track-27.mp3"
      },
      {
        "sentence": "The artist displayed his work in a well-known gallery.",
        "words": ["The", "artist", "displayed", "his", "work", "in", "a", "well-known", "gallery."],
        "audio": "track-28.mp3"
      },
      {
        "sentence": "They enjoyed a long walk along the riverbank at sunset.",
        "words": ["They", "enjoyed", "a", "long", "walk", "along", "the", "riverbank", "at", "sunset."],
        "audio": "track-29.mp3"
      },
      {
        "sentence": "She was curious about the origins of the ancient artifact.",
        "words": ["She", "was", "curious", "about", "the", "origins", "of", "the", "ancient", "artifact."],
        "audio": "track-30.mp3"
      },
      {
        "sentence": "He attended a workshop to improve his communication skills.",
        "words": ["He", "attended", "a", "workshop", "to", "improve", "his", "communication", "skills."],
        "audio": "track-31.mp3"
      },
      {
        "sentence": "The festival attracted visitors from all over the country.",
        "words": ["The", "festival", "attracted", "visitors", "from", "all", "over", "the", "country."],
        "audio": "track-32.mp3"
      },
      {
        "sentence": "They discussed various solutions to the environmental issues.",
        "words": ["They", "discussed", "various", "solutions", "to", "the", "environmental", "issues."],
        "audio": "track-33.mp3"
      },
      {
        "sentence": "She admired the way he handled the challenging situation.",
        "words": ["She", "admired", "the", "way", "he", "handled", "the", "challenging", "situation."],
        "audio": "track-34.mp3"
      },
      {
        "sentence": "Despite the obstacles, the team maintained a positive attitude.",
        "words": ["Despite", "the", "obstacles,", "the", "team", "maintained", "a", "positive", "attitude."],
        "audio": "track-35.mp3"
      },
      {
        "sentence": "He prepared a detailed plan before starting the project.",
        "words": ["He", "prepared", "a", "detailed", "plan", "before", "starting", "the", "project."],
        "audio": "track-36.mp3"
      },
      {
        "sentence": "The company launched a new product in the international market.",
        "words": ["The", "company", "launched", "a", "new", "product", "in", "the", "international", "market."],
        "audio": "track-37.mp3"
      },
      {
        "sentence": "They shared their experiences during the journey with enthusiasm.",
        "words": ["They", "shared", "their", "experiences", "during", "the", "journey", "with", "enthusiasm."],
        "audio": "track-38.mp3"
      },
      {
        "sentence": "She reflected on her past decisions and learned from them.",
        "words": ["She", "reflected", "on", "her", "past", "decisions", "and", "learned", "from", "them."],
        "audio": "track-39.mp3"
      },
      {
        "sentence": "He invested time in learning new skills to advance his career.",
        "words": ["He", "invested", "time", "in", "learning", "new", "skills", "to", "advance", "his", "career."],
        "audio": "track-40.mp3"
      }
    ],
  };
  
  // Inicializar el juego
  const game = new SentenceOrganizerGame(sentencesByLevel);
  game.initGame();
});
