    var question = document.querySelector("#question");
    var userInput = document.querySelector("#userInput");
    var multipleChoice = document.querySelector("#answerList");
    const startButton = document.getElementById('start-button')
    const submitButton = document.getElementById('submit-button');
    const questionContainer = document.getElementById('question-container');

    var objPointer = 0;
    var correctAnswers = 0;

    var questionObject = createQuizObject();
    startButton.addEventListener("click", startQuiz);
    
    submitButton.addEventListener("click", displayQuestion);

    function startQuiz() {
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        questionObject = questionObject.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        submitButton.classList.remove('hide');
        displayQuestion();

    }

    function resetState() {
        while (multipleChoice.firstChild){
            multipleChoice.removeChild(multipleChoice.firstChild);
        }
    }

    function displayQuestion(){
        resetState() 
        const curQuestionObj =  questionObject[objPointer];
        question.innerText = curQuestionObj.question;
        if (curQuestionObj.questionType == 'multiple') {
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
                button.addEventListener('click', selectAnswer);
            });
        }
        else{
            multipleChoice.classList.add('hide');
            userInput.classList.remove('hide');
            userInput.addEventListener('change',  (event) => {
                curQuestionObj.answers.answerText = event.target.value;
            });
        }
        objPointer++;
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(multipleChoice.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
    }

    function setStatusClass(element, isCorrect) {
        clearStatusClass(element);
        if(isCorrect){
            element.classList.add("correct");
        }else{
            element.classList.add("wrong");
        }
    }

    function clearStatusClass(element){
        element.classList.remove("wrong");
        element.classList.remove("correct");

    }
    function createQuizObject(){
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
        return questionObject;
    }
