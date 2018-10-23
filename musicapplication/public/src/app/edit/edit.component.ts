import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  artist:any;
 
  constructor(private _httpService: HttpService, private _router:Router,private _route:ActivatedRoute) { }

  ngOnInit() {

    this._route.params.subscribe(data=> {
      console.log("dataye id edite artist", data['id']);
      
      this.getArtistById(data['id']);
      
    })


    

    

    
  }

  getArtistById(item) {
    this._httpService.getSingleArtist(item).subscribe(dataArtist=> {
      console.log("dataye artist", dataArtist);
      this.artist = dataArtist;
    })
  }

  updateArtist(item) {
    console.log(item, "music vasyhe update");
    this._httpService.editArtist(item._id, item).subscribe(editData=> {
      console.log(editData, "update shod");
      // this._router.navigate(['/artists/'+this.artist._id + '/musics/' + music._id]);
      
    })
  }
}
