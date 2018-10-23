import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute ,Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs'
declare var $:any;
@Component({
  selector: 'app-favpages',
  templateUrl: './favpages.component.html',
  styleUrls: ['./favpages.component.css']
})
export class FavpagesComponent implements OnInit {
@Input()
favorites : any = [];
musics: any = [];
loggedUser:any;
users:any;
player:any;
photo:any;
itemNumber:any;
music:any;
playing:any;
looping:any;
loopAudio:any;
seekbar:any;
loadingPage:any;
allSitesAppNav:any;

logUserB: any;
allusers:any;
loading:boolean;
compsync:any;
emailuser:any;
errorsValidation:any=[];
  constructor(private _httpService: HttpService, private _route:ActivatedRoute) { }

  ngOnInit() {
    this.getAllFav();
    this.getAllMusic();
    this.getUser();
    this.getallsites();
    this.getAllUsers();
    this.loggedUserChecker();
    this.logUserB = {
      email:"",
      password:""
    }
    this.player = document.getElementById("audioPlayer");
    this.player.play();
    
    this.photo = document.getElementById("image");
    this.loopAudio = document.getElementById("loop_unloop");
    this.seekbar = document.getElementById("testranger");
    // this.testMode(this.itemNumber);
    this.player.onended = () => {    
      
      this.forFunc(this.itemNumber);
      
       
    }
   
  }

  getallsites(){
    this._httpService.getSites().subscribe(data=>{
      this.allSitesAppNav = data
    })
  }

  getUser(){


    if(!this.loggedUser){
      $('.showUser').addClass('hide');
    }else {
      
      $('.showUser').removeClass('hide');
      $('.showUser').addClass('show');
    }
    this._httpService.getUserFromDashboard().subscribe(data=>{
    
    this._httpService.getSingleUser(data['_id']).subscribe(data=>{
    this.loggedUser=data;
    $('.showUser').removeClass('hide');
    $('.showUser').addClass('show');
    this.player.src = 'assets/uploads/medias/'+this.loggedUser.members[0].songCover;
    this.photo.src = 'assets/uploads/images/'+this.loggedUser.members[0].musicImage;
      
    })
    })
  }

  loggedUserChecker(){

    
    
  }
  

  getAllUsers(){
    this._httpService.getUsers().subscribe(data=> {
    this.users = data;
    
    // $("#musicsPanel > li:first").removeClass('noactive');
    $("#musicsPanel li.song-0").addClass('highlight');
    })
 

  }

  getAllFav() {
    this._httpService.getfavorites().subscribe(data=>{    
    this.favorites = data    
      // this.allArtists = this.allArtists.slice(3,4);
    })
  }
  getAllMusic() {
    this._httpService.getMusics().subscribe(data=>{    
    this.musics = data    
      // this.allArtists = this.allArtists.slice(3,4);
    })
  }
  funcalert(num,i){

    this.photo.src = 'assets/uploads/images/'+ num.musicImage;
    this.player.src = 'assets/uploads/medias/'+ num.songCover;
    this.player.play();
    $("#musicsPanel li").addClass('noactive');
    this.itemNumber = i;
    this.music = num;
    $.each(this.loggedUser.members,function( index, value ) {
        
       
       if(index == i) {

        
        $('.song-'+i)
      
        
        .addClass('active')
        .removeClass('noactive');
       }
        
      
    });
    
   

  }

  forFunc(number) {
    if(!number){
      number = 0;

    }
   

    if(number === this.loggedUser.members.length -1) {
      $('.song-'+number).removeClass('active');
      $('.song-'+number).addClass('noactive');
      return this.forFunc(-1);
    }else {
    this.itemNumber = number+1;
    this.photo.src = 'assets/uploads/images/'+ this.loggedUser.members[number+1].musicImage;
    this.player.src = 'assets/uploads/medias/'+ this.loggedUser.members[number+1].songCover;
    this.player.play();
    $('.song-'+number).removeClass('active');
    $('.song-'+number).addClass('noactive');
    $('.song-'+this.itemNumber).removeClass('noactive');
    $('.song-'+this.itemNumber).addClass('active');

    }
    

    
  }
  preFunc(number) {

    if(number === 0) {
      $('.song-'+number).removeClass('active');
      $('.song-'+number).addClass('noactive');
      return this.preFunc(this.loggedUser.members.length);
    }else {
    this.itemNumber = number-1;
    this.photo.src = 'assets/uploads/images/'+ this.loggedUser.members[number-1].musicImage;
    this.player.src = 'assets/uploads/medias/'+ this.loggedUser.members[number-1].songCover;
    this.player.play();
    $('.song-'+number).removeClass('active');
    $('.song-'+number).addClass('noactive');
    $('.song-'+this.itemNumber).removeClass('noactive');
    $('.song-'+this.itemNumber).addClass('active');
    }
  }

  testMode(number) {
    if(!number) {

      this.forFunc(-1);
      return 'red';
      // alert("not find");
      // $("ul#musicsPanel li.song-0 a").css({'color':'red'});
    }else {
      // $("ul#musicsPanel li.song-0 a").css('color','black');
      
    }
  }

  LoopUnloop(){

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
  loginUserB() {
    alert(this.logUserB.email);
    if (!this.logUserB.email) {
      this.errorsValidation.push("email must be present");
    }
    if (!this.logUserB.password) {
      this.errorsValidation.push("password must be present");
    }else {

      // this._httpService.getUsers().subscribe(data=>{
        
      //   this.allusers = data;
      //   console.log(data, "dataye forme por shode");
      
      //   for (var i = 0; i < this.allusers.length; i++ ) {
         
      //     if(this.compareName(this.logUserB.email, this.allusers[i].email) !== "true") {
            
      //       this.loading = false;
            
      //       // this.message ="nothing in database with this email and password";
  
            
      //     }else {
      //       this.loading = true;
            
      //       console.log("result dorost", this.allusers[i].email);
  
      //       if(this.loading === true) {

      //         this._httpService.loginUser(this.logUserB).subscribe(data=>{
      //           console.log(this.logUserB.email,"email", data['email'], "emaile database");
      //           this.emailuser = data;
      //           if(((this.logUserB.email) !== data['email']) && ((this.logUserB.password) !== data['password'])){
      //             this.errorsValidation.push("we dont have email password in database");
      //           }
      //            this.compsync = bcrypt.compareSync( (this.logUserB.password), data['password']);
      //           console.log("comp", this.compsync);
      //           if(this.compsync === true) {
                 
      //             window.location.assign("/") ;
      //           }else {
                 
      //             this.errorsValidation.push("password and email are not match");
      //           }
                
                
                
      //         },
      //         error => {
      //           // this.error = error;
      //           this.loading = false;
                
      //         });
  
                     
      //       }
      //     }
      //   }
        
      // });

  }
    
  }

  compareName(word,str) {
    if(word === str) {
      return "true"; 
    }else {
      return "false";
    }
  }
  
}
