var question = document.querySelector("#question");
var userInput = document.querySelector(".userInput");
var multipleChoice = document.querySelector("#answerList");
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
var correct = 0;
var wrong = 0;
var objPointer = 0;
var correctAnswers = 0;
var resultPage = document.querySelector(".results");
var userName;
var timer = document.querySelector('.timer');
var timeBox = document.querySelector('.time-container');
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", displayQuestion);
var timerCounter = 120;
var timeOut;
startButton.addEventListener('click', startQuiz);


function startQuiz() {
    objPointer = 0;
    startButton.innerText = 'start';
    startButton.classList.add('hide');
    nextButton.classList.remove('hide');
    questionContainer.classList.remove('hide');
    questionObject = questionObject.sort(() => Math.random() - .5);
    startTimer();
    displayQuestion();
}

function resetState() {
    while (multipleChoice.firstChild){
        multipleChoice.removeChild(multipleChoice.firstChild);
    }
}

function displayQuestion(){
    resetState(); 
    const curQuestionObj =  questionObject[objPointer]; 
    question.innerText = curQuestionObj.question;
    if (curQuestionObj.questionType == 'multiple') {
        nextButton.classList.add('hide');
        userInput.classList.add('hide');
        multipleChoice.classList.remove('hide');
        multipleChoice.style.display='grid';
        curQuestionObj.answers.forEach(answer => {
            button = document.createElement('button');
            button.innerHTML =  answer.answerText;
            multipleChoice.appendChild(button);
            button.classList.add('btn');
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', (event) => {
                const correct = event.target.dataset.correct;
                setStatusClass(document.body, correct, event.target);
                nextQuestion();
            });
        });
    }
    else{
        nextButton.classList.remove('hide');
        multipleChoice.classList.add('hide');
        userInput.classList.remove('hide');
        nextButton.addEventListener('click', () => inputAnswerIsCorrect(userInput.value, curQuestionObj));
    }
}

function resetPage() {
    questionContainer.classList.add('hide');
    resultPage.classList.remove('hide');
    document.body.classList.remove('correct');
    document.body.classList.remove('wrong');
    document.body.classList.add('neutral');
}

function results() {
    resetPage();
    console.log("In result");
    var button = document.createElement('button');
    button.innerText = "Submit"
    button.classList.add('btn');
    var userNameInput = document.createElement('input');
    var lb = document.createElement('label');
    lb.textContent = "Input your name";
    userNameInput.type = "text";
    userNameInput.appendChild(lb);
    resultPage.appendChild(userNameInput);
    resultPage.appendChild(button);
    button.setAttribute('margin', '20px');
    button.addEventListener('click', (event) => {
        event.preventDefault();
        userName = userNameInput.value;
        console.log(userName);
        scoreTracker();

    })
}

function scoreTracker(){
    var score = Math.floor((wrong/(wrong + correct)) * 100);
    var stored = localStorage.getItem('leaderBoard');
    if (stored == undefined) {
        stored = [];
    } else {
        stored = JSON.parse(stored);
    }
    stored.push({
        name: userName,
        score: score
    });
   localStorage.setItem('leaderBoard', JSON.stringify(stored));
}

function inputAnswerIsCorrect(givenAnswer, questionObject) {
    const correctAnswer = questionObject.correctAnswer;
    if (correctAnswer == givenAnswer) {
        questionObject.answers.answerText = givenAnswer;
        questionObject.answers.correct = true;
    }
    setStatusClass(document.body, questionObject.answers.correct, userInput);
    nextQuestion();
}

function nextQuestion() {
    objPointer++;
    if(questionObject.length >= objPointer+1){
        nextButton.classList.remove('hide');
        displayQuestion();
    }
    else{
        endOfQuiz();
    }
}

