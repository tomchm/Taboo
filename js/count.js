/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false, intel:false*/
/*
 * This function runs once the page is loaded, but the JavaScript bridge library is not yet active.
 */

// link to this from the game.js file


var currentCount = 3, myTimer;
var countDown = function() {
    if (currentCount > 0) {
       $("#odometer").html(currentCount); 
        currentCount--;
    } else {
        clearInterval(myTimer);
    }
}


$( document ).ready(function() {

    myTimer = setInterval(countDown, 1000);
});
