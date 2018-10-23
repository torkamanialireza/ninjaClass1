import { Component, OnInit} from '@angular/core';
import { HttpService } from './../http.service';
// import { HttpClient } from '@angular/common/http';
declare var $:any
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allMusics :any =[];
  site:any;
  web:any;
  users:any=[];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log("init is fine");

    this.getAllsites(); 
    
  
  
  }

  finduserinsearchTasks(){
  //   // our http response is an Observable, store it in a variable
  //   let tempObservable = this._http.get('/api/users');
  //   // subscribe to the Observable and provide the code we would like to do with our data from the response
  //   tempObservable.subscribe(data =>{
  //     console.log("Got our tasks!", data);
  //     this.users = data;
  //   } 
  // );
    this._httpService.getUsers().subscribe(data=> {
      this.users = data;
      console.log("users", this.users);
      
    })

 }
 showMenu(){
   
  // $('#nav-mobile').removeClass('side-nav');
  // $('#nav-mobile').removeClass('hide');
  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.side-nav');
  //   var instances = this.M.Sidenav.init(elems, this.options);
  //   instances.open();
  // });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.side-nav').sidenav();
  });
}


getAllsites() {
  this._httpService.getSites().subscribe(data=>{
    
    this.web = data
    this.site = this.web[0];
    console.log(this.site,"bia inam sitemonneee");
    // this.allArtists = this.allArtists.slice(3,4);
  })

  }
  // getAllmusics() {
  //   this._httpService.getArtists().subscribe(data => {
  //     this.allMusics = data;
  //   })
  // }
//   deleteMusicInMaints(music: any){
   
      
//     this._httpService.removeMusic(music._id).subscribe(data=>{
//       console.log("the music deleted",data);
//       this.getAllmusics();
//     })
// }
// editinMainTs(music:any){
//   this._httpService.editMusic(music).subscribe(data=>{
//     console.log("the music edited",data);
//   })

// }

}
