import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute ,Router } from "@angular/router";
import { ArtistComponent } from '../artist/artist.component';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addmusic',
  templateUrl: './addmusic.component.html',
  styleUrls: ['./addmusic.component.css']
})
export class AddmusicComponent implements OnInit {
  @Input()
  newMusic:any ;
  errorsValidation:any = [];
  artist:any;
  selectedFileMusic :File= null;
  selectedFileCover :File= null;
  constructor(private _httpService: HttpService, private _route:ActivatedRoute) {   }

  ngOnInit() {

    this._route.params.subscribe(data=>{
      console.log(data);
      this.getArtist(data['id']);
    })
   
    this.newMusic = {
      songName:"",
      content:"",
      playerCounter:"", 
      followers:"",      
    }
    


  }

  getArtist(artist_id) {
    
      this._httpService.getSingleArtist(artist_id).subscribe(datas=>{
        this.artist = datas;
        console.log("test kon artist idiro", this.artist._id);
      })
    

  }
  onFileSelectedMusicImage(event) {
    console.log(event);
    this.selectedFileMusic = <File>event.target.files[0];
    
  }

  onFileSelectedSongCover(event) {
    console.log(event);
    this.selectedFileCover= <File>event.target.files[0];
    
  }

  musicToArtist(){
    const formData: any = new FormData();
    
    formData.set('songCover', this.selectedFileCover, this.selectedFileCover.name)
    formData.set('musicImage', this.selectedFileMusic, this.selectedFileMusic.name)
    formData.set('songName', this.newMusic.songName)
    formData.set('content', this.newMusic.content)
    formData.set('followers', this.newMusic.followers)
    formData.set('playerCounter', this.newMusic.playerCounter)
    
    let observable = this._httpService.addMusicToArtist(this.artist._id,formData);
    observable.subscribe(data=>{
      console.log(data);
      console.log("to function",this.artist._id);
      alert("Music Created!");
    })



    ///
    // console.log("we wannna add music to artist",this.newMusic);

    // this._httpService.addMusicToArtist(this.newMusic, this.artist['_id']).subscribe(data=>{

    //   this.getArtist(this.artist['_id']);
    //   if(data['errors']){
    //     for(var key in data['errors']){
    //       console.log(data['errors'][key]['message']);
    //       this.errorsValidation.push(data['errors'][key]['message']);
    //     }
    //   }else {
    //     this.newMusic = {
    //       songName:"",
    //       content:"",
    //       followers:"",     
          
    //     }
        
    //   }
    // })
    
    
    
    
  }

}