function setStatusClass(element, isCorrect, clickedButton) {
    clearStatusClass(element);
    if(isCorrect){
        element.classList.add("correct");
        clickedButton.classList.add("correct");
        document.getElementById("correctSound").play();
        correct++;
    } else {
        clickedButton.classList.add("wrong");
        element.classList.add("wrong");
        document.getElementById("wrongSound").play();
        wrong++;
        timerCounter = timerCounter-5;
    }
}

function clearStatusClass(element){
    element.classList.remove("wrong");
    element.classList.remove("correct");
}

function startTimer() {
    var m = Math.floor(timerCounter / 60);
    var s = timerCounter % 60;
    s = checkSecond(s);
    timer.textContent =
        m + ":" + s;
    timerCounter--;
    timeOut = setTimeout(startTimer, 1000);
    if(m==0&&s==0){
        endOfQuiz();
    }
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0)
         {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) 
        {sec = "59"};
    return sec;
  }

function endOfQuiz() {
    if (((correct+wrong) == questionObject.length)){
        clearTimeout(timeOut);
        timeOut = null;
        results();
    } else if(timerCounter == 0) {
        console.log("In endOfQuiz");
        timer.classList.add('hide');
        timeBox.textContent = "Times Up!!";
        results();
    }
}

var questionObject = [{
    question: "How can generic objects be created?",
    questionType: "multiple",
    answers : [
        {answerText: "var I = new object()", correct: true},
        {answerText: "var = new object(I)", correct: false},
        {answerText: "new object = var I", correct: false},
        {answerText: "new object(var = I)", correct: false}
    ]},
    {
        question: "What is event bubbling?",
        questionType: "multiple",
        answers : [
            {answerText: "When one element of the DOM is clicked, it triggers another random DOM element.", correct: false},
            {answerText: "When one element is clicked, all DOM elements are activated regardless of their location in the DOM." , correct: false},
            {answerText: "In the case of nested DOM elements, if the handler of the parent is clicked, the handler of the child will also work as if it were clicked too.", correct: false},
            {answerText: "In the case of nested DOM elements, if the handler of the child is clicked, the handler of the parent will also work as if it were clicked too.", correct: true}
            ]
    },
    {
        question: "True or False, you can have objects nested inside of arrays?",
        questionType: "multiple",
        answers: [
            {answerText: "True", correct: true},
            {answerText: "False", correct: false}
        ]
    },
    {
        question: "What is JavaScript?",
        questionType: "multiple",
        answers: [
            {answerText: "JavaScript is a client-side and server-side scripting language inserted into HTML pages and is understood by web browsers.", correct: false},
            {answerText: "JavaScript is an Object-based Programming language.", correct: false},
            {answerText: "All of the above", correct: true},
            {answerText: "Those are all wrong!", correct: false}

        ]
    },
    {
        question: "Which company developed JavaScript?",
        questionType: "multiple",
        answers: [
            {answerText: "Sun Microsystems, Inc. is the software company that developed JavaScript.", correct: false},
            {answerText: "Bell Laboratories is the software company that developed JavaScript.", correct: false},
            {answerText: "Netscape is the software company that developed JavaScript.", correct: true},
            {answerText: "Microsoft is the software company that developed JavaScript.", correct: false}
        ]
    },
    {

        question: "What is the difference between “==” and “===”?",
        questionType: "multiple",
        answers: [
            {answerText: "\“===\” checks only for equality in value, whereas \“==\” is a stricter equality test and returns false if either the value or the type of the two variables are different.", correct: false},
            {answerText: "\“==\” checks only for equality in value, whereas \“===\” is a stricter equality test and returns false if either the value or the type of the two variables are different.", correct: true},
            {answerText: "They are the same", correct: false},
            {answerText: "\“==\” assigns a new value, whereas \“===\” checks if the two variables are different.", correct: false}
        ]
    },
    {
        question: "What would be the result of 3+2+\”7\″?",
        questionType: "userInput",
        correctAnswer: 57,
        answers: {answerText: "", correct: false}
    }
]

