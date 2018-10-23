import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
@Input()
loggedUser:any;
menuToggle:boolean;
allSitesAppNav:any;
constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.getuser();

    this.getAllSites();

  }


  getuser(){
    this._httpService.getUserFromDashboard().subscribe(data=>{
      this.loggedUser =  data;
  
    })
  }

  getAllSites() {
    this._httpService.getSites().subscribe(data=>{    
    this.allSitesAppNav = data    
    console.log("baba neshoon bede", this.allSitesAppNav);
      // this.allArtists = this.allArtists.slice(3,4);
    })
  }

  showMenu(){
    this.menuToggle = !this.menuToggle;
    if(this.menuToggle) {
      $('#nav-mobileM').removeClass('hide');
    }else {
      $('#nav-mobileM').addClass('hide');
    }
  
  
    
  }

  logoutKon(){
    this._httpService.logout().subscribe(data=>{
    console.log(data,"logout");
    
    window.location.assign("/artists") ;
  
    // this._router.navigate(['/artists']);
      
    })
    
  }

}
