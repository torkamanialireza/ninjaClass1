import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {
  @Input()
  loggedUser:any;
  allHeaders:any;
  allSites:any;
  constructor(private _httpService: HttpService,private _router: Router) { }

  ngOnInit() {
    this.getUserfromdashbaord();
    this.getallSites();

  }

  getUserfromdashbaord() {
    this._httpService.getUserFromDashboard().subscribe(data=> {
      console.log(data,"this is logged user");
      this.loggedUser = data;



    })
  }

  getallSites(){
    this._httpService.getSites().subscribe(data=> {
      this.allSites = data;
      this.getAllHeaders(this.allSites[0]);

    })
  }

  getAllHeaders(num){

    this._httpService.getAllHeadersBySiteId(num._id).subscribe(data=> {
      this.allHeaders = data;
    })


    
  }

}
