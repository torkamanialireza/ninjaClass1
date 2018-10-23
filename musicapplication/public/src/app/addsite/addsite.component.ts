import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute,Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addsite',
  templateUrl: './addsite.component.html',
  styleUrls: ['./addsite.component.css']
})
export class AddsiteComponent implements OnInit {
  @Input()
  newSite:any ;
  editSite:any;
  newHeader:any;
  errorsValidation = [];
  selectedFileArtistsCover :File= null;
  selectedFileMusicsCover :File= null;
  selectedFileVideosCover :File= null;
  selectedFileSiteLogo :File= null;
  selectedFileHeaderCover :File= null;
  selectedFileWidgetCover :File= null;
  testnice:any;
  req:any;
  loggedUser:any;
  allsite:any;
  allwidgets:any;
  site:any;
  newWidget:any;
  newMenu:any;
  newFooter:any;
  selectedFileMenuIcon : File =null;
  constructor(private _httpService: HttpService,private _router: Router) { }



  ngOnInit() {
   
    this.newSite = {
      siteName:"",
      siteContent:"",
      siteFollowers:"",     
      siteFacebook:"",
      siteTwitter:"",
      siteGoogle:"",
      siteBg:"",
      siteFontColor:"",
    }

    
    this.newHeader = {
      title:"",
      content:"",
    }

    this.newMenu= {
      name:"",
      link:"",
    }
    

    

    

    this.newFooter = {
      title:"",
      content:"",
    }
    this.getUserfromdashbaord();

    this.getSingleSites();

  }


  getSingleSites(){
    this._httpService.getSites().subscribe(data=>{
      this.allsite = data;

      this.site = this.allsite[0];

      // this.getAllWidgets();


    })
  }


  getUserfromdashbaord() {
    this._httpService.getUserFromDashboard().subscribe(data=> {
      console.log(data,"this is logged user");
      this.loggedUser = data;

    })
  }
  // OnFileHeaderCover(event) {
  //   console.log(event);
  //   this.selectedFileHeaderCover= <File>event.target.files[0];
    
  // }
  onFileSelectedsiteLogo(event) {
    console.log(event);
    this.selectedFileSiteLogo= <File>event.target.files[0];
    
  }

  onFileSelectedmenuIcon(event) {
    console.log(event);
    this.selectedFileMenuIcon= <File>event.target.files[0];
    
  }
  onFileSelectedartistsCover(event) {
    console.log(event);
    this.selectedFileArtistsCover = <File>event.target.files[0];
    
  }
  onFileSelectedmusicsCover(event) {
    console.log(event);
    this.selectedFileMusicsCover = <File>event.target.files[0];
    
  }

  onFileSelectedvideosCover(event) {
    console.log(event);
    this.selectedFileVideosCover= <File>event.target.files[0];
    
  }
  

  onFileSelectedHeaderCover(event){
    this.selectedFileHeaderCover =  <File>event.target.files[0];
  }
  

  onFileSelectedWidgetCover(event){
    this.selectedFileWidgetCover =  <File>event.target.files[0];
  }

  onFileSelectedMenuIcon(event){
    this.selectedFileMenuIcon =  <File>event.target.files[0];
  }


  addSiteInAddTs(){
    
    const formData: any = new FormData();
    
    formData.set('siteLogo', this.selectedFileSiteLogo, this.selectedFileSiteLogo.name)
    formData.set('artistsCover', this.selectedFileArtistsCover, this.selectedFileArtistsCover.name)
    formData.set('musicsCover', this.selectedFileMusicsCover, this.selectedFileMusicsCover.name)
    formData.set('videosCover', this.selectedFileVideosCover, this.selectedFileVideosCover.name)
    formData.set('siteName', this.newSite.siteName)
    formData.set('siteContent', this.newSite.siteContent)
    formData.set('siteFollowers', this.newSite.siteFollowers)
    formData.set('siteTwitter', this.newSite.siteTwitter)
    formData.set('siteFacebook', this.newSite.siteFacebook)
    formData.set('siteGoogle', this.newSite.siteGoogle)
    formData.set('siteBg', this.newSite.siteBg)
    formData.set('siteFontColor', this.newSite.siteFontColor)
    
    this._httpService.addSite(formData).subscribe(data=> {
      console.log(data,"dataye update site");
    })
    
  }


  editSiteInAddTs(editSite){
    this._httpService.editSite(this.allsite[0]._id,editSite).subscribe(data => {
      this.getSingleSites();
      this.getUserfromdashbaord();
      console.log(data,"editSite",editSite);
    })

  }

  addHeaderInAddTs() {
    
    const formDataHeader: any = new FormData(); 
    formDataHeader.set('headerCover', this.selectedFileHeaderCover, this.selectedFileHeaderCover.name)
    formDataHeader.set('title', this.newHeader.title)
    formDataHeader.set('content', this.newHeader.content)
    console.log("this site", this.allsite[0])
    console.log("bekhoon mano",formDataHeader,"form por shode");

    this._httpService.addheaderToSite(this.allsite[0]._id,formDataHeader).subscribe(data=> {
      console.log(data,"dataye header update site");

    })
  }

  addMenuInAddTs() {
    
    const formDataMenu: any = new FormData(); 
    formDataMenu.set('headerCover', this.selectedFileHeaderCover, this.selectedFileHeaderCover.name)
    formDataMenu.set('name', this.newHeader.name)
    formDataMenu.set('link', this.newHeader.link)
    console.log("this site", this.allsite[0])
    console.log("bekhoon mano",formDataMenu,"form por shode");

    this._httpService.addheaderToSite(this.allsite[0]._id,formDataMenu).subscribe(data=> {
      console.log(data,"dataye menu update site");

    })
  }


  addWidgetInAddTs() {
    
    const formDataWidget: any = new FormData(); 
    formDataWidget.set('widgetCover', this.selectedFileWidgetCover, this.selectedFileWidgetCover.name)
    formDataWidget.set('title', this.newWidget.title)
    formDataWidget.set('content', this.newWidget.content)
    console.log("this site", this.allsite[0])
    console.log("bekhoon mano",formDataWidget,"form por shode");

    this._httpService.addwidgetToSite(this.allsite[0]._id,formDataWidget).subscribe(data=> {
      console.log(data,"dataye Widget update site");

    })
  }

  

  // getAllWidgets(){

  //   this._httpService.getAllWidgetsBySiteId().subscribe(data=>{
  //     this.allwidgets =  data;
  //   })
  // }




  
}


