import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params } from '../../../node_modules/@angular/router';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { BlockingProxy } from 'blocking-proxy';
declare var $:any;
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  allArtists : any;
  allSitesApp:any;
  musicofartists:any;
  musicsofartist :any;
  backgroundImg:any;
  photo:any;
  name:any;
  sanitizer:any;
  angular:any;
  icon: any;
  scope:any;
  photos :any=[];
  musicstest:any=[];
  allArtistsMusics:any;
 counterSlide:any;
 runSlider:any;
 numSlider:any;
 nextSlider:any;
 testNumber:any;
 pht:any;
// M:any;
ajab:any;
options:any={};
counterTimerItem:any;
runningNow:any;
sldierItems:any;
searchResult:any;
searchResultr:any;
searchArray:any= [];
searchContentBox:any= [];
wordResult:any;
successMessage:any;
newForm:any;
loggedUser:any;
menuToggle:boolean;
  // constructor(private _httpService: HttpService,private _sanitizer: DomSanitizer) {
    // const word = (document.getElementsByTagName("H")[0].getAttribute("class");

    // this.backgroundImg = this._sanitizer.bypassSecurityTrustStyle('url(+ ${word} +)');
  
  //  }  

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
  this.newForm = {
    artistSearcher:""
  }

  if(this.newForm.artistSearcher.length === 0) {
    $('#showContent').addClass('hide');
    $('#cancelBtn').addClass('hide');

    
  
  }


  


 

 


  
   

 
  this.getAllArtists();
  this.getAllSites();
  this.getmusicinartist();
  // this.showSliderItems();
  this.testNumber = 0;
  this.pht = document.getElementById("niceImg");
 
  this.ajab = document.getElementById("testIda");
  this.runnerMethod();
  this.getuser();
 

// setInterval(function(){
//   this.nextSlide();
 
// },4000);

// this.runnerSliderbySec();


  

}




// $(document).bind('mousedown.popup', ClickOutsideCheck);


