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
var startTime = 60;


// Timer function 
function startTimer() { 
    startButton.style.visibility = 'hidden';

    var secondsLeft = setInterval(function() {
        timer.textContent = startTime + " seconds left!"
        startTime--;

        if(startTime <= 0 || questionsAndAnswers.length < currentQuestion) {
            timer.textContent = "Game Over!"
            clearInterval(setInterval);
            results();
        }
    }, 1000);
}

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



function highScores () {

}

function submitButton () {

}



var answerButtons = document.querySelectorAll(".answerButton")
for (i = 0; i < answerButtons.length; i++) {
    button = answerButtons[i];
    button.addEventListener("click", function(event) {
        if (event.target !== questionsAndAnswers[currentQuestion].correctAnswer) {
            startTime -= 15;
            console.log('wrong answer', score);
            rightWrong.textContent = "Wrong!";
        } else {
            rightWrong.textContent = "Correct!"
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

}



function results() {

    
    questions.textContent = "Scores!";
    scoreDisplay.textContent = "score: " + score;
    initialInput.style.visibility = 'visible';
    submitButton.style.visibility = 'visible';

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
    return results();
})

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    results();
    // console.log(initialInput.value)
    if (initialInput.value) {
        var scoreHistory = JSON.parse(window.localStorage.getItem('stats')) || []

        var stats = {
            initials: initialInput.value,
            score
        }

        scoreHistory.push(stats);

        window.localStorage.setItem('stats', JSON.stringify(scoreHistory))
        initialInput.value = '';

       
        

    } else {
        return;
    }
    
    }
)










// TODO:
// push score and initials to empty array
// put in local storage
// stop timer when all questions are answered and go to results()





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

    // retrieve data, turn into array, push your value in, store so its in correct order, then put it in local storage
        // create array of objects
        // .sort method 

        // submitScore.addEventListener("submit", function(event)) {
        //     event.preventDefault();
        // }

