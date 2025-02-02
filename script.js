// Your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
const questionsElement = document.getElementById("questions");

function renderQuestions() {
  questionsElement.innerHTML = '';
  const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save progress to session storage
function saveProgress() {
  const userAnswers = {};
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selectedOption) {
      userAnswers[i] = selectedOption.value;
    }
  }
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Calculate and display score
function calculateScore() {
  const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
}

document.getElementById("submit").addEventListener("click", () => {
  saveProgress();
  calculateScore();
});

// Initial render
renderQuestions();
