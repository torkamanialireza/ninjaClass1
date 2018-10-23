import { Component, OnInit, Input } from '@angular/core';
import { HttpModule} from '@angular/http';
import { HttpService } from './../http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '../../../node_modules/@angular/router';
import { ArtistComponent } from '../artist/artist.component';
import * as bcrypt from 'bcryptjs'
// import { $$ } from 'protractor';
declare var $: any;
@Component({
  selector: 'app-single-music',
  templateUrl: './single-music.component.html',
  styleUrls: ['./single-music.component.css']
})


export class SingleMusicComponent implements OnInit {
  
  @Input()
  schrolling:any;
  node:any;
  angular:any;
  javablast:any;
  javab:any;
  testParam:any;
  testkonItem:any;
  lyricArray:any;
  finishedItem:any;
  req:any;
  music : any;
  musicTest : any;
  player:any;
  dataMusic :any;
  counter:any;
  numberOfPlay:any;
  content:any;
  cover:any;
  endArtist:any;
  endMusic:any;
  artistEnd:any;
  loopAudio:any;
  testmod:any;
  seekbar :any;
  archiveFavor:any;
  buttondes:any;
  newItem:any;
  checkerBtn:any;
  archiveMusicMember:any;
  archiveMusicMemberItem:any;
  resultItem:any;
  newComment:any;
  errorsValidation=[];
  loggedUser:any;
  newObj:any;
  lyricFrame:any;
  niceLyric:any;
  currenTimeFrame:any;
 durariontime:any;
 seekNumber:any;
 finalNumberMusic:any
 logUser: any;
 allusers:any;
 loading:boolean;
 compsync:any;
 emailuser:any;

  constructor(private _httpService: HttpService, private _route:ActivatedRoute, private _router:Router) { }
  
  ngOnInit() {
    // setInterval(console.log("this is test"), 300000000);
    // setInterval(console.log("this is test2"), 40000000000);
    // setInterval(console.log("this is test3"), 50000000000);
    // setInterval(console.log("this is test4"), 60000000000);
    this.newComment = {
      name: "",
      comment: "",
    }
    this.logUser = {
      email:"",
      password:""
    }

    




  // if(navigator.platform==='iPhone') {
  //   $('#canvas').hide();
  // }
this.getTimerMusic();
    
    // this.finishLyric();
    this.loopAudio = document.getElementById('loop_unloop');
    this.checkerBtn = document.getElementById('add_notadd');
    this.player = document.getElementById("audioPlayer");
    this.seekbar = document.getElementById('testranger');
    // this.player.play();
    // this.testkonItem = document.getElementById('testkon');
    this.currenTimeFrame = document.getElementById('currentTime');
    // this.animationFrame();
    console.log("this player", this.player);
    // this.speedFrame();
    // this.functionFade();
    // this.fucntionTest();
    // this.animationFrame();
    this._route.params.subscribe(data=>{
      console.log("i am first data check kon ino ebebin chie",data);
      this.getMusic(data['artist_id'],data['id']);      
    }) 
    this._route.params.subscribe(dataAr=>{
      this.getArtist(dataAr['artist_id']);
      this.player.onended = () => {    
        this._httpService.getSingleArtist(dataAr['artist_id']).subscribe(datamEnd=>{
         this.artistEnd = datamEnd;
          console.log("hoora yeah oh yeah",this.artistEnd.musics);
          this.nextMusicS(this.artistEnd.musics, this.player.src);
        })   
      }
      console.log("data artist eeeee", dataAr); 
    }) 
    this.getUserfromdashbaordN();
  }

  // schrollDown(){
    // $("#musicsPanel").animate({  = 600: 25 }, 50);
    // this.schrolling = document.getElementById("#musicsPanel");
    // this.schrolling. = 600 = 600;
    // return this.schrolling;

    // return elmnt;
  //   $("#musicsPanel").scroll(function(){
  //     $("#musicsPanel").css( 'scroll-behavior', '[ auto | smooth ]');
  // });
    // jQuery("#musicsPanel"). = 600(jQuery("#musicsPanel")[0].scrollHeight);
  // }

