$(document).ready(function() {  
    var player = document.getElementById('audioPlayer');
    var volumeslider = document.getElementById('volumeslider');
    var muteAudio = document.getElementById('mute_unmute');
    var seekbar = document.getElementById('testranger');
    seekbar.min = 0;
    
    seekbar.max = player.duration;
    console.log(player.duration);
    volumeslider.addEventListener("change", setvolume);
    muteAudio.addEventListener("click",Mute_Unmute);
    player.addEventListener("load", myScript);
    player.autoplay =true;
    // $(".media-progress").on("click", function(e) {

    //     // var max = $(this).width(); //Get width element
    //     // var pos = e.pageX - $(this).offset().left; //Position cursor
    //     // var dual = Math.round(pos / max * 100); // Round %
    
    
    //     // if (dual > 100) {
    //     //   var dual = 100;
    //     // }
    
    
    //     // $(this).val(dual);
    //     // $("#progress-value").text(dual);
    //     alert('im done');
    
    // });
    
    function Mute_Unmute(){
        player.muted = !player.muted;
        if (player.muted) {
            muteAudio.innerHTML = '<i style="font-size:20px; margin-right:30px" class="fas fa-volume-off" ></i>';
        }else {
            muteAudio.innerHTML = '<i style="font-size:20px; margin-right:15px" class="fas fa-volume-up"></i>';
        }
    }


    function setvolume(){
        
        player.volume = volumeslider.value / 100;  
        
    }

    function formatTime(s, m) {
        s = Math.floor( s );    
        m = Math.floor( s / 60 );
        m = m >= 10 ? m : '' + m;    
        s = Math.floor( s % 60 );
        s = s >= 10 ? s : '0' + s;    
        return m + ':' + s;
    }

    volumeslider.addEventListener("change", setvolume);

    testranger.addEventListener("change", durationBar);

    function durationBar(){
       
        // var player = document.getElementById('audioPlayer');
        // $("#currentTime").text(player.currentTime);
        // $("#totalTime").text(player.duration);
        // $("#restTime").text(player.duration - player.currentTime);
       
        totalTime.textContent = formatTime(player.duration);
        currentTime.textContent = formatTime(player.currentTime);
        restTime.textContent = formatTime((player.duration )- (player.currentTime));

        player.currentTime = testranger.value;
        console.log(player.currentTime);
    }


    

    
    
    
    
});


