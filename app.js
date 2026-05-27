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
const bankStatus = document.getElementById("bank-status");

document.addEventListener("DOMContentLoaded", function () {
  buildQuizMenu();
  buildQuestionBankStatus();
});

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

  alert(`You scored ${score} out of ${currentQuestions.length}.`);

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
function buildQuestionBankStatus() {
  if (!bankStatus) {
    return;
  }

  const allQuizBankRequests = getAllQuizBankRequests();
  const allRequestedBankNames = [...new Set(allQuizBankRequests.map((item) => item.bank))].sort();
  const allQuestionBankNames = [...new Set(questionBank.map((question) => question.bank))].sort();

  const questionCounts = countQuestionsByBank();
  const warnings = [];

  checkQuizBankShortages(allQuizBankRequests, questionCounts, warnings);
  checkQuestionBankNames(allRequestedBankNames, allQuestionBankNames, warnings);
  checkQuestionData(warnings);

  bankStatus.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "status-summary";

  summary.innerHTML = `
    <p><strong>Total quizzes configured:</strong> ${quizConfigs.length}</p>
    <p><strong>Unique banks requested by quizzes:</strong> ${allRequestedBankNames.length}</p>
    <p><strong>Unique banks currently represented in questions.js:</strong> ${allQuestionBankNames.length}</p>
    <p><strong>Total questions currently loaded:</strong> ${questionBank.length}</p>
    <p><strong>Status warnings:</strong> ${warnings.length}</p>
  `;

  bankStatus.appendChild(summary);

  const warningSection = document.createElement("div");
  warningSection.className = warnings.length > 0 ? "warning-box" : "success-box";

  if (warnings.length === 0) {
    warningSection.innerHTML = "<p><strong>No problems detected.</strong></p>";
  } else {
    const heading = document.createElement("p");
    heading.innerHTML = "<strong>Warnings to review:</strong>";
    warningSection.appendChild(heading);

    const list = document.createElement("ul");

    warnings.forEach((warning) => {
      const item = document.createElement("li");
      item.textContent = warning;
      list.appendChild(item);
    });

    warningSection.appendChild(list);
  }

  bankStatus.appendChild(warningSection);

  const countsHeading = document.createElement("h3");
  countsHeading.textContent = "Question Counts by Bank";
  bankStatus.appendChild(countsHeading);

  const countsList = document.createElement("div");
  countsList.className = "bank-count-list";

  allRequestedBankNames.forEach((bankName) => {
    const count = questionCounts[bankName] || 0;
    const row = document.createElement("p");
    row.textContent = `${bankName}: ${count} question(s) loaded`;
    countsList.appendChild(row);
  });

  bankStatus.appendChild(countsList);
}

function getAllQuizBankRequests() {
  const requests = [];

  quizConfigs.forEach((quiz) => {
    quiz.questionGroups.forEach((group) => {
      requests.push({
        quizTitle: quiz.title,
        bank: group.bank,
        count: group.count
      });
    });
  });

  return requests;
}

function countQuestionsByBank() {
  const counts = {};

  questionBank.forEach((question) => {
    if (!question.bank) {
      return;
    }

    if (!counts[question.bank]) {
      counts[question.bank] = 0;
    }

    counts[question.bank]++;
  });

  return counts;
}

function checkQuizBankShortages(allQuizBankRequests, questionCounts, warnings) {
  allQuizBankRequests.forEach((request) => {
    const available = questionCounts[request.bank] || 0;

    if (available < request.count) {
      warnings.push(
        `${request.quizTitle}: bank "${request.bank}" requests ${request.count}, but only ${available} question(s) are loaded.`
      );
    }
  });
}

function checkQuestionBankNames(allRequestedBankNames, allQuestionBankNames, warnings) {
  allQuestionBankNames.forEach((bankName) => {
    if (!allRequestedBankNames.includes(bankName)) {
      warnings.push(
        `questions.js contains bank "${bankName}", but no quiz currently requests that bank. This may be intentional or may be a spelling mismatch.`
      );
    }
  });
}

function checkQuestionData(warnings) {
  questionBank.forEach((question, index) => {
    const questionNumber = index + 1;

    if (!question.bank) {
      warnings.push(`Question ${questionNumber} is missing a bank name.`);
    }

    if (!question.question) {
      warnings.push(`Question ${questionNumber} is missing question text.`);
    }

    if (!Array.isArray(question.choices) || question.choices.length < 2) {
      warnings.push(`Question ${questionNumber} must have at least two choices.`);
    }

    if (!question.answer) {
      warnings.push(`Question ${questionNumber} is missing a correct answer.`);
    }

    if (Array.isArray(question.choices) && question.answer && !question.choices.includes(question.answer)) {
      warnings.push(
        `Question ${questionNumber} has answer "${question.answer}", but that answer is not listed as one of the choices.`
      );
    }

    if (!question.explanation) {
      warnings.push(`Question ${questionNumber} is missing an explanation.`);
    }
  });
}
