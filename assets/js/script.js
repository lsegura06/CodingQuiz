
//questions for the quiz

const questions = [
    {
        Question: "1. What anime has the most episodes?",
        options: ["Naruto", "One Piece", "Hunter x Hunter", "Dragon Ball Z"],
        answer: "One Piece"
    },

    {
        Question: "2. Who is the main character in Naruto? ",
        options: ["Sasuke", "Minato", "Naruto", "Kakashi"],
        answer: "Naruto"
    },

    {
        Question: "3. How many Dragon balls are there in DBZ? ",
        options: ["Seven", "Eight", "Four", "Six"],
        answer: "Seven"
    },

    {
        Question: "4. What pokemon does Ash have with him at all times in Pokemon?",
        options: ["Gengar", "Charizard", "Pikachu", "Dragonite"],
        answer: "Pikachu" 
    },

    {
        Question: "5. Whos family are assassins in Hunter x Hunter?",
        options: ["Gon", "Hisoka", "Leorio", "Killua"],
        answer: "Killua"
    }];



// selecting all the elements

const questionsEl = document.querySelector("#questions");
const timer = document.querySelector("#time");
const optionsEl = document.querySelector("#options");
const submit = document.querySelector("#submit-score");
const start = document.querySelector("#start");
const nameEl = document.querySelector("#name");
const feedback = document.querySelector("#feedback");
const restart= document.querySelector("#restart");



var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

//function to start time and quiz

function StartQuiz() {
    timerId = setInterval(clockTick, 1000);
    timer.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

//getting the questions and the options for the quiz

function getQuestion() {
var currentQuestion = questions[currentQuestionIndex];
var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.Question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        optionsEl.appendChild(choiceBtn);
    });
}

//function for when question is clicked you get feedback

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
        time = 0;
        }
        timer.textContent = time;
        feedback.textContent = "Incorrect"
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Correct";
        feedback.style.color = "green";
    }
    feedback.setAttribute("class", "feedback");
    setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// end of the quiz, still having trouble 

function quizEnd() {
    clearInterval(timerId);
    var endScreen = document.getElementById("quiz-end");
    endScreen.removeAttribute("class");
    var finalScore = document.getElementById("score-final");
    finalScore.textContent = time;
    questions.setAttribute("class", "hide");
    var timer = document.querySelector('.timer')
    timer.style.display='none';
}

// if timer runs out its the end of the quiz

function clockTick() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// function to parse the score you get, still having trouble

function Highscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
        score: time,
        name: name
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

}
}


function checkForEnter(event) {
    if (event.key === "Enter") {
        Highscore();
    }
}

//
nameEl.onkeyup = checkForEnter;

// sumbits users score

submit.onclick = Highscore;

// button to start quiz

start.onclick = StartQuiz;

