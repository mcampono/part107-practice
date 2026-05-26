let currentQuestions = [];
let currentQuizConfig = null;
let currentWarnings = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const quizMenu = document.getElementById("quiz-menu");
const quizTitle = document.getElementById("quiz-title");
const quizDescription = document.getElementById("quiz-description");
const quizWarnings = document.getElementById("quiz-warnings");

const backButton = document.getElementById("back-button");
const resultsBackButton = document.getElementById("results-back-button");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");

const quizForm = document.getElementById("quiz-form");
const scoreSummary = document.getElementById("score-summary");
const feedback = document.getElementById("feedback");

document.addEventListener("DOMContentLoaded", buildQuizMenu);

backButton.addEventListener("click", showStartScreen);
resultsBackButton.addEventListener("click", showStartScreen);
submitButton.addEventListener("click", submitQuiz);
restartButton.addEventListener("click", function () {
  if (currentQuizConfig) {
    startQuiz(currentQuizConfig.id);
  }
});

function buildQuizMenu() {
  quizMenu.innerHTML = "";

  quizConfigs.forEach((quizConfig) => {
    const button = document.createElement("button");
    button.className = "quiz-menu-button";
    button.type = "button";
    button.textContent = `${quizConfig.title} (${quizConfig.totalQuestions} questions)`;

    button.addEventListener("click", function () {
      startQuiz(quizConfig.id);
    });

    quizMenu.appendChild(button);
  });
}

function startQuiz(quizId) {
  currentQuizConfig = quizConfigs.find((quiz) => quiz.id === quizId);

  if (!currentQuizConfig) {
    alert("Quiz not found.");
    return;
  }

  const quizBuildResult = buildQuizQuestions(currentQuizConfig);
  currentQuestions = quizBuildResult.questions;
  currentWarnings = quizBuildResult.warnings;

  startScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  quizTitle.textContent = currentQuizConfig.title;
  quizDescription.textContent = `This quiz is configured to pull ${currentQuizConfig.totalQuestions} questions.`;

  quizForm.innerHTML = "";
  feedback.innerHTML = "";
  scoreSummary.textContent = "";

  showWarnings();

  if (currentQuestions.length === 0) {
    quizForm.innerHTML = "<p>No questions are currently available for this quiz.</p>";
    submitButton.classList.add("hidden");
    return;
  }

  submitButton.classList.remove("hidden");

  currentQuestions.forEach((questionItem, questionIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionHeading = document.createElement("h3");
    questionHeading.textContent = `Question ${questionIndex + 1}`;
    questionDiv.appendChild(questionHeading);

    const bankLabel = document.createElement("p");
    bankLabel.className = "bank-label";
    bankLabel.textContent = `Question bank: ${questionItem.bank}`;
    questionDiv.appendChild(bankLabel);

    const questionText = document.createElement("p");
    questionText.textContent = questionItem.question;
    questionDiv.appendChild(questionText);

    const choicesDiv = document.createElement("div");
    choicesDiv.className = "choices";

    const shuffledChoices = shuffleArray([...questionItem.choices]);

    shuffledChoices.forEach((choice) => {
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

function buildQuizQuestions(quizConfig) {
  let selectedQuestions = [];
  let warnings = [];

  quizConfig.questionGroups.forEach((group) => {
    const availableQuestions = questionBank.filter((question) => question.bank === group.bank);
    const shuffledQuestions = shuffleArray([...availableQuestions]);
    const questionsToUse = shuffledQuestions.slice(0, group.count);

    if (availableQuestions.length < group.count) {
      warnings.push(
        `${group.bank}: requested ${group.count}, but only ${availableQuestions.length} available.`
      );
    }

    selectedQuestions = selectedQuestions.concat(questionsToUse);
  });

  return {
    questions: shuffleArray(selectedQuestions),
    warnings: warnings
  };
}

function showWarnings() {
  quizWarnings.innerHTML = "";

  if (currentWarnings.length === 0) {
    return;
  }

  const warningBox = document.createElement("div");
  warningBox.className = "warning-box";

  const heading = document.createElement("p");
  heading.innerHTML = "<strong>Question bank warning:</strong>";
  warningBox.appendChild(heading);

  const list = document.createElement("ul");

  currentWarnings.forEach((warning) => {
    const item = document.createElement("li");
    item.textContent = warning;
    list.appendChild(item);
  });

  warningBox.appendChild(list);
  quizWarnings.appendChild(warningBox);
}

function submitQuiz() {
  const unansweredQuestions = [];

  currentQuestions.forEach((questionItem, questionIndex) => {
    const selectedAnswer = document.querySelector(
      `input[name="question-${questionIndex}"]:checked`
    );

    if (!selectedAnswer) {
      unansweredQuestions.push(questionIndex + 1);
    }
  });

  if (unansweredQuestions.length > 0) {
    alert(
      `Please answer every question before submitting.\n\nUnanswered question(s): ${unansweredQuestions.join(", ")}`
    );
    return;
  }

  let score = 0;
  feedback.innerHTML = "";

  currentQuestions.forEach((questionItem, questionIndex) => {
    const selectedAnswer = document.querySelector(
      `input[name="question-${questionIndex}"]:checked`
    );

    const studentAnswer = selectedAnswer.value;
    const isCorrect = studentAnswer === questionItem.answer;

    if (isCorrect) {
      score++;
    }

    const feedbackItem = document.createElement("div");
    feedbackItem.className = "feedback-item";

    const resultLine = document.createElement("p");
    resultLine.className = isCorrect ? "correct" : "incorrect";
    resultLine.textContent = isCorrect ? "Correct" : "Incorrect";

    const bankLine = document.createElement("p");
    bankLine.innerHTML = `<strong>Question bank:</strong> ${questionItem.bank}`;

    const questionLine = document.createElement("p");
    questionLine.innerHTML = `<strong>Question:</strong> ${questionItem.question}`;

    const yourAnswerLine = document.createElement("p");
    yourAnswerLine.innerHTML = `<strong>Your answer:</strong> ${studentAnswer}`;

    const correctAnswerLine = document.createElement("p");
    correctAnswerLine.innerHTML = `<strong>Correct answer:</strong> ${questionItem.answer}`;

    const explanationLine = document.createElement("p");
    explanationLine.innerHTML = `<strong>Explanation:</strong> ${questionItem.explanation}`;

    feedbackItem.appendChild(resultLine);
    feedbackItem.appendChild(bankLine);
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

function showStartScreen() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
