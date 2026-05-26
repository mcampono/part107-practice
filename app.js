let currentQuestions = [];

const numberOfQuestions = 3;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");

const quizForm = document.getElementById("quiz-form");
const scoreSummary = document.getElementById("score-summary");
const feedback = document.getElementById("feedback");

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitQuiz);
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestions = getRandomQuestions(questionBank, numberOfQuestions);

  startScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  quizForm.innerHTML = "";
  feedback.innerHTML = "";
  scoreSummary.textContent = "";

  currentQuestions.forEach((questionItem, questionIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionHeading = document.createElement("h3");
    questionHeading.textContent = `Question ${questionIndex + 1}`;
    questionDiv.appendChild(questionHeading);

    const questionText = document.createElement("p");
    questionText.textContent = questionItem.question;
    questionDiv.appendChild(questionText);

    const choicesDiv = document.createElement("div");
    choicesDiv.className = "choices";

    const shuffledChoices = shuffleArray([...questionItem.choices]);

    shuffledChoices.forEach((choice, choiceIndex) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${questionIndex}`;
      radio.value = choice;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${choice}`));
      choicesDiv.appendChild(label);
    });

    questionDiv.appendChild(choicesDiv);
    quizForm.appendChild(questionDiv);
  });
}

function submitQuiz() {
  let score = 0;
  feedback.innerHTML = "";

  currentQuestions.forEach((questionItem, questionIndex) => {
    const selectedAnswer = document.querySelector(
      `input[name="question-${questionIndex}"]:checked`
    );

    const studentAnswer = selectedAnswer ? selectedAnswer.value : "No answer selected";
    const isCorrect = studentAnswer === questionItem.answer;

    if (isCorrect) {
      score++;
    }

    const feedbackItem = document.createElement("div");
    feedbackItem.className = "feedback-item";

    const resultLine = document.createElement("p");
    resultLine.className = isCorrect ? "correct" : "incorrect";
    resultLine.textContent = isCorrect ? "Correct" : "Incorrect";

    const questionLine = document.createElement("p");
    questionLine.innerHTML = `<strong>Question:</strong> ${questionItem.question}`;

    const yourAnswerLine = document.createElement("p");
    yourAnswerLine.innerHTML = `<strong>Your answer:</strong> ${studentAnswer}`;

    const correctAnswerLine = document.createElement("p");
    correctAnswerLine.innerHTML = `<strong>Correct answer:</strong> ${questionItem.answer}`;

    const explanationLine = document.createElement("p");
    explanationLine.innerHTML = `<strong>Explanation:</strong> ${questionItem.explanation}`;

    feedbackItem.appendChild(resultLine);
    feedbackItem.appendChild(questionLine);
    feedbackItem.appendChild(yourAnswerLine);
    feedbackItem.appendChild(correctAnswerLine);
    feedbackItem.appendChild(explanationLine);

    feedback.appendChild(feedbackItem);
  });

  scoreSummary.textContent = `You scored ${score} out of ${currentQuestions.length}.`;

  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
}

function getRandomQuestions(allQuestions, amount) {
  const shuffled = shuffleArray([...allQuestions]);
  return shuffled.slice(0, amount);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
