var userNameInput = document.querySelector('.userInput');
var addButton =  document.querySelector('.add-button');
var stored = JSON.parse(localStorage.getItem('scoreTracker'));
var existing = JSON.parse(localStorage.getItem('leaderBoard')) || [];
var scoreList = document.querySelector('.scores')


if (stored == null) {
    document.querySelector('.result-label').classList.add('hide');
}
displayResults(existing);


addButton.addEventListener('click', function(){
    clearScoreList()
    stored [ "name" ] = userNameInput.value;
    existing.push(stored);
    localStorage.removeItem('scoreTracker');
    localStorage.setItem('leaderBoard', JSON.stringify(existing));
    displayResults(existing);
})

function displayResults(leaderBoard) {
    leaderBoard.sort(compareScores);
   for (var i = 0; i < leaderBoard.length; i++){
        var li = document.createElement('li');
        var e = leaderBoard[i];
        if(e.name == userNameInput.value) {
            var placement = document.createElement('p');
            placement.textContent = 'You are number ' + (i+1); 
            document.querySelector('.score-title').appendChild(placement);
        }
        li.textContent = (`${e.name} had ${e.time} seconds left got ${e.score} percent`);
        scoreList.appendChild(li);
        if (i>=10){
            i = leaderBoard.length;
        }
    };
}

function clearScoreList() {
    document.querySelector('.score-title').removeChild( document.querySelector('.score-title').firstChild);
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
        return -1;
    } if (a.time > b.time) {
        return 1;
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