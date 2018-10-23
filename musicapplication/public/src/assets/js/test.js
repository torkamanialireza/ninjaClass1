// test az jadid
var player = document.getElementById('audioPlayer');
// Create a Audio Seek Bar
function CreateSeekBar() { 
    alert("Page is loaded");
    var seekbar = document.getElementById("audioSeekBar"); 
    seekbar.min = 0; 
    seekbar.max = player.duration; 
    seekbar.value = 0; 
    var timelapsed = document.getElementById("timelapsed"); 
    timelapsed.innerHTML = "0/" + Math.round(audio.timelapsed) + "seconds"; 
    rangeElem.min = player.duration
}  
// CreateSeekBar();
   // Toggle between Pause and Play
   function Update_Play_Pause() { 
    

    if (player.paused) { 

         player.play(); 
    } 
    else { 
         player.pause(); 
    } 
} 
//
function myScript() {
    // console.log("load shodam");
    player.play();
    
    
}


$(document).ready(function() {
    var audioElement = document.getElementById('audioPlayer');
   
   
    audioElement.addEventListener('ended', function() {
        
        
        
        // this.play();
        rangeElem.min = player.duration
    }, false);
    
    audioElement.addEventListener("canplay",function(){
        // $("#length").text("Duration:" + audioElement.duration + " seconds");
       
        // $("#source").text("Source:" + audioElement.src);
        // $("#status").text("Status: Ready to play").css("color","green");
    });

    function formatTime(s, m) {
        s = Math.floor( s );    
        m = Math.floor( s / 60 );
        m = m >= 10 ? m : '' + m;    
        s = Math.floor( s % 60 );
        s = s >= 10 ? s : '0' + s;    
        return m + ':' + s;
    }

    
    
    audioElement.addEventListener("timeupdate",function(){
        
        // $("#currentTime").text(audioElement.currentTime);
        // $("#totalTime").text(audioElement.duration);
        // $("#restTime").text(audioElement.duration - audioElement.currentTime);
        var seekbar = document.getElementById('testranger');
        seekbar.min= 0;
        seekbar.value = audioElement.currentTime;
        seekbar.max = audioElement.duration;
        
        setInterval(function() {
            totalTime.textContent = formatTime(audioElement.duration);
            currentTime.textContent = formatTime(audioElement.currentTime);
            restTime.textContent = formatTime((audioElement.duration )- (audioElement.currentTime));
        
        }, 100);


    });

    
    $('#play').click(function() {
        audioElement.play();
        $("#status").text("Status: Playing");
    });
    
    $('#pause').click(function() {
        audioElement.pause();
        $("#status").text("Status: Paused");
    });
    
    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
});
///
//    // Update Play and Pause 
   function Update_Play_Pause() { 
    var playAudio=document.getElementById("play_audio"); 
    if (player.paused || player.ended) { 
         playAudio.value="Play>>"; 
    } 
    else { 
      playAudio.value="Pause[0]"; 
    } 
} 

// End of the media
   function EndofAudio() { 
       console.log("load shod tamoom shod");
    document.getElementById("play_audio").value = "Play"; 
    document.getElementById("audioSeekBar").value = 0; 
    document.getElementById("timelapsed").innerHTML = "0/" + Math.round(player.duration); 
    
}  

//Update SeekBar Bar
function SeekBar() { 
    var seekbar = document.getElementById("audioSeekBar"); 
    seekbar.value = player.currentTime; 
    var timelapsed = document.getElementById("timelapsed"); 
    timelapsed.innerHTML = Math.round(player.currentTime) + "/" + Math.round(player.duration) + "(seconds)"; 
}   

   



// * audio visualizer with html5 audio element
// *
// * v0.1.0
// * 
// * licenced under the MIT license
// * 
// * see my related repos:
// * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
// * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
// * - selected https://github.com/wayou/selected
// * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
// * 
// * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
// */
// window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