  getTimerMusic(){

  
    setInterval(function(){
      this.seekNumber = this.player.currentTime;
      return this.seekNumber;
    },1000);
    

  }



  getUserfromdashbaordN() {
   

  this._httpService.getUserFromDashboard().subscribe(data=>{
    
        this._httpService.getSingleUser(data['_id']).subscribe(data=>{
          this.loggedUser=data;
      console.log(data,"this is logged user");
      this.loggedUser = data;
    })


  })
}





  addtoUser(item){


    
    if(!this.loggedUser){
      alert("you have to login");
    }else {



    this._httpService.getUserFromDashboard().subscribe(data=>{
    
      this._httpService.getSingleUser(data['_id']).subscribe(data=>{
        this.loggedUser=data;
        data['members'].push(item);
        this._httpService.editUser(data['_id'],{'members':data['members']}).subscribe(data=>{
          console.log(data);
          // this.getArtist(id);
      })
    })
    
  })
}

  
    

  }

  removeFromUser(item){
    if(!this.loggedUser){
      alert("you have to login");
    }else {
    // this._httpService.getUserFromDashboard().subscribe(data=>{
      this._httpService.getSingleUser(this.loggedUser._id).subscribe(data=> {
        
        // data['members'].pop(item);
        this._httpService.editUser(this.loggedUser._id,{'members':data['members']}).subscribe(data=>{
          console.log(data);
        })

        this.getUserfromdashbaordN();


      })
      
    // })
  }

}

  
  // fucntionTest(){
  //   this.player.play();
  //   if(this.player.play()) {
  //     setInterval(function(){
  //       $("#yesbaby").append("<div class='item' id='" + this.lyricFrame + "'>This is it</div>");
  //     },1000)         
  //   } 
  // }
// functionHelp(lyric){
// var lyricFadeIn = this.animationFrame(lyric.fadeIn);
// var lyricFadeOut = this.animationFrame(lyric.fadeOut);
// // $(this).css('display','none')
// var testItem = $('.'+lyric._id).selector;
// setInterval(function() { 
//   $(testItem)
//     .removeClass('hide')
//     .addClass('show')
//     .fadeIn(1000)
//     // .hide(22000)
//     // .fadeOut(5300)
//     // .pause()
//     // .next()
//     // .end()  
//     .appendTo('#slideshow');  
// },  lyricFadeIn* 1000);
// setInterval(function() { 
//   // console.log("animation tme", this.animationFrame('00:52:00'));
//   // $('.test'+i+'')
//   $('.lyric')
//     // .next()
//     // .fadeIn(1000)
//     // .hide(22000)
//     .fadeOut(1000)
//     .hide()
//     .addClass('hide')
//     .appendTo('#slideshow');  
// },  lyricFadeOut * 1000);
// return 'red';
// }
  functionFade(array) {
    console.log("hellooooo animation tme", array);
    // $("#slideshow > div:gt(0)").hide();
    // $("#slideshow > div:first").hide();
  }
  // speedFrame() {
  //   console.log("timeo neshoon bede", this.animationFrame('00:53:00')*1000);
  //   // setInterval(this.functionFade(),this.animationFrame('00:00:10')*1000);
  // }
 animationFrame(hms:string){
    console.log("this current time", this.player.currentTime, "math",Math.floor(this.player.currentTime));
    // hms = '02:53:33';   // your input string
    var a = hms.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60  + (+a[1]) + (+a[2]); 
    console.log(seconds,"saniaro neshoon bede");
    // if(Math.floor(this.player.currentTime) < seconds ) {
    //   this.lyricFrame = "neww sample";
    // }else {
    //   this.lyricFrame = "dorost shodesh yeah sample";
    // }
    // innerHTML
    // while(this.currenTimeFrame  === '<span _ngcontent-c2="" id="currentTime">0:40</span>'){
    //   this.lyricFrame = "neww sample";   
    // }
    return seconds;
  }

