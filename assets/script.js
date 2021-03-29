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
var finishedPage = document.querySelector('.epilogue');
var scoreDisplay = document.querySelector('.score');
var initialInput = document.querySelector('#input');
var rightWrong = document.querySelector('.answer-result');


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

var score = [];
var initials = "";
var startTime = 120;
var keepPlaying = true;
var clickStart = true;


// Timer function 
function startTimer() { 
    var secondsLeft = setInterval(function() {
        if(startTime > 1) {
             // displays timer
            timer.textContent = startTime + " seconds left!"
            startTime--;
        } else {
            // message when timer runs out 
            timer.textContent = "Game Over!"
            clearInterval(setInterval);
        }
    }, 1000);
    
}

// function to start quiz
function renderQuestions() {
    // for each question rendered
    var quizQuestion = questionsAndAnswers[currentQuestion];

    questions.innerHTML = quizQuestion.question;
    answer1.innerHTML = quizQuestion.answers.answer1;
    answer2.innerHTML = quizQuestion.answers.answer2;
    answer3.innerHTML = quizQuestion.answers.answer3;
    answer4.innerHTML = quizQuestion.answers.answer4;


}

renderQuestions();

function results() {
    questions.textContent = "You made it! Let's see how you did!";
    scoreDisplay.textContent = "score: " + score;
    initialInput.style.visibility = 'visible';

    answer1.style.visibility = 'hidden';
    answer2.style.visibility = 'hidden';
    answer3.style.visibility = 'hidden';
    answer4.style.visiblity = 'hidden';

}


document.getElementById("startButton").addEventListener("click", startTimer);

var answerButtons = document.querySelectorAll(".answerButton")
for (i = 0; i < answerButtons.length; i++) {
    button = answerButtons[i];
    button.addEventListener("click", function(event) {
        if (event.target !== questionsAndAnswers[currentQuestion].correctAnswer) {
            startTime -= 15;
            console.log('wrong answer');
        };

        // Go to next set of questions
        currentQuestion += 1;
        

        if (currentQuestion < questionsAndAnswers.length) {

            renderQuestions();
        } else {
            results();
        }
    })
}


// start timer when start button is pressed
    // -15 seconds when answer is wrong
    // game is over if you run out of time
    // if out of time before answering all questions, go to stats page

// display questions and answers
    // randomize answer choices
    // track if answer was right or wrong
    // go to next question when answered
    // push results into empty array

// repeat for all 4 questions 

// go to stats page
// create variable for stats and initials to go to local storage
    // show final score
    // form to submit initials
    // local storage for score and initials to track high scores
