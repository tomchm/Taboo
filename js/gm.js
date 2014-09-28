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
var myCountdown;

var blueGet = 0;
var orangeGet = 0;
var blueFail = 0;
var orangeFail = 0;
var blueSkip = 0;
var orangeSkip = 0;

function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

function startGame() {
    startButton();
    totalPlayers = document.getElementById("Number_players").value;
    startRound();
    return false;
}

function endGame() {
    document.getElementById("blueGot").innerHTML = blueGet;
    document.getElementById("orangeGot").innerHTML = orangeGet;
    document.getElementById("blueFailed").innerHTML = blueFail;
    document.getElementById("orangeFailed").innerHTML = orangeFail;
    document.getElementById("blueSkipped").innerHTML = blueSkip;
    document.getElementById("orangeSkipped").innerHTML = orangeSkip;
}

function startRound() {
    currentRound += 1;
    
    nextCard();
    currentTime = 10;
    document.getElementById("counter").innerHTML = currentTime;
    myCountdown = setInterval(myTimer, 1000);
    
    function myTimer() {
        currentTime -= 1;
        document.getElementById("counter").innerHTML = currentTime;
        
        if(currentTime <= 0){
            clearInterval(myCountdown);
            if(currentRound == totalPlayers){
                endGame();
                show("ScoreScreen", "GameScreen", 0);
            }
            else {
                show("PauseScreen", "GameScreen", 0);
            }
        }
    }
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
    
    loadWords();
    
}

function loadWords() {
    document.getElementById("currentWord").innerHTML = currentWord;
    document.getElementById("fail1").innerHTML = fail1;
    document.getElementById("fail2").innerHTML = fail2;
    document.getElementById("fail3").innerHTML = fail3;
    document.getElementById("fail4").innerHTML = fail4;
    
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


var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
  };

  recognition.onerror = function(event) {
      //alert("fuck");
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
      if(currentTime == 0){
          return false;
      }
      
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (!event.results[i].isFinal) {
        interim_transcript += event.results[i][0].transcript + "<br>";
        //alert(event.results[i][0].transcript.trim()+"\nhello");
        if(event.results[i][0].transcript.trim() == fail1) {
            addFail();
        }
        else if(event.results[i][0].transcript.trim() == fail2) {
            addFail();
        }
        else if(event.results[i][0].transcript.trim() == fail3) {
            addFail();
        }
        else if(event.results[i][0].transcript.trim() == fail4) {
            addFail();
        }
        else if(event.results[i][0].transcript.trim() == currentWord) {
            addFail();
        }
      }
    }
  };

function upgrade() {
}

function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.start();
  ignore_onend = false;
}