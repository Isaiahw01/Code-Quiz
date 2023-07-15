var totalSeconds = 120;
var timer;
var currentQuestion = 0;
var score = 0;
var quizContainer;
var scoreContainer;

var questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    options: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts'
  },
  {
    question: 'The condition in an if / else statement is enclosed within ____.',
    options: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    question: 'Arrays in JavaScript can be used to store ____.',
    options: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    question:
      'String values must be enclosed within ____ when being assigned to variables.',
    options: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
  question:
  'A very useful tool used during development and debugging for printing content to the debugger is:',
options: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
answer: 'console.log',
  }
];

function startTimer() {
  timer = setInterval(decrementTime, 1000);
}

function decrementTime() {
  totalSeconds--;
  if (totalSeconds < 0) {
    clearInterval(timer);
    endQuiz();
  } else {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    document.getElementById("timer").innerHTML = "Time: " + minutes + "m " + seconds + "s";
  }
}

function startQuiz() {
  document.getElementById("start-button").disabled = true;
  document.getElementById("score-container").style.display = "block";
  quizContainer = document.getElementById("quiz-container");
  scoreContainer = document.getElementById("score");

  startTimer();
  displayQuestion();
}

function displayQuestion() {
  quizContainer.style.display = "block";
  scoreContainer.innerHTML = "Score: " + score;

  var questionObj = questions[currentQuestion];
  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("options");

  questionElement.textContent = questionObj.question;
  optionsElement.innerHTML = "";

  questionObj.options.forEach(function(option) {
    var radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "answer";
    radioBtn.value = option;

    var label = document.createElement("label");
    label.textContent = option;

    optionsElement.appendChild(radioBtn);
    optionsElement.appendChild(label);
    optionsElement.appendChild(document.createElement("br"));
  });
}

function moveToNextQuestion() {
  var selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    var selectedValue = selectedOption.value;

    if (selectedValue === questions[currentQuestion].answer) {
      score++;
    } else {
      totalSeconds -= 30; 
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an option.");
  }
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";

  var playerName = prompt("Quiz finished!\nEnter your name to save your score:");
}

document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("next-button").addEventListener("click", moveToNextQuestion);