getuser(){
  this._httpService.getUserFromDashboard().subscribe(data=>{
    this.loggedUser =  data;

  })
}

 


  getAllSites() {
    this._httpService.getSites().subscribe(data=>{    
    this.allSitesApp = data    
    console.log("baba neshoon bede", this.allSitesApp);
      // this.allArtists = this.allArtists.slice(3,4);
    })
  }
  getAllArtists() {
    $('#showContent').addClass('hide');
    $('#cancelBtn').addClass('hide');
    this._httpService.getArtists().subscribe(data=>{    
    this.allArtists = data
    this.runnerSliderbySec(this.allArtists,this.allArtists.length % 4,this.counterTimerItem);
    
    // $("#slideshowArtist > div:first").addClass('hide');
   

      
      
    
    
      
      
     
    

    
    // $('.todaySlider').hide();
    for (var i = 0; i  < this.allArtists.length; i++) {
      
      // var num = this.allArtists.length;
      // if(i < num) {

      // setInterval(function(){
      //   console.log("andazeh",num);
        
      //     console.log("number", i);

      //     $('.slider-'+i).removeClass('hide');

          
          
      //     i++;
        
      // },5000*(i+1))

      

      

      // setInterval(function(){
      //   console.log("andazeh",num); 
      //     console.log("number", i);
      //     $('.slider-'+i).addClass('hide')
      //     // .fadeIn(2000)
      //     // $('.slider-'+i).pause(3000)
      //     // .play()
      //     // .fadeOut(1000);
      //     // $('.slider-'+i).addClass('hide');
      //     i += 1;
      // },4000)
    // }


      // setInterval(function(){
      //   console.log("andazeh",num);
      //   if(i < num) {
      //     console.log("number", i);
      //     $('.slider-'+i).addClass('hide');
      //     i += 1;
         

         
      //   }else{
      //     i = 0;
      //   }

        
      // },6000*(i+1))

      // setInterval(function(){
      //   $('.slider-'+i).fadeIn(1000);
      // },4000)
      // setInterval(function(){
      //   $('.slider-'+i).fadeOut(1000);
      // },5000)
      
      
      // setInterval(function(){

     
      // setInterval(function(){
        this.artistfinder(this.allArtists,this.allArtists[i], i);
      // },5000)
      // })
      
      
      this.musicofartists = this.allArtists[i];
      this.musicsofartist = this.musicofartists.musics;
      this.musicstest.push(this.musicsofartist );
      
    }

   
   

  //   for (var j = 0; j  < this.allArtists.length; j++) {
      
  //     var numt = this.allArtists.length;
  //     if(j < numt) {

  //     setInterval(function(){
  //       console.log("andazeh",numt);
        
  //         console.log("number", j);

  //         $('.slider-'+j).addClass('hide');

          
          
  //         i++;
        
  //     },7000*(i+1))

  //   }

  // }
    console.log("artist ahang",this.musicstest);
    
      // this.allArtists = this.allArtists.slice(3,4);
    })
  }  
  // getallMusics(artist_id) {
  //   this._httpService.getAllMusicsOfArtist(artist_id).subscribe(data=>{
  //     this.allArtistsMusics = data
  //   })
  // }

  
  getFunction(numberA) {
    
    return "url('assets/uploads/images/" + numberA.artistImage + "')";    
  }

  getFunctionSite(numberS) {
    return "url('assets/uploads/images/" + numberS.musicsCover + "')";  
  }
  getFunctionMusic(numberM) {
    // for (var i = 0; i < this.musicstest.length; i++) {
    //   var num = this.musicstest[i];
    //   this.photos.push(num);
    //   console.log("yoho",num);
    // }
    return "url('./assets/uploads/images/" + numberM.musicImage + "')";   
  }
  
  getFunctionVideoSite(numberV) {
    return "url('./assets/uploads/images/" + numberV.videoCover + "')";
  }

  getmusicinartist() {
    console.log("test konim bebein", this.musicstest);
    return this.musicstest;
    
  }
  getFunctionVideo(numberVS){
    return "url('./assets/uploads/images/" + numberVS.videosCover + "')";
  }
  getFunctionMusicSite(numberMS){
    return "url('./assets/uploads/images/" + numberMS.musicsCover + "')";
  }
  getFunctionArtistSite(numberAS){
    return "url('./assets/uploads/images/" + numberAS.siteLogo + "')";
  }

  removeArtist(artist) {
    return this._httpService.removeArtist(artist._id).subscribe(data=> {
      console.log(data, "removed shod artist")
      this.getAllArtists();
    })
  }

  nextSlide(){
   
    
    
    this.nextSlider = true;
    if(!this.nextSlider) {
     return false;
    }else {
      this.testNumber += 1;
      
      this.counterSlide = $( '.slideshow-container').css("margin-left");
      var integer = parseInt(this.counterSlide);
      var offsetNumber =  $( '.slideshow-container').css("width");
      var integerOffser = parseInt(offsetNumber)/3;
      var numberSlider = integer - integerOffser;
      numberSlider.toString();
      $( '.slideshow-container').css("transition",'2s');
      $( '.slideshow-container').css("margin-left", numberSlider);
      // $('.next').fadeIn(10000);
     
      // $('.pre').fadeIn(10000);
    }
    
  }
  preSlide() {
   
    this.runSlider = true;
    if(!this.runSlider) {
      return false;
    }else {
      this.testNumber -= 1;
      // $('.next').hide();
      // $('.pre').hide();
      var BackcounterSlide = $( '.slideshow-container').css("margin-left");
    $( '.slideshow-container').css("transition",'2s');
    var integerBack = parseInt(BackcounterSlide);
    var offsetNumberBack =  $( '.slideshow-container').css("width");
    var integerOffserBack = parseInt(offsetNumberBack)/3;
    var numberSliderBack = integerBack + integerOffserBack;
    numberSliderBack.toString();
    
    $( '.slideshow-container').css("margin-left", numberSliderBack);
    // $('.next').fadeIn(5000);
    // $('.pre').fadeIn(5000);

    }
    

    

  //   // this.runSlider = true;
  //   var BackcounterSlide = $( '.slideshow-container').css("margin-left");
  //   var integerBack = parseInt(BackcounterSlide, 10);

  //   var numberSliderBack = integerBack + 100;
  //   numberSliderBack.toString();
  //   $( '.slideshow-container').css("margin-left", numberSliderBack+'%');

  

  }

  getFuncHide(array) {

    if(array.length >= 3) {
      return 'block';
    }else {
      return 'none';
    }

  }

  artistfinder(array,parame,number) {
    $('.sample').addClass('hide');
    for(var i= 0; i < array.length; i++) {
      $('.slider-'+i).addClass('hide');
      if(i === number) {
        $('.slider').css('margin-left','-25%')
        $('.slider-'+number).removeClass('hide');
        $('.slider-'+number).fadeIn(200);
        // $('.slider-'+number).fadeOut(6000);
        // $('.slider-'+i+1).fadeIn(8000);
        // $('.s-'+number).addClass('slideActive');
      }
      // else {
      //   // $('.slider-'+i).hide();
      //   // $('.s-'+number).removeClass('slideActive');
      //   // $('.s-'+i).css('border','none')
      // }

      
    }
    // setInterval(function(){
    //   $('.slider-'+number).hide();
      
    // // $('.slider-'+number+1).removeClass('hide');
    // },10000)
    // setInterval(function(){
    //   // $('.s-'+number+1).addClass('slideActive');
    //   $('.s-'+number+1).show();
    //   $('.s-'+number+1).fadeIn();
    //   // alert("test shod");
    // },12000)
   
    


    
   this.ajab.innerHtml = "ali";
    this.pht.src = 'assets/uploads/images/'+ parame.artistImage;
    $('div#eightyper').css('background-image','url("assets/uploads/images/'+parame.artistImage+'")')
  }



  counterItemFor(number){
    if(!number) {
      number = 0;
    }else {
      number += 1;
    }

    return number;
  }

  runnerSliderbySec(array,count,timerItem){


    
   
    function testSLidershow() {

      var j = 0;
      var i = 1;
        setInterval(function(){
          var numberFInder =$('.s-'+0).css('width');
          timerItem += 1;
          // alert(i);
          
          // $('.slider-'+i).removeClass('hide');
          $('.s-'+0).css({'margin-left':'-'+parseInt(numberFInder)*i  , 'transition':(5)+'s'});
          i++;

          if(i > array.length - 4) {
            i=0;
          }
        },5000*i)
      }


      function testSLidershowEven() {
        var i = 1;
       
          setInterval(function(){
            // $('.slider-'+i).removeClass('hide');
            var numberFInderr =$('.s-'+0).css('width');
            timerItem += 1;
            // alert(i);
            $('.s-'+i).addClass('activeb');

            $('.s-'+0).css({'margin-left':'-'+parseInt(numberFInderr)*i  , 'transition':(5)+'s'});
            i++;
            var n = i;
            if(i > array.length - 4) {
            
                i=0;
                


              
              

            }
          },5000*i)
        }

    if(array.length <= 4) {

      return false;

    }else if(array.length % 2 != 0) {
  
      setInterval(function(){

        testSLidershow();
        
      },20000);

    }else {
  
      setInterval(function(){

        testSLidershowEven();
        
      },20000);

    }
     
  }  

  newSliderst(number){
    $('.slider-'+number).removeClass('hide');
    number++;
    alert(number);
  }


  showSliderItems(){
    this._httpService.getArtists().subscribe(data=>{
     
      this.sldierItems = data;
      var numberCounter = 0;
      
      $.each(this.sldierItems,function( index, value ) {

       





        
        function myTest8() {  
          numberCounter +=1;
          // alert(numberCounter);
          $('#slideshowArtist .slider-'+ index)
          .fadeIn(2000)
          .removeClass('hide')
          .addClass('active')
          .appendTo('#slideshowArtist');
        }    
        setTimeout(function(){
          myTest8();
        },(index)*5000)


        function myTest6() {
          
          
          $('#slideshowArtist .slider-'+ index)
          .fadeOut(1000)
          .removeClass('active')
          .addClass('noactive')
          .addClass('hide')
          .appendTo('#slideshowArtist'); 
        } 

        setTimeout(function(){
          
          myTest6();
        },(index)*5000+ 4000);

       





        
        
      
    })

    if(numberCounter === this.sldierItems.length) {
      alert("done");
    }

    
    
    })


  }


  newMethd(item,array){
    
    
    function myTest8() {  
          
            $('#slideshowArtist .slider-'+ item)
            // .fadeIn(2000)
            .removeClass('hide')
            .addClass('active')
            .appendTo('#slideshowArtist');
          }    
          setTimeout(function(){
            myTest8();
          },(item)*5000)
  
  
          function myTest6() {
            
            
            $('#slideshowArtist .slider-'+ item)
            // .fadeOut(1000)
            .removeClass('active')
            .addClass('noactive')
            .addClass('hide')
            .appendTo('#slideshowArtist'); 
          } 
  
          setTimeout(function(){
            
            myTest6();
          },(item)*5000+ 4000);
  }

  runnerMethod(){
    console.log($('#slideshowArtist > div:gt(0)'),"in chiyeh neshoon bede")
    $('#slideshowArtist > div:first').addClass('bro');
    $('div.todaySlider.slider-0.hide').addClass('bro');
setInterval(function() { 
  $('#slideshowArtist > div:first')
  // .fadeIn(1000)
    .removeClass('hide')
    
    // .fadeOut(1000)
    .addClass('hide')
    .next()
    // .fadeIn(1000)
    .removeClass('hide')
    .end()
    .appendTo('#slideshowArtist');
},  5000);
  }


  showArtst(item){
    this.searchArray =[];
   $('#allartists').hide();
   $('#searchResult').removeClass('hide');
   this.searchResult = this.allArtists.filter(artist => {
    
    if(artist.artistName[0] === item || artist.artistName[0] === item.toUpperCase()) {
      this.searchArray.push(artist);
      if(this.searchArray.length ===1){
        this.successMessage = this.searchArray.length + " Artist founds that start with " + item.toUpperCase();
      }else {
        this.successMessage = this.searchArray.length +" Artists found that start with " + item.toUpperCase();
      }
      
      // alert(this.wordResult);
    }else {
      // this.wordResult=""
      // this.searchArray.push("no result");
      this.wordResult = "No Artists founds with " + item.toUpperCase();
    }

    // for (var i = 0; i < this.allArtists.length; i++) {
    //   if(this.allArtists[i].artistName[0] === item || this.allArtists[i].artistName[0] === item.toUpperCase()) {
    //     alert(this.allArtists[i].artistName);
    //   }
    // }
    
    //  if(artist.artistName)
    //  if((artist.artistName).contains(item)=== true) {
    //   alert('nice');
    //  }

    // $(".testi:contains('Mahsa')")
    
    // .appendTo('#searchResult')
  
   
   
   

  


  })

  this.searchResult

}

