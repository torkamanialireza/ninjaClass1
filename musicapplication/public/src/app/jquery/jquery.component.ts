import { Component, OnInit, ElementRef } from '@angular/core';

declare var jQuery: any;
declare var width:any;
@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.css']
})
export class JqueryComponent implements OnInit {

  constructor(private _elRef: ElementRef) { }
  speed : any;
 
  createLinearGradient(){

  }
  ngOnInit() {
    jQuery(document).ready(function(){
      var imgCount = ('.img').length
      jQuery(document).find("#slider").on("change", function() {
        for (var i = 1; i <= imgCount; i++) {
          this.speed = 201 - this.value;
          jQuery(document).find('#range').text(`1000px / ${this.speed/10}s`)
          this.speed = this.speed * (i / 1.25)
          jQuery(document).find('#img-' + i).css({
            'animation-duration': this.speed + 's',
            'animation-name': 'float'
          });
        }
      });
    });
                      
    var parallax = jQuery(document).find('#scene').parallax();
    
    for (var i = 1; i < 6; i++) {
      twinkleLoop(i);
    };
    
    function twinkleLoop(i) {
      var duration = ((Math.random() * 5) + 3)
    
      duration = duration - ((495 - this.speed)/100)
      twinkle(i, duration)
    
      setTimeout(function() {
        twinkleLoop(i)
      }, duration * 1000);
    }
    
    function twinkle(id, duration) {
      var top = (Math.floor(Math.random() * 45) + 0) + '%';
      var left = (Math.floor(Math.random() * 45) + 0) + '%';
    
      jQuery(document).find('#speck' + id).remove();
      jQuery(document).find('#specks').append("<div class='speck' style='max-height:100vh;overflow: hidden' id='speck" + id + "'></div>")
      jQuery(document).find('#speck' + id).css({
        'top': top,
        'left': left,
        'animation-duration': duration + 's',
        'animation-timing-function': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
        'animation-name': 'twinkle',
      })
    }
  
  }
}
