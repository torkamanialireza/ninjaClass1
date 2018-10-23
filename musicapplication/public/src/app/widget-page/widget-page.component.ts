import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import * as bcrypt from 'bcryptjs'
@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})
export class WidgetPageComponent implements OnInit {
@Input()
errorsValidation:any =[];
logUser:any;
loggedUser:any;
loading:any;
newWidget:any;
message:any;
allsites:any;
error:any;

allusers:any;
emailuser:any;
compsync:any;
allWidgets:any;
  constructor(private _httpService:HttpService) { }

  ngOnInit() {
    this.getUser();
    this.getSites();
    this.logUser = {
      email:"",
      password:"",
    };

    this.newWidget= {
      title:"",
      content:"",
    }

  }
  getUser(){
    this._httpService.getUserFromDashboard().subscribe(data=> {
      this.loggedUser = data;
    })
  }

  getSites(){
    this._httpService.getSites().subscribe(data=> {
      this.allsites = data;

      this.getWidgets(this.allsites[0]);

      
    })
  }

  getWidgets(num){
    this._httpService.getAllWidgetsBySiteId(num._id).subscribe(data=> {
      this.allWidgets =  data;
    })

  }


  loginUser() {
    if (!this.logUser.email) {
      this.errorsValidation.push("email must be present");
    }
    if (!this.logUser.password) {
      this.errorsValidation.push("password must be present");
    }else {

      this._httpService.getUsers().subscribe(data=>{

        this.allusers = data;
        
        for (var i = 0; i < this.allusers.length; i++ ) {
         
          if(this.compareName(this.logUser.email, this.allusers[i].email) !== "true") {
            
            this.loading = false;
            
            this.message ="nothing in database with this email and password";
  
            
          }else {
            this.loading = true;
            
            console.log("result dorost", this.allusers[i].email);
  
            if(this.loading === true) {

              this._httpService.loginUser(this.logUser).subscribe(data=>{
                console.log(this.logUser.email,"email", data['email'], "emaile database");
                this.emailuser = data;
                if(((this.logUser.email) !== data['email']) && ((this.logUser.password) !== data['password'])){
                  this.errorsValidation.push("we dont have email password in database");
                }
                 this.compsync = bcrypt.compareSync( (this.logUser.password), data['password']);
                console.log("comp", this.compsync);
                if(this.compsync === true) {
                 
                  window.location.assign("/main/admin/widgets") ;
                }else {
                 
                  this.errorsValidation.push("password and email are not match");
                }
                
                
                
              },
              error => {
                this.error = error;
                this.loading = false;
                
              });
  
                     
            }
          }
        }
        this.errorsValidation.push(this.message);
      });

  }
    
  }
  compareName(word,str) {
    if(word === str) {
      return "true"; 
    }else {
      return "false";
    }
  }
}
