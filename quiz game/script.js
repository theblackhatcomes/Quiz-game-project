const quizData = [
    {
      question: `Quel sera la sortie du programme suivant ?<br><pre>#include &lt;stdio.h&gt;<br>int main() {<br>int x = 10;<br>printf("%d", x++);<br>return 0;<br>}</pre>`,
      choices: {
        a: "10",
        b: "11",
        c: "Erreur de compilation",
        d: "0"
      },
      correct: "a",
      explanation: "La post-incrémentation affiche d'abord la valeur, puis l'incrémente."
    },
    {
      question: "Quel type de retour la fonction main() devrait-elle avoir dans un programme C standard ?",
      choices: {
        a: "void",
        b: "float",
        c: "int",
        d: "double"
      },
      correct: "c",
      explanation: "Dans un programme C standard, la fonction main() renvoie un entier, souvent 0, indiquant la réussite du programme."
    },
    {
      question: "Quelle est la bonne syntaxe pour allouer dynamiquement un tableau de 10 entiers en C ?",
      choices: {
        a: "int *arr = malloc(10);",
        b: "int arr[10];",
        c: "int *arr = (int*) malloc(10 * sizeof(int));",
        d: "int arr = malloc(sizeof(int) * 10);"
      },
      correct: "c",
      explanation: "Cette syntaxe est correcte car elle alloue dynamiquement la mémoire pour 10 entiers."
    },
    {
      question: "Que fait l'instruction #include<stdio.h> dans un programme C ?",
      choices: {
        a: "Définit une fonction standard",
        b: "Déclare des variables",
        c: "Inclut un fichier d'en-tête qui contient les définitions des fonctions d'entrée/sortie",
        d: "Crée un tableau"
      },
      correct: "c",
      explanation: "Le fichier stdio.h contient les déclarations des fonctions standard d'entrée/sortie comme printf et scanf."
    },
    {
      question: `Quelle est la sortie du code suivant ?<br><pre>#include &lt;stdio.h&gt;<br>int main() {<br>int x = 5, y = 10;<br>printf("%d", x > y ? x : y);<br>return 0;<br>}</pre>`,
      choices: {
        a: "5",
        b: "10",
        c: "0",
        d: "Erreur de compilation"
      },
      correct: "b",
      explanation: "L'opérateur ternaire compare x et y. Comme y est plus grand, il est affiché."
    },
    {
      question: "En C, quelle est la valeur par défaut des variables non initialisées ?",
      choices: {
        a: "0",
        b: "Garbage value",
        c: "NULL",
        d: "1"
      },
      correct: "b",
      explanation: "Les variables non initialisées en C ont des valeurs indéfinies (garbage)."
    },
    {
      question: "Quelle est la taille de la variable int en C sur un système 32 bits ?",
      choices: {
        a: "2 octets",
        b: "4 octets",
        c: "8 octets",
        d: "Variable"
      },
      correct: "b",
      explanation: "Sur un système 32 bits, la taille d'un int est généralement de 4 octets."
    },
    {
      question: "Quel mot-clé est utilisé pour empêcher la modification d'une variable en C ?",
      choices: {
        a: "const",
        b: "static",
        c: "volatile",
        d: "restrict"
      },
      correct: "a",
      explanation: "Le mot-clé 'const' empêche la modification de la variable."
    },
    {
      question: "Quelle bibliothèque standard en C est utilisée pour manipuler les chaînes de caractères ?",
      choices: {
        a: "stdio.h",
        b: "stdlib.h",
        c: "string.h",
        d: "ctype.h"
      },
      correct: "c",
      explanation: "La bibliothèque 'string.h' contient des fonctions pour manipuler les chaînes."
    },
    {
      question: "En C, que retourne la fonction malloc() si l'allocation de mémoire échoue ?",
      choices: {
        a: "0",
        b: "NULL",
        c: "1",
        d: "Adresse mémoire invalide"
      },
      correct: "b",
      explanation: "La fonction malloc() retourne NULL si l'allocation échoue."
    },
     
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const quizContainer = document.getElementById("quiz");
  const nextButton = document.getElementById("next-btn");
  const progressBar = document.getElementById("progress");
  
  loadQuiz();
  
  function loadQuiz() {
    resetState();
    const currentQuizData = quizData[currentQuestion];
  
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = currentQuizData.question;
  
    const answersEl = document.createElement('ul');
    answersEl.className = 'answers';
  
    for (const [key, answer] of Object.entries(currentQuizData.choices)) {
      const answerEl = document.createElement('li');
      answerEl.textContent = answer;
      answerEl.onclick = () => selectAnswer(key);
      answersEl.appendChild(answerEl);
    }
  
    quizContainer.appendChild(questionEl);
    quizContainer.appendChild(answersEl);
  }
  
  function selectAnswer(selected) {
    const currentQuizData = quizData[currentQuestion];
    const answersEl = document.querySelectorAll(".answers li");
  
    let answered = false;
    answersEl.forEach(answer => {
      answer.onclick = null;  
      if (answer.textContent === currentQuizData.choices[selected]) {
        answered = true;
        answer.style.backgroundColor = selected === currentQuizData.correct ? "#4CAF50" : "#f44336";
      }
    });
  
    if (answered) {
      score += (selected === currentQuizData.correct) ? 2 : -1;
    } else {
      score += 0;  
    }
  
    nextButton.classList.remove("hidden");
  }
  
  function resetState() {
    quizContainer.innerHTML = '';
    nextButton.classList.add("hidden");
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
      updateProgressBar();
      loadQuiz();
    } else {
      showResults();
    }
  });
  
  function updateProgressBar() {
    const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  function showResults() {
    quizContainer.innerHTML = `<h2>Vous avez obtenu un score de ${score} points sur un total de ${quizData.length * 2} points!</h2>`;
    nextButton.textContent = "Recommencer le Quiz";
    nextButton.addEventListener('click', () => location.reload());
  }
  