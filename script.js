var question = document.querySelector("#question");
var userInput = document.querySelector(".userInput");
var multipleChoice = document.querySelector("#answerList");
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
var resultsButton = document.querySelector('.resultsButton');
var correct = 0;
var wrong = 0;
var objPointer = 0;
var correctAnswers = 0;
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
            disableChildrenButtons(event.target);
            const correct = event.target.dataset.correct;
            setStatusClass(document.body, correct, event.target);
            nextQuestion();
        });
    });
    
}


//Rests the page so that the background is a neutral color and the question container is hidden
function resetPage() {
    questionContainer.classList.add('hide');
    document.body.classList.remove('correct');
    document.body.classList.remove('wrong');
    document.body.classList.add('neutral');
}



//Keeps track of the score and turns it into a percentage before adding it to local stoage
function scoreTracker(){
    var score = 100 - Math.floor((wrong/(wrong + correct)) * 100);
  var  stored = {
        score: score,
        time: timerCounter
    };
   localStorage.setItem('scoreTracker', JSON.stringify(stored));
}


//Checks to see if the answer is correct
function inputAnswerIsCorrect(givenAnswer, questionObject) {
    const correctAnswer = questionObject.correctAnswer;
    if (correctAnswer == givenAnswer) {
        questionObject.answers.answerText = givenAnswer;
        questionObject.answers.correct = true;
    }
    setStatusClass(document.body, questionObject.answers.correct, userInput);
    nextQuestion();
}


//Moves the object point forward and makes sure the pointer is not pointing ar something undefined
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


//Disables all the children of the given buttons parent
function disableChildrenButtons(button) {
    var parent = button.parentElement;
    parent.childNodes.forEach(element => {
        element.disabled = true;
    }); 
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


//Creates the timer and formats the time to m:s and also calls the endOfQuiz function when the time runs out
function startTimer() {
    var m = Math.floor(timerCounter / 60);
    var s = timerCounter % 60;
    s = checkSecond(s);
    timer.textContent =
        m + ":" + s;
    timerCounter--;
    timeOut = setTimeout(startTimer, 1000);
    if(m==0&&s==0){
        timerCounter = 0;
        endOfQuiz();
    }
}

//If the second displayed is a single digit, a zero is added to the front of it for formatting purposes.
function checkSecond(sec) {
    if (sec < 10 && sec >= 0)
         {sec = "0" + sec}; 
    if (sec < 0) 
        {sec = "59"};
    return sec;
  }


  //Ends the current quiz and determines if it ended due to time out or if all the questions have been answered.
function endOfQuiz() {
    if (((correct+wrong) == questionObject.length)){
        clearTimeout(timeOut);
        timeOut = null;
        resultsButton.classList.remove('hide');
    } else if(timerCounter == 0) {
        var total = questionObject.length;
        wrong = total-correct;
        timer.classList.add('hide');
        timeBox.textContent = "Times Up!!";
        resultsButton.classList.remove('hide');
        disableChildrenButtons(document.querySelector('.btn'));
    }
}


//Adds an event listener to the resultsButton and changes the page that is currently being read to the correct HTML page.
resultsButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetPage();
    window.location.href="results.html";
    scoreTracker();
})

var questionObject = [{
    question: "How can generic objects be created?",
    answers : [
        {answerText: "var I = new object()", correct: true},
        {answerText: "var = new object(I)", correct: false},
        {answerText: "new object = var I", correct: false},
        {answerText: "new object(var = I)", correct: false}
    ]},
    {
        question: "What is event bubbling?",
        answers : [
            {answerText: "When one element of the DOM is clicked, it triggers another random DOM element.", correct: false},
            {answerText: "When one element is clicked, all DOM elements are activated regardless of their location in the DOM." , correct: false},
            {answerText: "In the case of nested DOM elements, if the handler of the parent is clicked, the handler of the child will also work as if it were clicked too.", correct: false},
            {answerText: "In the case of nested DOM elements, if the handler of the child is clicked, the handler of the parent will also work as if it were clicked too.", correct: true}
            ]
    },
    {
        question: "True or False, you can have objects nested inside of arrays?",
        answers: [
            {answerText: "True", correct: true},
            {answerText: "False", correct: false}
        ]
    },
    {
        question: "What is JavaScript?",
        answers: [
            {answerText: "JavaScript is a client-side and server-side scripting language inserted into HTML pages and is understood by web browsers.", correct: false},
            {answerText: "JavaScript is an Object-based Programming language.", correct: false},
            {answerText: "All of the above", correct: true},
            {answerText: "Those are all wrong!", correct: false}

        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            {answerText: "Sun Microsystems, Inc. is the software company that developed JavaScript.", correct: false},
            {answerText: "Bell Laboratories is the software company that developed JavaScript.", correct: false},
            {answerText: "Netscape is the software company that developed JavaScript.", correct: true},
            {answerText: "Microsoft is the software company that developed JavaScript.", correct: false}
        ]
    },
    {

        question: "What is the difference between “==” and “===”?",
        answers: [
            {answerText: "\“===\” checks only for equality in value, whereas \“==\” is a stricter equality test and returns false if either the value or the type of the two variables are different.", correct: false},
            {answerText: "\“==\” checks only for equality in value, whereas \“===\” is a stricter equality test and returns false if either the value or the type of the two variables are different.", correct: true},
            {answerText: "They are the same", correct: false},
            {answerText: "\“==\” assigns a new value, whereas \“===\” checks if the two variables are different.", correct: false}
        ]
    },
    {
        question: "What is does 'null' mean?",
        answers: [
            {answerText: "Nothing. It's a fake word.", correct: false},
            {answerText: "Undefined", correct: false},
            {answerText: "The number zero", correct: false},
            {answerText: "An empty, nothing, or an unknown type of value.", correct: true}
        ]
    }
]