  testFindLyric(time,past,lyric,item,numberItem,nextItem){
  //  $('.ls-'+numberItem).addClass('hide');
    // if(numberItem === 0) {


    //   this.niceLyric = lyric;
    // }

    // do {
    //     $('.ls-'+numberItem).removeClass('hide');
    //     $('.ls-'+numberItem).show();
    //     $('.ls-'+numberItem).css('color','white');
    //     return 'black';
    // }


    if(this.player.currentTime*1000 >= time*1000) {
      // var durariontime=0;
        // $('.ls-'+numberItem+-1).css('color','blue');
        
        this.finalNumberMusic= numberItem+1
        $('.ls-'+numberItem).removeClass('hide');
        $('.ls-'+numberItem).show();
        
        $('.ls-'+numberItem).css('color','white');
        this.niceLyric = lyric;
        $('.ls-'+this.finalNumberMusic).css('color','black');
        
        return 'black';
      

    }
    
    // if(this.player.currentTime *1000 > item.lyrics[numberItem-1].fadeOut*1000) {
    //   // var durariontime=0;
    //     // $('.ls-'+numberItem+-1).css('color','blue');
    //     // this.niceLyric = nextItem.content;
        
    //     $('.ls-'+numberItem).removeClass('hide');
    //     $('.ls-'+numberItem).show();
    //     $('.ls-'+numberItem).css('color','white');
      
        
    //     return 'black';
      

    if(time*1000 <(this.player.currentTime *1000)) {
      return 'blue';
    }


    
    // if (this.player.currentTime *1000 < nextItem.fadeIn*1000 ) {

     
      
    //   return 'blue';
    

    // }
    

    
      
      

    
    // }else if(this.player.currentTime*1000 < item.lyrics[numberItem].fadeOut*1000){
    //   this.niceLyric = nextItem.content;
    //   $('.ly-'+numberItem).css('color','green');
    //   return 'black';
    
    
    // if(this.player.currentTime*1000 > past*1000 && this.player.currentTime*1000 < item.lyrics[numberItem].fadeIn*1000 ) {
    //   this.niceLyric = '';
    //   return 'blue';
    // }
    
    // else {
    //   // this.niceLyric = lyric;
    //   return 'black';
    // }
    // if(this.player.currentTime > past*1000 ) {
    //   this.niceLyric = item.lyrics[numberItem+1].content;
    //   return 'black';
    // }

  }


  getTimer(item,zene) {
    setInterval(function(){ 
      // for (var i = 0; i< zene.lyrics.length; i++) {
        if(zene.lyrics[0].fadeIn === item.currentTime){
          console.log("i am matched", zene.lyrics[0].fadeIn ,item.currentTime)
        }
         

      // }
      
       
  }, 500);
  }

  getItemforLyric(){
    alert('nice');
  }