searchArtist(item){
  this.searchArray =[];
  
  $('#allartists').hide();
  $('#searchResult').removeClass('hide');
  this.searchResult = this.allArtists.filter(artist => {
  
    if((artist.artistName.toLowerCase()).includes(item)) {
      this.searchArray.push(artist);
      // alert((artist.artistName).includes(item));
    }else {
      this.wordResult = " No Artists found with " + item.toUpperCase();
    }
    this.newForm = {
      artistSearcher: ""
    }

  
   
  //  .appendTo('#searchResult')

  
  
  

 


 })

}

  showAll(){
    this.searchArray =[];
    this.wordResult = "";
    $('#allartists').show();
    // $('#searchResult').addClass('hide');
  }


  testjadid(){
    // alert(this.newForm.artistSearcher);

   

    if(this.newForm.artistSearcher.length > 0) {
      this.searchArtist(this.newForm.artistSearcher.toLowerCase());
      $('#showContent').addClass('hide');
      $('#cancelBtn').addClass('hide');
    }else {
      this.showAll();
    }
    

  }

  testArt(){
    // $("#showContent'").blur(function(){
    //   $(this).addClass('hide');
    // });
    $('#showContent').removeClass('hide');
    
    $('#cancelBtn').removeClass('hide');
    $('#showContentMobile').removeClass('hide');
    $('#showContentIpad').removeClass('hide');
    
    this.searchContentBox =[];
  
  // $('#allartists').hide();
  // $('#searchResult').removeClass('hide');
  this.searchResultr = this.allArtists.filter(artist => {
  
    if((artist.artistName.toLowerCase()).includes(this.newForm.artistSearcher.toLowerCase())) {
      this.searchContentBox.push(artist);
      // alert((artist.artistName).includes(item));
    }


  })

}

LoggeduserChecker(){
  if(!this.loggedUser) {
    return 'none';
  }
  if(this.loggedUser._id === '5bb547178dc9f45c1414a077') {
    return 'block';
  }else {
    return 'none';
  }
}

clearKon(){
  $('#showContent').addClass('hide');
  this.newForm.artistSearcher = "";
}


showMenu(){
  this.menuToggle = !this.menuToggle;
  if(this.menuToggle) {
    $('#nav-mobileM').removeClass('hide');
  }else {
    $('#nav-mobileM').addClass('hide');
  }


  
}


 
    
  
  

  

   
}
