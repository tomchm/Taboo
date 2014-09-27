/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false, intel:false*/
/*
 * This function runs once the page is loaded, but the JavaScript bridge library is not yet active.
 */
var init = function () {
    
    
};

window.addEventListener("load", init, false);  

 // Prevent Default Scrolling 
var preventDefaultScroll = function(event) 
{
    event.preventDefault();
    window.scroll(0,0);
    return false;
};
    
window.document.addEventListener("touchmove", preventDefaultScroll, false);

/**
 * Device ready code.  This event handler is fired once the JavaScript bridge library is ready.
 */
function onDeviceReady()
{
    //lock orientation
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);
        
    //manage power
    intel.xdk.device.managePower(true,false);

    //hide splash screen
    intel.xdk.device.hideSplashScreen();        
}

document.addEventListener("intel.xdk.device.ready",onDeviceReady,false); 
/**
 * We use the target from the event to add the pressed class name to the selected button
 */     

// Touch start functionality for the buttons
function touchstarthandler(event)
{
    var button= event.target;
    button.className ="pressed";
}

// Touch end functionality for the buttond
function touchendhandler(event)
{
    var button= event.target;
    button.className ="";
}