  getMusic(artist_id,id) {
    // $("#sliders2").hide();
    this._httpService.getSingleMusic(artist_id,id).subscribe(datam=>{
      this.music = datam;
     


      function newget(){
        this.getTimerMusic();
      }
    

      $('#testranger').click(function(){
        $('.ly-').css('color','black');

        this.niceLyric = "";
        newget();
        

      })

      //   // this.getItemforLyric();
       
       


      //  $('#sliders').hide();

       
      //  $("#sliders2").show();
      //  $("#sliders2 > div:first").hide();
       
      
        
      // })
      // $('#testranger').click(function(){

        // this.getItemforLyric();

        // alert(lyric);

        // if(this.player.currentTime*1000 >= time*1000 )  {
        //   this.niceLyric = item.lyrics[numberItem-2].content;
        //   return 'blue';
        // }
        // if(this.player.currentTime*1000 > past*1000 && this.player.currentTime*1000 < item.lyrics[numberItem].fadeIn*1000 ) {
        //   this.niceLyric = '';
        //   return 'blue';
        // }
       
       


      //  $('#sliders').hide();

       
      //  $("#sliders2").show();
      //  $("#sliders2 > div:first").hide();

       
       
      
        
      // })

      $("#sliders > div:first").hide();
      $.each(this.music.lyrics,function( index, value ) {

        
        
        
        // this.setInterval(function() { 
        //   this.removeClass('hide')
        //   // .addClass('show')
        //   .fadeIn(1000)
        //   // .alert(index,"last")
        //   .appendTo('#sliders');
        // },2000);
        // setInterval(function(){
        //   alert('ali')
        // }, this.animationFrame(value.fadeIn)*1000);

        function numberTimeFadeIn(){
          var agIn= value.fadeIn.split(':');
          var secondsIn = (+agIn[0]) * 60  + (+agIn[1]) + (+agIn[2]); 
          return secondsIn;

        }
        function numberTimeFadeOut(){
          var agOut= value.fadeOut.split(':');
          var secondsOut= (+agOut[0]) * 60  + (+agOut[1]) + (+agOut[2]); 
          return secondsOut;
        }


        

        function myTest() {       
          $('#sliders #'+ index)
          .removeClass('hide')
          .addClass('active')
          .fadeIn(1000)
          .appendTo('#sliders');
        }    


        setTimeout(function(){
          
          myTest();
          // $('#sliders').innerHTML = value.content;
          // alert(value.content);
          
        // },numberTimeFadeIn()*1000)
        },value.fadeIn*1000)


        function myTest2() {
          
          
          $('#sliders #'+ index)
          .fadeOut(1000)
          .removeClass('active')
          .addClass('noactive')
          // .addClass('hide')
          .hide()
          .end()
          .pause()
          .appendTo('#sliders'); 
        } 

        setTimeout(function(){
          
          myTest2();
          // $('#sliders').innerHTML = value.content;
          // alert(value.content);
          
        // },(numberTimeFadeOut()*1000))
        },value.fadeOut*1000)




        
      });

      

      // for (var i = 0; i < this.music.lyrics.length; i++ ) {
      //   var itemLy = this.music.lyrics[i]; 
      //   // $('#sliders').innerHTML = ('<div>ali</div>')
      //   var ii = i;
      //   var myVar=setInterval(function() { 
      //     $('.test'+i).each(i) 
                
      //       .removeClass('hide')
      //       // .addClass('show')
      //       .fadeIn(1000)
      //       .appendTo('#sliders');
      //   },  this.animationFrame(this.music.lyrics[i].fadeIn)*1000);
      //   setInterval(function() { 
      //     $('.test'+i).each(i) 
      //       .fadeOut(1000)
      //       // .removeClass('show')
      //       .addClass('noactive')
      //       .hide()
      //       .end()
      //       .pause()
      //       .appendTo('#sliders'); 
      //   },  this.animationFrame(this.music.lyrics[i].fadeOut)*1000);

      //   setTimeout(() => {
      //     clearInterval(myVar);
      //   }, this.animationFrame(this.music.lyrics[i].fadeOut)*1000);



        
       


      // }
      
      console.log("iam data",datam['followers']);
      // this.functionFade(this.music);
      // this.getCounter(this.music['followers']);
      console.log("idiye artist in hast",this.music);
      console.log(this.testmod,"/////im here inja too bare dovom");
      this.getCounter(this.music['playerCounter']);
      console.log("this coutner", this.counter);
      this._httpService.editMusic(artist_id,id, {"playerCounter":this.counter}).subscribe(data=>{
        console.log(data);        
      }) 
    })
  }
  getArtist(artist_id) {
    
    this._httpService.getSingleArtist(artist_id).subscribe(dataArtist=> {
      this.dataMusic = dataArtist;

      if(this.dataMusic.musics.length > 3) {
        $('#musicsPanel').addClass('scrollul');

        const container = document.querySelector('#musicsPanel');
        container.scrollTop = 600

        
        
        
      }
     

      

    
      
      this.testmod = this.dataMusic;
      console.log(dataArtist,"/////im here");
      console.log(this.music, "chekc kon vaseyeh add be playercounting");
      
       // if(this.dataMusic.members.indexOf(this.music._id) !== -1) {


            // }
    

      // ['joe', 'jane', 'mary'].includes('jane');
      
      this.dataMusic.members;
      console.log(this.music, "ahang koja rafti");      
          if (!this.dataMusic.members.length) {
            this.javab = "nadareh";
            // $('#testkon').innerHTML = "can add"
          }else {  
           
          
           

            // this.testFuncforfavor(this.dataMusic);     
            console.log("favorite mohtava darad");
            for (var i = 0 ; i < this.dataMusic.members.length; i++) {

              
              this.archiveMusicMemberItem = this.dataMusic.members[i];
              console.log(this.music.songName,"esme ahang");
              if(this.dataMusic.members[i]._id === this.music._id) {
              
                console.log("cant add");
                this.javab = "cantadd";
                // this.musicTest = this.dataMusic.members[i];
              
              }else {
                this.javab = "can add";
                // $('#testkon').innerHTML = "can add"
                console.log("can add");
               
              }
              
            }
        }
      console.log(this.dataMusic.members.indexOf(this.music), "index arrayahe");
      for (var i = 0; i < this.dataMusic.musics.length; i++) {
        if (this.dataMusic.musics[i]._id === this.music._id) {
          this.dataMusic.musics[i]= this.music
          this._httpService.editArtist(artist_id, {'musics':this.dataMusic.musics}).subscribe(dataMA=>{
            console.log(dataMA);
          })
        }
      }  
    })
  }
  nextMusicS(array,word) {
  console.log(array,"didamesh")
  // var newword= word.split('http://localhost:8000/assets/uploads/medias/');
  var newword= word.split('assets/uploads/medias/')
  var joinword= newword.join('');
  var newWordt = joinword.split('%20');
  var akharWord = newWordt.join(' ');

    for (var i=0; i < array.length; i++) {   
      // if(akharWord == array[i].songCover){
        if(this.music._id == array[i]._id){
        console.log(i,"in indexeh");       
        var sum = i +1;
        if(i === array.length -1) {
          window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + array[0]._id) ;
        }     
        // i++;
      }else{
        console.log("in indexenist");
      }
      // console.log("/assets/uploads/medias/" + array[i].songCover)
    }
    window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + array[sum]._id) ;
  }
  preMusicS(array,word) {
    console.log("didamesh")
    // var newword= word.split('http://localhost:8000/assets/uploads/medias/');
    var newword= word.split('assets/uploads/medias/');
  var joinword= newword.join('');
  var newWordt = joinword.split('%20');
  var akharWord = newWordt.join(' ');
    for (var i = array.length-1; i >= 0; i--) {    
      // if(akharWord == array[i].songCover){
        if(this.music._id == array[i]._id){
        console.log(i,"in indexeh");        
        var sum = i -1;
        if(i === 0) {
          window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + array[array.length -1]._id) ;
        }    
        // i++;
      }else{
        console.log("in indexenist");
      }   
      // console.log("/assets/uploads/medias/" + array[i].songCover)
    }
    window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + array[sum]._id) ;    
  }
  myFunction(music,song) {  
    if(music._id === song._id) {
     
      return 'red';
    }else {
      return 'black';
    } 
  }
  myFunctionB(music,song,number) {   
    if(music._id === song._id) {
      $('.song-'+number).addClass('activesong');
      
      // return 'white';
    }else {
      $('.song-'+number).addClass('notplayed');
      // return '#00000012';
    }  
  }
  getCounter(vistedNumber) {
    console.log("got here pat", vistedNumber);  
    // if(vistedNumber < 1) {
    //   console.log(vistedNumber,"if counter is not exist")
    //   vistedNumber = 0;
    //   this.counter = vistedNumber;
    // }else {
    console.log(vistedNumber,"if counter is  exist")
    vistedNumber += 1;
    this.counter = vistedNumber;
    // }
  return this.counter;
  }
  LoopUnloop() {    
    console.log("looping");
    this.player.loop = !this.player.loop; 
    if (this.player.loop) {
      this.loopAudio.innerHTML = '<i style="font-size:40px; margin:60px auto;color:red" class="material-icons" >loop</i>';  
      if(this.player.play() && this.seekbar === 0) {
        console.log("reapet shod");
        
      }else {
        console.log("reapet nashod");
      }
    }else {
        this.loopAudio.innerHTML = '<i style="font-size:40px; margin:60px auto; color:beige" class="material-icons">loop</i>';
    }
}
// my_effect(i) {	
//   $(i).fadeOut('slow')
//   $(i).fadeIn('slow') 
//   setInterval(this.my_effect(i), 2000);
// }
addtoFavor(id,word) {
  console.log("heelooooo",this.dataMusic);
  console.log("yes", id,word);
  this._httpService.getSingleArtist(id).subscribe(data=> {
    this.archiveFavor = data;
    for (var i = 0; i < this.archiveFavor.members.length; i++ ){
      if(this.archiveFavor.members[i]._id === word._id) {
        alert('add nemitooneh beshe')
        return false;      
      }  
    }
    alert('add mitooneh beshe')
    this.archiveFavor.members.push(word); 
    this._httpService.editArtist(id, {'members':this.archiveFavor.members}).subscribe(dataFavor=> {
      console.log("dataye favorite shode", dataFavor);
      this.getArtist(id);
    })   
  })
  // this._httpService.getUserFromDashboard().subscribe(data=> {
  //   this.archiveFavor = data;
  //   for (var i = 0; i < this.archiveFavor.favorMusics.length; i++ ){
  //     if(this.archiveFavor.favorMusics[i]._id === word._id) {
  //       alert('add nemitooneh beshe')
  //       return false;      
  //     }  
  //   }
  //   alert('add mitooneh beshe')
  //   // this.archiveFavor.favorMusics.push(word); 
  //   this.archiveFavor.favorMusics.push(word); 
  //   this._httpService.editUser(this.archiveFavor._id,{'favorMusics':this.archiveFavor.favorMusics}).subscribe(data=>{
  //     // this.getUserFRomFuns(this.archiveFavor);
  //     this.getUserfromdashbaord();
  //     console.log(data,"for user favorite in session");
      
  //   })
   
  
  // })

}
// addtoFavor(id,word) {
//   this.archiveFavor.members.push(word);
//     this._httpService.editArtist(id, {'members':this.archiveFavor.members}).subscribe(dataFavor=> {
//       console.log("dataye favorite shode", dataFavor);
//       this.getArtist(id);
//     })  
//   }
removeFromFavor(artistFavorM,word) {
  this._httpService.removeFavorMusicFromArtist(word,artistFavorM._id).subscribe(data=> {
    console.log("dataye favorite delete shode", data);
      this.getArtist(artistFavorM._id);
  })
}

