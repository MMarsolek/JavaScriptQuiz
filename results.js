var userNameInput = document.querySelector('.userInput');
var addScoreButton =  document.querySelector('.add-button');
var restartButton = document.querySelector('.restart-button');
var stored = JSON.parse(localStorage.getItem('scoreTracker'));
var existing = JSON.parse(localStorage.getItem('leaderBoard')) || [];
var scoreList = document.querySelector('.scores')
var userName ='';


if (stored == null) {
    document.querySelector('.result-label').classList.add('hide');
    addScoreButton.classList.add('hide');
}
displayResults(existing);
document.querySelector('.modal').classList.add('hide');

addScoreButton.addEventListener('click', function(){
    clearScoreList()
    userName = userNameInput.value;
    if (userName == '' || userName == null) {
        document.querySelector('.modal').classList.remove('hide');
    }else {
        addNameToResults();
    }
})

document.querySelector('.close-button').addEventListener('click', function() {
    document.querySelector('.modal').classList.add('hide');
    displayResults(existing);
})

restartButton.addEventListener('click', function() {
    window.location.href="index.html"
})

function addNameToResults() {
    stored [ "name" ] = userName.trim();
    existing.push(stored);
    localStorage.removeItem('scoreTracker');
    localStorage.setItem('leaderBoard', JSON.stringify(existing));
    userNameInput.classList.add('hide');
    addScoreButton.classList.add('hide');
    displayResults(existing);
}

function displayResults(leaderBoard) {
    leaderBoard.sort(compareScores);
    for (var i = 0; i < leaderBoard.length; i++){
        var li = document.createElement('li');
        var e = leaderBoard[i];
        if(e.name == userNameInput.value) {
            document.querySelector('.scores').textContent = 'You are number ' + (i+1); 
        }
        li.textContent = (`${e.name} had ${e.time} seconds left and got ${e.score}% correct`);
        scoreList.appendChild(li);
        if (i>=10){
            i = leaderBoard.length;
        }
    };
}

function clearScoreList() {
    while(scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
    }

}

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