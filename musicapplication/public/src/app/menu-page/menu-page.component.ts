import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  @Input()
  loggedUser:any;
  allsites:any;
  newMenu:any;
  allmenus:any;
  selectedFileIconMenu :File= null;
  constructor(private _httpService: HttpService) { }
  

  ngOnInit() {

    this.newMenu={
      name:"",
      link:"",

    }

    this.getUser();
    this.getSites();

  }
  getUser(){
    this._httpService.getUserFromDashboard().subscribe(data=> {
      this.loggedUser = data;
    })
  }

  getSites(){
    this._httpService.getSites().subscribe(data=> {
      this.allsites = data;

      this.getMenus(this.allsites[0]);

      
    })
  }

  onFileSelectedIconMenu(event){
    this.selectedFileIconMenu = <File>event.target.files[0];

  }



  getMenus(num){
    this._httpService.getAllMenusBysiteId(num._id).subscribe(data=> {
      this.allmenus = data;
    })
  }


  addMenuInAddTs(){
    const formData = new FormData();
    formData.set('name', this.newMenu.name)
    formData.set('link', this.newMenu.link)
    formData.set('iconMenu', this.selectedFileIconMenu,this.selectedFileIconMenu.name)
    
    this._httpService.getSites().subscribe(data=> {
      this._httpService.addmenuToSite(data[0]._id, formData).subscribe(data=>{

      })
    })
  }
}
