import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-musics-collection',
  templateUrl: './musics-collection.component.html',
  styleUrls: ['./musics-collection.component.css']
})
export class MusicsCollectionComponent implements OnInit {

  archivemusics:any;
  arrayOfmusic:any=[];
  artists:any;
  artist:any;
  artistId:any;
  lengthArray:any;
  constructor(private _HttpService: HttpService) { }

  ngOnInit() {
    this.getMusicsperArtist();
    this.archivemusics = {
      musicperArtist:"",
      artist:"",
    }

  }


  getMusicsperArtist() {

    this._HttpService.getArtists().subscribe(data=>{
      this.artists =  data;
    
      // for (var i=0; i < this.artists.length; i++) {
      //   this.artist =  this.artists[i];
      //   this.artistId = this.artist._id;
      //   this.archivemusics["artist"]=this.artist;
      //   for (var j = 0; j < this.artist.members.length; j++) {
      //     var musicSelected = this.artist.members[j];
      //     this.archivemusics["musicperArtist"] = musicSelected;
         
      //   }

        
        
      //   this.arrayOfmusic.push(this.archivemusics);

      // }
      // this.lengthArray = this.archivemusics.length -1;
      // console.log(this.archivemusics,"archive musics")
      // return (this.arrayOfmusic, this.artistId);
    })

  }

  bgFunction(nice){
    
    return "url('./assets/uploads/images/"+nice.musicImage+"')";
    
  }


  // checkArtist(words) {

  //   for(var i = 0; i < words.length; i++) {
  //     var item = words[i];
  //     if(item.id === )
  //   }

  // }
}