window.onload = function() {


    
    console.log("loaded player");
    var player = document.getElementById('audioPlayer');
   //var audio = document.getElementById('audio');
   var ctx = new AudioContext();

   
// For more information regarding how to present images on displays of all resolutions in Safari, read Safari Image Delivery Best Practices.


   var analyser = ctx.createAnalyser();
   var audioSrc = ctx.createMediaElementSource(player);
   // we have to connect the MediaElementSource with the analyser 
   audioSrc.connect(analyser);
   analyser.connect(ctx.destination);
   // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
   //analyser.fftSize = 64;
   // frequencyBinCount tells you how many values you'll receive from the analyser
   var frequencyData = new Uint8Array(analyser.frequencyBinCount);

   // we're ready to receive some data!

   var canvas = document.getElementById('canvas'),
    cwidth = canvas.width;
    var ctx = canvas.getContext("2d");
    function backingScale(context) {
        if ('devicePixelRatio' in window) {
            if (window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
        }
        return 1;
        }
    
    //     var scaleFactor = backingScale(ctx);
     
    // if (scaleFactor > 1) {
    //     canvas.width = canvas.width * scaleFactor;
    //     canvas.height = canvas.height * scaleFactor;
    //     // update the context for the new canvas scale
    //     var ctx = canvas.getContext("2d");
    // }
    
    // if (navigator.platform === "MacIntel") {
    //     cwidth = canvas.width;
    //     gradient.addColorStop(1, '#ea4335');
    //     gradient.addColorStop(0.5, '#ea4335');
    //     gradient.addColorStop(0, '##ea4335');
    // }
    
    // if (navigator.platform === "iPhone") {
    // cwidth = screen.width;
    // cheight = screen.height -7;
    // meterWidth = 46; //width of the meters in the spectrum
    // gap = 20;//gap between meters
    // capHeight = 0.5//for black item
    // capStyle = 'black'
    // meterNum = 15000 / (10+ 2);//count of the meters
    // capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame#0f0,#ff0,#f00
    // ctx = screen.getContext('2d');
    // gradient = ctx.createLinearGradient(0, 0, 0, 200);
    // gradient.addColorStop(1, '#272341');
    // gradient.addColorStop(0.5, 'black');
    // gradient.addColorStop(0, '#ad1457');
    // //I'll use window.innerWidth in production
    // }
    cheight = canvas.height -7;
    meterWidth = 46;//width of the meters in the spectrum
    gap = 20; //gap between meters
    capHeight = 0.5;//for black item
    capStyle = 'black';
    meterNum = 15000 / (10+ 2); //count of the meters
    capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame#0f0,#ff0,#f00
   ctx = canvas.getContext('2d');
   gradient = ctx.createLinearGradient(0, 0, 0, 200);
//    gradient.addColorStop(1, '#ad1457');
gradient.addColorStop(1, '#272341')
  
   gradient.addColorStop(0.5, 'black');
   gradient.addColorStop(0, '#ad1457');
   // loop
   function renderFrame() {
       var array = new Uint8Array(analyser.frequencyBinCount);
       analyser.getByteFrequencyData(array);
       var step = Math.round(array.length / meterNum); //sample limited data from the total array
       ctx.clearRect(0, 0, cwidth, cheight);
       for (var i = 0; i < meterNum; i++) {
           var value = array[i * step];
           if (capYPositionArray.length < Math.round(meterNum)) {
               capYPositionArray.push(value);
           };
           ctx.fillStyle = capStyle;
           //draw the cap, with transition effect
           if (value < capYPositionArray[i]) {
               ctx.fillRect(i * 48, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
           } else {
               ctx.fillRect(i * 48, cheight - value, meterWidth, capHeight);
               capYPositionArray[i] = value;
           };
           ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
           ctx.fillRect(i * 48 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
       }
       requestAnimationFrame(renderFrame);
   }
   renderFrame();
   player.play();
   
}

function getColor(){
    var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
  $scope.myObj = {
    "color" : "white",
    "background-color" : "coral",
    "font-size" : "60px",
    "padding" : "50px"
  }
});
}











