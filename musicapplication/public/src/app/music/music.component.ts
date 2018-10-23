
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params } from '../../../node_modules/@angular/router';
import { ArtistComponent } from '../artist/artist.component';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';
import { CurrencyIndex } from '../../../node_modules/@angular/common/src/i18n/locale_data';

declare var $: any;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  @Input()
  allArtists : any = [];
  artist:any;
  id:any;
  counter:any;
  context:any;
  player:any;
  minNum:Number;
  maxNum:Number;
  rangeElem:any;
  Minseekbar:any;
  maxSeekbar:any;
  valueSeekbar:any;
  min:any;
  value:any;
  errorsValidation:any = [];
  favoritesArray:any = [];
  newFavor:any;
  public xhr: XMLHttpRequest;
  public buffer: AudioBuffer;
  public source: AudioBufferSourceNode;
  favoriteMusic:any={};
  allmusicsofartist= [];
  artistF :any;
  cover:any;
  content:any;
  numberOfPlay:any;
  // constructor(private _httpService: HttpService, private _route:ActivatedRoute) { }
  constructor(private _httpService: HttpService, private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(data=>{
      console.log("i am first data",data);
      this.getArtist(data['id']);
    //  set the counter = the artists followers, increment the counter, then send it back to database with an update function
    this.player = document.getElementById("audioPlayer");
    this.player.play();
    this.player.onended= function() {
      
      // data['id'];
      this._httpService.getSingleArtist(data['id']).subscribe(data=>{
        this.artistF = data
        console.log(this.artistF, "akhre ahang data neshoon dade shod");
      })
      // for (var i = 0;i < this.artistF.musics.length; i++) {
      //   console.log("ahanga be tartibe", i);
      // }
      
      
        // this.player.src= "/assets/uploads/medias/" + this.artist.musics[i].songCover ;
    
   };
      
    }) 
    
    
    
    
    
    
    
   
    console.log("source ahango neshoon behem bede",this.player.src);
    
    
    // console.log("test for next song",this.artist);
  
  
    console.log("data of favorite",this.favoritesArray);
    this.newFavor = {
      favorContent: "",
      favorImage:"",
      favorCover:"",
      playerCounter:"", 
      favorName:"",     
    }
  
    
  this.getAllArtists();
    // this._route.params.subscribe((params:Params)=>{
    //   this.id = params['id'];
    //   this.allMusics(params['id']);
    // })
  // this.player.play();


  
  }

  // endofMuic(){
  //   console.log("ended tamoom shod ahang2");  
  //   this.player.onended = () => {    
  //     console.log("ended tamoom shod ahang");     
  //     if(this.artist.musics.length > 1) {
  //     for (let i = 0; i < this.artist.musics.length; i++) {
  //       if (this.player.src === this.artist.musics[i].songCover) {
  //         if(i !== (this.artist.musics.length - 1))
  //         this.player.src = (this.artist.musics[i+1].songCover);
  //       } else {
  //         this.player.pause();
  //       }
  //     }
  //   } else {
  //     this.player.pause();
  //   }
  //   };
  // }
  
 
  preMusic(array,word) {
    
  var newPword= word.split('http://localhost:8000/assets/uploads/medias/');
  var joinwordP= newPword.join('');
  var newWordp = joinwordP.split('%20');
  var akharWordP = newWordp.join(' ');
    for (var i=array.length-1; i >= 0; i--) {
     
      if(akharWordP == array[i].songCover){
        console.log(i,"in indexeh");
        
        var sum = i -1;
      
        // i++;
      }else{
        console.log("in indexenist");
      }
      // console.log("/assets/uploads/medias/" + array[i].songCover)

     
    }
    this.numberOfPlay = array[sum].playerCounter;
    this.content = array[sum].content;
    this.cover = "/assets/uploads/images/" + array[sum].musicImage;
    console.log("ax", this.cover);
    this.player.src = "/assets/uploads/medias/" + array[sum].songCover
    this.player.play();
   

  }


  getArtist(artist_id) {
    this._httpService.getSingleArtist(artist_id).subscribe(data=>{
      this.artist = data;
      this.player.src= "/assets/uploads/medias/" + this.artist.musics[0].songCover ;
      this.cover = "/assets/uploads/images/" + this.artist.musics[0].musicImage; 
      this.content = this.artist.musics[0].content;
      this.numberOfPlay = this.artist.musics[0].playerCounter;
      console.log("shomaresh,",this.numberOfPlay);
      console.log(this.artist, "in artisto behem neshoon bede")
      
      
      // console.log("iam data",data['followers']);
      // console.log(artist_id);
      this.getCounter(this.artist['followers']);
      
      this._httpService.editArtist(artist_id, {"followers":this.counter}).subscribe(data=>{
        console.log(data);
        
      })
      //  this._httpService.editArtist(artist_id).subscribe(newCount);
  
    })

    
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
  
  getAllArtists() {
    this._httpService.getArtists().subscribe(data=>{
      this.allArtists = data
    })
  }

  deleteMusicInMaints(music: any){
  console.log("load shodam vasyeh pak e ahang")
    // console.log("we wanna remove this music from artist",artist);
    // this._httpService.removeMusicfromArtist(artist.id).subscribe(data=>{
    //   this.allartists = data
    // })
    this._httpService.removeMusicfromArtist(music,this.artist._id ).subscribe(data=>{
      console.log("the music deleted",data);
      this.getArtist(this.artist._id);
    })

    
    
}

musicFunc(music:any){
  console.log("check kon ghable add",music);

  this._httpService.editMusic(this.artist._id,music._id, {"visitors":music}).subscribe(data=>{
    console.log(data, "favorited shod too barnameh");
  })

  
  // console.log("newFavor", this.newFavor);
  // const formData: any = new FormData();
  // // formData.set('favorContent', music.favorContent)
  // //   formData.set('favorImage', music.favorImage)
  // //   formData.set('favorCover', music.favorCover)
  //   formData.set('playerCounter', music.playerCounter)
  // //   formData.set('favorName', music.favorName)

  
  // this._httpService.addFavorM(music._id,music).subscribe(data=>{
  //   console.log("added favorite");

  // })
  

  


    
    
    


  
  
 




}
nextMusic(array, word){
  var newword= word.split('http://localhost:8000/assets/uploads/medias/');
  var joinword= newword.join('');
  var newWordt = joinword.split('%20');
  var akharWord = newWordt.join(' ');
    for (var i=0; i < array.length; i++) {
     
      if(akharWord == array[i].songCover){
        console.log(i,"in indexeh");
        
        var sum = i +1;
      
        // i++;
      }else{
        console.log("in indexenist");
      }
      // console.log("/assets/uploads/medias/" + array[i].songCover)

     
    }
    this.numberOfPlay = array[sum].playerCounter;
    this.content = array[sum].content;
    this.cover = "/assets/uploads/images/" + array[sum].musicImage;
    this.player.src = "/assets/uploads/medias/" + array[sum].songCover
    this.player.play();
  //  console.log("in sum hast",i);
    // this.player.src = "/assets/uploads/medias/" + array[sum +1].songCover
    // this.player.play();
    
    // console.log("musics", i);
  
  



  // if(!currentSong) {
  //   currentSong = 0;

  // }
  // for ( var currentSong = 0; currentSong < array.length; currentSong++) {
  //   if(this.player.src = "/assets/uploads/medias/" + array[currentSong].songCover){
      
  //     currentSong += 1;
  
  //     this.player.src= "/assets/uploads/medias/" + array[currentSong].songCover;
  //     this.player.play();
  //   }
  
  // }
  
    
  // console.log(sum, "in sum hast");
  // this.player.src= "/assets/uploads/medias/"+ array[sum].songCover; 
  // this.player.play();
}

deleteRelation(music) {
  
  // var index = this.favoritesArray.indexOf(music);
  // if (index > -1) {
  //   this.favoritesArray.splice(index, 1);
  // }
  // return this.favoritesArray;

  this._httpService.removefromRelationFavMusic(music,music._id).subscribe(data=>{
    console.log(data,"remove shod az favorite");
  })
}



  
enfTsEndOfAudio(){

  alert('tamoom shod');
    // var player = new Audio;
  // for (var i = 0; i < this.artist.musics.length; i++) {
  //   player.src  =  this.artist.musics[i+1].songCover;
  //   console.log("tets shod vasyeh etmame ahang",player.src);

  //   }

  //   player.play();
}



// visFunc() {
//   if(!this.counter) {
//     this.counter = 0; 
//   }else {
//     this.counter += 1;

//   }
//   console.log("visited",this.counter);
//   return this.counter;
// }







}