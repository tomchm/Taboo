/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false, intel:false*/
/*
 * This function runs once the page is loaded, but the JavaScript bridge library is not yet active.
 */

var currentWord;
var fail1;
var fail2;
var fail3;
var fail4;
var fail5;

var totalPlayers = 0;
var currentRound = 0;
var currentCard = 0;
var currentTime = 20;
var myTimer;

var blueGet = 0;
var orangeGet = 0;
var blueFail = 0;
var orangeFail = 0;
var blueSkip = 0;
var orangeSkip = 0;

function startGame() {
    totalPlayers = document.getElementById("Number_players").value;
    startRound();
}


function startRound() {
    nextCard();
    currentTime = 20;
    myTimer = setInterval(function () {myTimer();}, 1000);
}

function myTimer() {
    currentTime += 1;
    document.getElementById("counter").innerHTML = currentTime;
}

function nextCard() {
    currentCard += 1;
    var request = new XMLHttpRequest();
    request.open("GET", "words/tabooWords.json", false);
    request.send(null);
    var objy = JSON.parse(request.responseText);
    
    currentWord = objy[currentCard].GuessWord;
    fail1 = objy[currentCard].Fail1;
    fail2 = objy[currentCard].Fail2;
    fail3 = objy[currentCard].Fail3;
    fail4 = objy[currentCard].Fail4;
    fail5 = objy[currentCard].Fail5;
    
    loadWords();
    
}

function loadWords() {
    document.getElementById("currentWord").innerHTML = currentWord;
    document.getElementById("fail1").innerHTML = fail1;
    document.getElementById("fail2").innerHTML = fail2;
    document.getElementById("fail3").innerHTML = fail3;
    document.getElementById("fail4").innerHTML = fail4;
    document.getElementById("fail5").innerHTML = fail5;
    
}

function getCurrentTeam() {
    return currentRound % 2;   
}

function addGet() {
    if(getCurrentTeam() === 0){
        blueGet += 1;
    }
    else{
        orangeGet += 1;   
    }
    
    nextCard();
}

function addFail() {
    if(getCurrentTeam() === 0){
        blueFail += 1;
    }
    else{
        orangeFail += 1;   
    }
    
    nextCard();
}

function addSkip() {
    if(getCurrentTeam() === 0){
        blueSkip += 1;
    }
    else{
        orangeSkip += 1;   
    }
    
    nextCard();
}