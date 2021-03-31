// 'use strict';
// grab elements from html
var startButton = document.querySelector('.start');
var quiz = document.querySelector('.quiz-body');
var timer = document.querySelector('.timer');
var questions = document.querySelector('#question');
var answer1 = document.querySelector('#first');
var answer2 = document.querySelector('#second');
var answer3 = document.querySelector('#third');
var answer4 = document.querySelector('#fourth');
var answerResult = document.querySelector('.answer-result');
var finishedPage = document.querySelector('.epilogue');
var scoreDisplay = document.querySelector('.score');
var initialInput = document.querySelector('#input');
var rightWrong = document.querySelector('.answer-result');
var highScores = document.querySelector('#highscores');
var checkStats = document.querySelector('#stats');
var submitButton = document.querySelector('#submit');
var quizBody = document.querySelector('.quiz-body');
var scoreTracker = document.querySelector('#finished-message');

// array of objects for questions, answers, correct answer
var questionsAndAnswers = [
    {
        question: 'What is a par?',
        answers: {
            answer1: 'When you get the ball in the hole within the predetermined number of strokes',
            answer2: 'When you get the ball in the hole one stroke over the predetermined number of strokes',
            answer3: 'When you get the ball in the hole one stroke below the predetermined number of strokes',
            answer4: 'When you forfeit the hole and move on to the next'
        },
        
        correctAnswer: answer1
    },
    { 
        question: 'When the ball goes into the bunker, you receive one penalty stroke:',
        answers: {
            answer1: 'True',
            answer2: 'False',
            answer3: 'Sometimes- depends on how it got there',
            answer4: 'What bunker?'
        },
        correctAnswer: answer2
    },
    {
        question: 'When can you use a tee?',
        answers: {
            answer1: 'At every stroke you take',
            answer2: "I don't need a tee",
            answer3: 'At the tee box for your first stroke',
            answer4: 'For putting'
        },
        
        correctAnswer: answer3
    },
    {
        question: 'You lose your ball and have to drop a new ball to continue play. How many penalty strokes do you add?',
        answers: {
            answer1:0,
            answer2:1,
            answer3:2,
            answer4:3
        },
        
        correctAnswer: answer3
    }
];

var lastQuestion = questionsAndAnswers.length - 1;
var currentQuestion = 0; 

var score = 0;
var highScore = 0;
var startTime = 30;

// countdown timer function 
function startTimer() { 
    startButton.style.visibility = 'hidden';

    var secondsLeft = setInterval(function() {
        timer.textContent = startTime + " seconds left!"
        startTime--;

        if(startTime <= 0 || questionsAndAnswers.length <= currentQuestion) {
            timer.textContent = "Game Over!"
            startButton.style.visibility = 'visible';
            startGame();
            clearInterval(setInterval);
            // results();
        }
    }, 1000);
    startGame();
}


function renderQuestions() {
    // Display for each question rendered
    var quizQuestion = questionsAndAnswers[currentQuestion];

    questions.innerHTML = quizQuestion.question;
    answer1.innerHTML = quizQuestion.answers.answer1;
    answer2.innerHTML = quizQuestion.answers.answer2;
    answer3.innerHTML = quizQuestion.answers.answer3;
    answer4.innerHTML = quizQuestion.answers.answer4;
}

renderQuestions();

function startGame () {
    // loop through questions/asnwers array on click of answer option 
var answerButtons = document.querySelectorAll(".answerButton")
for (i = 0; i < answerButtons.length; i++) {
    button = answerButtons[i];
    button.addEventListener("click", function(event) {
        if (event.target !== questionsAndAnswers[currentQuestion].correctAnswer) {
            // deduct 15sec from timer if answer = wrong
            startTime -= 15;
            console.log('wrong answer', score);
            rightWrong.textContent = "Wrong!";
        } else {
            rightWrong.textContent = "Correct!"
            // add score to keep count if right
            score++
            console.log('right answer', score);
        }
        // Go to next set of questions
        currentQuestion += 1;        
        // go through questions array, end game and go to results/stats when done
        if (currentQuestion < questionsAndAnswers.length) {
            renderQuestions();
        } else {
            results();
        }
    })
}}

// Display for results
function results() {  
    questions.textContent = "Scores!";
    scoreDisplay.textContent = "score: " + score;
    initialInput.style.visibility = 'visible';
    submitButton.style.visibility = 'visible';
    startButton.style.visibility = 'visible';

    scoreDisplay.setAttribute('style', 'font-size: 28px');

    answer1.style.visibility = 'hidden';
    answer2.style.visibility = 'hidden';
    answer3.style.visibility = 'hidden';
    answer4.style.visibility = 'hidden';   
    answerResult.style.visibility = 'hidden';
}

document.getElementById("startButton").addEventListener("click", startTimer);

checkStats.addEventListener('click', function(event) {
    checkStats.style.cursor = 'pointer';
    // return results();
})


// local storage 
function saveLastScore () {
    var stats = [
        {
        initials: initialInput.value,
        score: score
    }];
    console.log(initialInput.value, score);

    localStorage.setItem('stats', JSON.stringify(stats));
}

function renderLastScore () {
    var scoreHistory = JSON.parse(localStorage.getItem('stats'));
    scoreHistory.push(stats);
    if (scoreHistory !== null) {
        answer1.textContent = stats.initials;
        answer2.textContent = stats.score;
    } else {
        return;
    }
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveLastScore();
    renderLastScore();
    startGame();
});
