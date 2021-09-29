const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let countDownTimerGlobal;

let shuffleQuestions, currentQuestionIndex, score = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    answerButtonsElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    setTimer()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if (shuffledQuestions.length == currentQuestionIndex + 1) {
        setUserInitials();
    }
    if (correct) {
        incrementScore();
    } else {
        decrementScore();
        alertTimer ();
    }
}

function setUserInitials() {
    let userInitials;
    document.querySelector(".initial-container").classList.remove("hide");
    document.querySelector("#initialButton").addEventListener("click", function() {
        userInitials = document.querySelector("#userInitials").value
        document.querySelector("#enteredInitials").innerText = "Your Score: " + userInitials + " " + score + "/9"
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function incrementScore() {
    score++;
    console.log(score);
    document.querySelector('.score').innerHTML = score
}
function decrementScore() {
    if (score > 0) {score--;}
    console.log(score);
    document.querySelector('.score').innerHTML = score
    countDownTimerGlobal -= 20000;
}

function setTimer() {

var countDowntimer = new Date().getTime() + 300000;
countDownTimerGlobal = countDowntimer
var timefunc = setInterval(function() {
    var now = new Date().getTime();
var timeleft = countDownTimerGlobal - now;

var minutes = Math.floor((timeleft % (1000 * 60 *60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

document.getElementById("mins").innerHTML = minutes + ": "
document.getElementById("secs").innerHTML = seconds + ""

if (timeleft < 0) {
    clearInterval(timefunc);
    document.getElementById("mins").innerHTML = ""
    document.getElementById("secs").innerHTML = ""
    document.getElementById("end").innerHTML = "Time is up!";
}

}, 1000)

}

function alertTimer () {
    document.querySelector('#secs').classList.add('red')
    setInterval(function() {
        document.querySelector('#secs').classList.remove('red')
    }, 3000)
}


const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Hyperlink Link Marking Language', correct: false },
            { text: 'Hyper Mark Text Link', correct: false },
            { text: 'Hurry The Meat Loaf', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Corresponding Style Sheet', correct: false },
            { text: 'Cascading Style Sheet', correct: true },
            { text: 'Can Stand Solo', correct: false },
            { text: 'Crypto Styling Source', correct: false }
        ]
    },
    {
        question: 'Which element is in the <head> in HTML?',
        answers: [
            { text: '<body>', correct: false },
            { text: '<h1>', correct: false },
            { text: '<title>', correct: true },
            { text: '<h2>', correct: false }
        ]
    },
    {
        question: 'Which one of these elements is semantic?',
        answers: [
            { text: '<p>', correct: true },
            { text: '<div>', correct: false },
            { text: '<tag>', correct: false },
            { text: '<span>', correct: false },
        ]
    },
    {
        question: 'Which of these properties style font color?',
        answers: [
            { text: 'background-color', correct: false },
            { text: 'font-family', correct: false },
            { text: 'font-style', correct: false },
            { text: 'color', correct: true },
        ]
    },
    {
        question: 'Can we change inline elements to block elements in CSS?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false }
        ]
    },
    {
        question: 'What tags is used to enter a new line into an HTML document?',
        answers: [
            { text: '<line>', correct: false },
            { text: '<tag>', correct: false },
            { text: '<br>', correct: true },
            { text: '<section>', correct: false }
        ]
    },
    {
        question: 'What is the element for an ordered list?',
        answers: [
            { text: '<ol>', correct: true },
            { text: '<ordList>', correct: false },
            { text: '<ollist>', correct: false },
            { text: '<orderedl>', correct: false },
        ]
    },
    {
        question: 'CSS is used to?',
        answers: [
            { text: 'create the skeleton structure of a webpage', correct: false },
            { text: 'style an HTML document for a webpage', correct: true },
            { text: 'make a button work on a webpage', correct: false },
            { text: 'cook some lasagna', correct: false },
        ]
    },
    

]

