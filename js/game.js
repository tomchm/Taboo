/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false, intel:false*/
/*
 * This function runs once the page is loaded, but the JavaScript bridge library is not yet active.
 */

$("#Start").onclick

function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}