import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-music',
  templateUrl: './edit-music.component.html',
  styleUrls: ['./edit-music.component.css']
})
export class EditMusicComponent implements OnInit {
@Input()
artist:any;
music:any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router:Router) { }

  ngOnInit() {

    this._route.params.subscribe(data=> {
      console.log("dataye id", data);
      this.getArtistById(data['artist_id']);
      this.getMusicByArtist(data['artist_id'], data['id']);
    })
  }

  getArtistById(artist_id) {
    this._httpService.getSingleArtist(artist_id).subscribe(dataArtist=> {
      console.log("dataye artist", dataArtist);
      this.artist = dataArtist;
    })
  }

  getMusicByArtist(artist_id, music_id) {
    this._httpService.getSingleMusic(artist_id, music_id).subscribe(dataMusic=> {
      console.log("dataye music", dataMusic);
      this.music =  dataMusic;
    })
  }

  updateMusic(music) {
    console.log(music, "music vasyhe update");
    this._httpService.editMusic(this.artist._id,music._id, music).subscribe(editData=> {
      console.log(editData, "update shod");
      this._router.navigate(['/artists/'+this.artist._id + '/musics/' + music._id]);
      
    })
  }

}
