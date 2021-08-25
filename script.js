var timerEl = document.querySelector('#timer');
var questionEl = document.querySelector('#question');
var containerEl = document.querySelector('#container');
var overEl = document.querySelector("#over");
var timeLeft = 60;
var cursor;
var interval;

var questions = [
  {
    text: 'What is an Array?',
    possible: [
      '{}',
      '[]',
      '()',
      '||'
    ],
    correct: 1
  },
  {
    text: 'Which is a not a loop?',
    possible: [
      'while ()',
      'for ()',
      'foreach ()',
      'if ()'
    ],
    correct: 3
  }
];

var renderGameOver = function() {
  containerEl.style.display = "none";
  questionEl.style.display = "none";
  clearInterval(interval);
  overEl.removeAttribute('style');
  if (timeLeft) {
    overEl.textContent = "High Score!";
  } else {
    overEl.textContent = "You Lost, Play Again?";
    overEl.classList.add('element');
  }
  console.log(timeLeft);
}

var renderQuestion = function() {
  containerEl.innerHTML = "";
  if (cursor >= questions.length) {
    console.log('END', cursor, questions.length);
    return renderGameOver();
  }
  var currentQuestion = questions[cursor];
  var possible = currentQuestion.possible;
  
  questionEl.textContent = currentQuestion.text;

  for (var index in possible) {
    var element = document.createElement('div');
    element.classList.add('element');
    element.textContent = possible[index];
    element.dataset.index = index;
    containerEl.appendChild(element);
  }
}

var init = function () {
  cursor = 0;
  timerEl.textContent = timeLeft;

  interval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      renderGameOver();
    }
  }, 1000);

  renderQuestion();
};

init();

containerEl.addEventListener('click', function(event) {
  var correctAnswer = questions[cursor].correct;
  if (event.target.matches('.element')) {
    var index = parseInt(event.target.dataset.index);
    if (correctAnswer === index) {
      event.target.classList.add('correct');
      var notCorrect = event.target.parentNode.querySelectorAll('.element:not(.correct)');
      for (var element of notCorrect) {
        element.remove();
      }
      setTimeout(function() {
        cursor++;
        renderQuestion();
      }, 1250);
    } else {
      timeLeft -= 5;
      event.target.classList.add('wrong');
      setTimeout(function() {
        event.target.classList.remove('wrong');
      }, 1000);
    }
  }
})

overEl.addEventListener('click', function(event) {
  setTimeout(function() {
    event.target.classList.remove('element');
    event.target.style.display = 'none';
    init();
  }, 1000);
})