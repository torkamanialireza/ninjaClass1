import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.css']
})
export class FooterPageComponent implements OnInit {
  @Input()
  logUser:any;
  newFooter:any;
  selectedFileFooterCover :File= null;
  allsites:any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getUserfromdashbaord();

    this.newFooter= {
      title:"",
      content:"",
    }

    this.getSites();

  }


  getSites(){
    this._httpService.getSites().subscribe(data =>{
      this.allsites = data;
    })
  }

  getUserfromdashbaord() {
    this._httpService.getUserFromDashboard().subscribe(data=> {
      console.log(data,"this is logged user");
      this.logUser = data;
    })
  }

  onFileSelectedFooterCover(event) {
    this.selectedFileFooterCover = <File>event.target.files[0];
  }

  addFooterInAddTs(){

    
    const formData: any = new FormData();
    formData.set('footerCover', this.selectedFileFooterCover, this.selectedFileFooterCover.name)
    formData.set('title', this.newFooter.title)
    formData.set('content', this.newFooter.content)
    console.log("this site", this.allsites[0])
    console.log("bekhoon mano",this.newFooter,"form por shode");
    console.log(this.newFooter,"footer");
    this._httpService.addfooterToSite(this.allsites[0]._id,formData).subscribe(data=> {
      console.log(data,"dataye header update site");

    })

  }

}
