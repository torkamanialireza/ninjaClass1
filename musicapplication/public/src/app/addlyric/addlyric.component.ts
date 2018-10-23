import { Component, OnInit , Input} from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-addlyric',
  templateUrl: './addlyric.component.html',
  styleUrls: ['./addlyric.component.css']
})
export class AddlyricComponent implements OnInit {

  @Input()
  musics:any;
  music:any;
  edit:boolean;
  player:any;
  newLyric:any;
  artist_id:any;
  music_id:any;
  constructor(private _httpService: HttpService,private _route:ActivatedRoute) { }

  ngOnInit() {

    this.newLyric = {
      content:"",
      fadeIn:"",
      fadeOut:"",
    }
  

    this.getLyrics();

    this.player = document.getElementById('audioPlayer');

  }

  getLyrics(){

    this._route.params.subscribe(data=> {
    this.getsingleMusic(data['artist_id'], data['id']);
      this.artist_id = data['artist_id'];
      this.music_id = data['id'];
    })
    
  }

  getsingleMusic(artist_id,music_id){

    this._httpService.getSingleMusic(artist_id,music_id).subscribe(data=> {
      this.music = data;


    })
   
  }

  editFunc(number){

    this.edit = !this.edit
    
    if(this.edit){
      $('.edit-'+number).removeClass('hide');
      this.edit = true;

    }else {
      $('.edit-'+number).addClass('hide');
      this.edit = false;
    }
  }

  fadeInV(){
    $('#fadeInVerb').val(this.player.currentTime);
    // alert(this.player.currentTime);
    this.newLyric['fadeIn']= this.player.currentTime;


  }
  fadeOutV(){
    $('#fadeOutVerb').val(this.player.currentTime);
    this.newLyric['fadeOut']= this.player.currentTime;
    // alert(this.player.currentTime);

  }

  addLyricInLyrics(){


    
    this._httpService.addLyric(this.artist_id,this.music_id,this.newLyric).subscribe(data=>{

      this.newLyric = {
        content:"",
        fadeIn:"",
        fadeOut:""
      }

      this.getLyrics();

    })
  }

  removeLyric(item){

    this._httpService.removeLyricFromlyrics(this.artist_id,this.music_id,item._id).subscribe(data=> {
      console.log(data);
      this.getLyrics();

    })

  }
}