getUserFRomFuns(item){
  this._httpService.getfuncUser(item._id).subscribe(data=> {
    console.log(data);

  })

}
checkItem(array,item) {

      var newArry=[];
      var sum ="";
      $.each(array.members,function( index, value ) { 
      newArry.push(value._id);
      });
      if(newArry.includes(item._id)) {
       console.log("dare");
      }else {
        console.log("nadareh");
      }

      
      
}
// testFuncAlert() {
//   if(this.dataMusic.members.indexOf(this.music) <= 0) {
//     // this.newItem ='addtoFavor(dataMusic._id,music)';
//     // this.buttondes = "not added";
//     // this.checkerBtn.innerHTML = '<button (click)="addtoFavor('+this.dataMusic._id,this.music+')">add to favorite</button>';
//   }else {
//     this.buttondes = "added";
//   }
// }
func() {
  alert("yoho");
}
functionNew() {
  alert("yoho");
}
addtoComment(newComment) {
console.log("artist",this.dataMusic._id, "music", this.music._id,"ewcomment", newComment);
 this.newObj = {
   name:this.loggedUser.firstName + ' ' + this.loggedUser.lastName,
   comment:newComment.comment
}
  this._httpService.addCommentToMusic(this.newObj,this.dataMusic._id,this.music._id).subscribe(data=> {
    if(data['errors']){
      for(var key in data['errors']){
        console.log(data['errors'][key]['message']);
        this.errorsValidation.push(data['errors'][key]['message']);
      }
    }else {
      console.log(data,"updating comment")
      this.newComment = {name:"", comment:""}
      this._httpService.getSingleMusic(this.dataMusic._id,this.music._id).subscribe(datam=>{
        console.log("data",datam);
        this.music =  datam;
      })
    }
  })
}

