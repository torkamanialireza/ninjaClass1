import { Component , OnInit} from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '../../node_modules/@angular/router';

declare var $:any;
declare var custom: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  site:any;
  req:any;
  allSitesApp:any;
  allwidgets:any;
  loggedUser:any;
constructor(private _httpService: HttpService, private _route:ActivatedRoute, private _router: Router) { }  
ngOnInit() {
  
  this.getAllSitesApp();

  this.getuser();

  this.showMenuInit();


}
getAllSitesApp() {
    this._httpService.getSites().subscribe(data=>{    
    this.allSitesApp = data    
    console.log("in ham laod shod", this.allSitesApp);
      // this.allArtists = this.allArtists.slice(3,4);

      this.getAllWidgets(this.allSitesApp[0]);
    })
}


getuser(){
  this._httpService.getUserFromDashboard().subscribe(data=>{
    this.loggedUser =  data;

  })
}









showMenuInit(){
   
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.sidenav');
    //   var instances = this.M.Sidenav.init(elems, this.options);
    //   instances.open();
    // });
  
    // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
    // var collapsibleElem = document.querySelector('.collapsible');
    // var collapsibleInstance = this.M.Collapsible.init(collapsibleElem, this.options);
  
    // Or with jQuery
  
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
}


logout(){
  this._httpService.logout().subscribe(data=>{
  console.log(data,"logout");
  
  window.location.assign("/") ;

  // this._router.navigate(['/']);
    
  })
  
}


login(){

  window.location.assign("/main/users") ;

}

getAllWidgets(num){

  this._httpService.getAllWidgetsBySiteId(num._id).subscribe(data=>{
    this.allwidgets =  data;
  })
}
}




