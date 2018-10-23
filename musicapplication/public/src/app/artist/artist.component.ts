import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute ,Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any;
@Component({
  selector: 'app-artist',
  templateUrl:'./artist.component.html',
//   template: `<div class="row">
//   {{artist.artistName}}

//   <h1 class="democlass">Hello World</h1>

  
//   <div class="panel panel-default" [style.background-image]="getFunction()">
//     <div *ngIf="artist">
//       <div [ngStyle]="{'background-image': getFunction()}">Hello world</div>
//     </div>
//     dasdasas
//     </div>
// </div>`,
styleUrls: ['./artist.component.css'], 
})

export class ArtistComponent implements OnInit {
  artist:any;
  photo:any;
  tabName:any;
  imagePrefix:any;
  followers:any;
  counter:any;
  niceWidth:any;

  

  // musics:any;
  constructor(private _httpService: HttpService, private _route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this._route.params.subscribe(data=>{
      console.log("i am first data for artist:",data);
      this.getArtist(data['id']);
    //  set the counter = the artists followers, increment the counter, then send it back to database with an update function

  
    
      
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
  
  getArtist(artist_id) {
    this._httpService.getSingleArtist(artist_id).subscribe(data=>{
      this.artist = data
      console.log("iam data",data['followers']);
      console.log(artist_id);
      this.getCounter(this.artist['followers']);
      this._httpService.editArtist(artist_id, {"followers":this.counter}).subscribe(data=>{
        console.log(data);

        
        
      })
      //  this._httpService.editArtist(artist_id).subscribe(newCount);
  
    })

   


   
  }

  getUrl(tabName,imagePrefix) {
    var x = document.getElementById(tabName).style.backgroundImage = 'url(buttons/' + imagePrefix + '.png)';
    console.log("oomadam");
    return x;
    // return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";


  }
  getFunction() {
    console.log("got here");
    console.log("url('assets/uploads/images/" + this.artist.artistImage + "')");
    return "url('assets/uploads/images/" + this.artist.artistImage + "')";
  }

  getColor(Color) {
    var img = new Image();
    img.src = "assets/uploads/images/"+ Color.artistImage;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    console.log(context.getImageData(10, 10, 1, 1).data[0], "avali");
    var word = context.getImageData(10, 10, 1, 1).data[0] +',' + context.getImageData(10, 10, 1, 1).data[1] + "," + context.getImageData(10, 10, 1, 1).data[2];
    var backG = "rgb("+ word + ')';
    return backG;

  }
  
}
