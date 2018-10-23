import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
var $:any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'], 
})

export class AddComponent implements OnInit {
  @Input()
  newArtist:any ;
  music:any;
  $scope:any;
  errorsValidation = [];
  selectedFileMusic :File= null;
  selectedFileCover :File= null;
  constructor(private _httpService: HttpService,private _router: Router) { }
  ngOnInit() {
    this.newArtist = {
      artistName:"",
      artistContent:"",
      followers:"",     
      artistFacebook:"",
      artistTwitter:"",
      artistGoogle:"",
    }
    this._httpService.getArtists().subscribe(data=>{
      console.log("We get all artists", data);
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


  

  addMusicInAddTs(){
    
    const formData: any = new FormData();
    
    formData.set('artistCover', this.selectedFileCover, this.selectedFileCover.name)
    formData.set('artistImage', this.selectedFileMusic, this.selectedFileMusic.name)
    formData.set('artistName', this.newArtist.artistName)
    formData.set('artistContent', this.newArtist.artistContent)
    formData.set('followers', this.newArtist.followers)
    formData.set('artistTwitter', this.newArtist.artistTwitter)
    formData.set('artistFacebook', this.newArtist.artistFacebook)
    formData.set('artistGoogle', this.newArtist.artistGoogle)
    
    let observable = this._httpService.addArtist(formData);
    observable.subscribe(data=>{
      console.log(data);
      alert("Artist Created!");
    })

    
    

  //   const formData = new FormData();
  //     // for (var key in this.$scope.music){
  //     //   formData.append(key,this.$scope.music[key]);
  //     // }
  //     // var file = $('#musicImage')[0].files[0];
  //     // formData.append("musicImage",file);
     
  //   ///old one..///
  //   formData.append("musicImage", this.selectedFileMusic, this.selectedFileMusic.name);
   
  //   this._httpService.addMusic(formData).subscribe(data=>{
      
  //     console.log(formData);
  //     if(formData['errors']){
  //       for(var key in formData['errors']){
  //         console.log(formData['errors'][key]['message']);
  //         this.errorsValidation.push(formData['errors'][key]['message']);
  //       }
  //     }else {
  //       this.newMusic = {
  //         songName:"",
  //         artist:"",
  //         content:"",
  //         playerCounter:"",
  //         facebook:"",
  //         twitter:"",
  //         google:"",
  //         musicImage:"",
  //         songCover:"",
  //       }
  //       this._router.navigate(['/musics']);
  //     }
     
  //   })
   
  }

  



}