// finishLyric(){
//   $("#sliders > div:first").hide();
//   var myVar=setInterval(function() { 
//     $('.test1')
//       .removeClass('hide')
//       // .addClass('show')
//       .fadeIn(1000)
//       .appendTo('#sliders');
//   },  5000);
//   setInterval(function() { 
//     $('.test1')
//       .fadeOut(1000)
//       // .removeClass('show')
//       .addClass('noactive')
//       .hide()
//       .end()
//       .pause()
//       .appendTo('#sliders'); 
//   },  10000);

//   var myVar2=setInterval(function() { 
//     $('.test2')
//       .removeClass('hide')
//       // .addClass('show')
//       .fadeIn(1000)
//       .appendTo('#sliders');
//   },  10000);
//   setInterval(function() { 
//     $('.test2')
//       .fadeOut(1000)
//       // .removeClass('show')
//       .addClass('noactive')
//       .hide()
//       .end()
//       .pause()
//       .appendTo('#sliders'); 
//   },  20000);
//   setTimeout(() => {
//     clearInterval(myVar);
//   }, 10000);
//   setTimeout(() => {
//     clearInterval(myVar2);
//   }, 10000);
    
  


//   return 'red';
  
// }

// testFuncforfavor(item){


// console.log(item);
  
//  $.each(item.members,function( index, value ) {

