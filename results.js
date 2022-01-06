var userNameInput = document.querySelector('.userInput');
var addScoreButton =  document.querySelector('.add-button');
var restartButton = document.querySelector('.restart-button');
var stored = JSON.parse(localStorage.getItem('scoreTracker'));
var existing = JSON.parse(localStorage.getItem('leaderBoard')) || [];
var scoreList = document.querySelector('.scores')
var userName ='';

//Checks to verify that they stored quiz results are not null. If they are null, they just display the current leader board.
if (stored == null) {
    document.querySelector('.result-label').classList.add('hide');
    addScoreButton.classList.add('hide');
}
displayResults(existing);
document.querySelector('.modal').classList.add('hide');


//Updates the username when the 'addScore' button is pushed
addScoreButton.addEventListener('click', function(){
    clearScoreList()
    userName = userNameInput.value;
    if (userName == '' || userName == null) {
        document.querySelector('.modal').classList.remove('hide');
    }else {
        addNameToResults();
    }
})


//Closes the modal and redisplay the leader board
document.querySelector('.close-button').addEventListener('click', function() {
    document.querySelector('.modal').classList.add('hide');
    displayResults(existing);
})


//Adds a listener to the restart button adn changes the location that is currently being read to the correct HTML file
restartButton.addEventListener('click', function() {
    window.location.href="index.html"
})

//Takes the stored name and adds it to the already existing stored score data.
function addNameToResults() {
    stored [ "name" ] = userName.trim();
    existing.push(stored);
    localStorage.removeItem('scoreTracker');
    localStorage.setItem('leaderBoard', JSON.stringify(existing));
    userNameInput.classList.add('hide');
    addScoreButton.classList.add('hide');
    displayResults(existing);
}


//Loops through the stored data and displays it on the leader board.
function displayResults(leaderBoard) {
    leaderBoard.sort(compareScores);
    for (var i = 0; i < leaderBoard.length; i++){
        var li = document.createElement('li');
        var e = leaderBoard[i];
        if(e.name == userNameInput.value) {
            document.querySelector('.scores').textContent = 'You are number ' + (i+1); //Displays the players current ranking even if it is below the ten places on the board
        }
        li.textContent = (`${e.name} had ${e.time} seconds left and got ${e.score}% correct`); //This is where the information is added to the leader board
        scoreList.appendChild(li);
        if (i>=10){
            i = leaderBoard.length;
        }
    };
}

//Clears the leader board list so that when it is displayed a second time, only one list is shown instead of one list being shown twice
function clearScoreList() {
    while(scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
    }

}


//The comparator for sorting the lists by scores. Returns zero if the scores are the same.
function compareScores(a, b) {
    if (a.score < b.score) {
        return 1;
    } if (a.score > b.score) {
        return -1;
    } if (a.time < b.time) {
        return 1;
    } if (a.time > b.time) {
        return -1;
    } 
    
    return 0;
} 
//The comparator for sorting the lists by time. Returns zero if the scores are the same.
function compareTime(a, b) {
    if (a.time < b.time) {
        return -1;
    } if (a.time > b.time) {
        return 1;
    } if (a.score < b.score) {
        return 1;
    } if (a.score > b.score) {
        return -1;
    }
    
    return 0;
} 