//     if(value._id == item._id){
//       console.log("its in favor")
//       this.testParam = "added"
//     }else {
//       this.testParam = "not added"
//       console.log("its not in favor")
//     }


//   })


  

  

//   return this.testParam;

// }


testkonim(item,ahang) {
  var tasmim = "";
  var newArrF=[];

  

  if(ahang._id != this.music._id) {
    $('#inar').innerHTML = '<i class="far fa-heart" style="font-size:40px; color:rgb(122,122,122)"></i>'

  }else{
    $('#inar').innerHTML = '<i class="fas fa-heart" style="font-size:40px; color:rgb(122,122,122)"></i>'

    
  }

  

    

    
   
  

  }

  arrayItemchecker(array,item){

    var newArrT = [];

    

    for (var i =0; i < array.length; i++) {
      newArrT.push(array[i]._id);
    }

    if(!array.length) {
      this.javablast = "green";
      return 'green';
    }

    // alert(array.indexOf(item))
      if (newArrT.indexOf(item._id) != -1) {
        this.javablast = "red";
        return 'red';
      }else {
        this.javablast = "blue";
        return 'blue';
      }
  }
  

  testBg(item){
    

    return "url('./assets/uploads/images/" + item.musicImage + "')";
  }

  jumpfunction(num){
  
    this.player.currentTime = num;

  }

  loginUser() {
    if (!this.logUser.email) {
      this.errorsValidation.push("email must be present");
    }
    if (!this.logUser.password) {
      this.errorsValidation.push("password must be present");
    }else {

      this._httpService.getUsers().subscribe(data=>{

        this.allusers = data;
        
        for (var i = 0; i < this.allusers.length; i++ ) {
         
          if(this.compareName(this.logUser.email, this.allusers[i].email) !== "true") {
            
            this.loading = false;
            
            // this.message ="nothing in database with this email and password";
  
            
          }else {
            this.loading = true;
            
            console.log("result dorost", this.allusers[i].email);
  
            if(this.loading === true) {

              this._httpService.loginUser(this.logUser).subscribe(data=>{
                console.log(this.logUser.email,"email", data['email'], "emaile database");
                this.emailuser = data;
                if(((this.logUser.email) !== data['email']) && ((this.logUser.password) !== data['password'])){
                  this.errorsValidation.push("we dont have email password in database");
                }
                 this.compsync = bcrypt.compareSync( (this.logUser.password), data['password']);
                console.log("comp", this.compsync);
                if(this.compsync === true) {
                 
                  window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + this.music._id) ;
                }else {
                 
                  this.errorsValidation.push("password and email are not match");
                }
                
                
                
              },
              error => {
                // this.error = error;
                this.loading = false;
                
              });
  
                     
            }
          }
        }
        // this.errorsValidation.push(this.message);
      });

  }
    
  }

  compareName(word,str) {
    if(word === str) {
      return "true"; 
    }else {
      return "false";
    }
  }

  playthisMusic(item){

    window.location.assign("/artists/" + this.dataMusic._id + "/musics/" + item._id) ;


  }

  


 
    


 






}


