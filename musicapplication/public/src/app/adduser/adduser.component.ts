import { Component, OnInit , Input} from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'
declare var $:any;

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  @Input()
  newUser:any ;
  logUser:any ;
  errorsValidation = [];
  email:any;
  password:any;
  loading =false;
  error = '';
  compsync:any;
  emailuser:any;
  message :any;
  allusers : any=[];
  // require:any;
  constructor(private _httpService: HttpService,private _router: Router) { }

  ngOnInit() {
    this.newUser = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:""
    };
    this.logUser = {
      email:"",
      password:"",
    };


  
    
  }



  onSubmit(){
    console.log("new user details",this.newUser);
    
    if(!this.newUser.firstName){
      this.errorsValidation.push("firstName doestn have any contain");

    }
    
    if(!this.newUser.lastName){
      this.errorsValidation.push("lastName doestn have any contain");

    }

    if(!this.newUser.password) {
      this.errorsValidation.push("password doestn have any contain");
    }

    if(!this.newUser.confirmPassword){
      this.errorsValidation.push("confirmPassword doestn have any contain");

    }
    if(!this.newUser.email) {
      console.log("email present nashod");
      this.errorsValidation.push("email nadarim");
    }
    // if(this.errorsValidation.length > 0) {
    //   $('#validation').removeClass('hide');
    // }
    
    else {

    this._httpService.registerUser(this.newUser).subscribe(data=>{
      console.log(data);
      
      
      if(data['errors']){
        for(var key in data['errors']){
          console.log(data['errors'][key]['message']);
          this.errorsValidation.push(data['errors'][key]['message']);
          console.log("errors",this.errorsValidation);
          
          
        }
      }else {
        this.newUser = {
          firstName:"",
          lastName:"",
          email:"",
          password:"",
          confirmPassword:""
        };
        
        this._router.navigate(['/main']);
      }
     
    })
  }
  }

//   loginUser() {
   
//     this.loading = true;
//     console.log(this._httpService.loginUser(this.logUser),"hello ts function");
//     console.log(this.logUser,"bia belakhareh");

//     this._httpService.getUsers().subscribe(data=>{

//       console.log(data,"usera");
//       this.allusers = data;
//       for (var user = 0; user < this.allusers .length; user++) {
//         console.log(this.allusers[user].email,"liste email")
//         if(this.logUser.email !== this.allusers[user].email) {
//           this.errorsValidation.push("email and password isnot in datbase");

//         }
        

//       }
//     })
//     if((!this.logUser.password) && (!this.logUser.email) ) {
      
//       this.errorsValidation.push("password and email must be present");

//     }
//    if(this._httpService.loginUser(this.logUser)=== undefined) {
//     this.errorsValidation.push("email nist");
//    }
//    if(this.logUser.password ===null) {
//     this.errorsValidation.push("password nist");
//    }
    
//     this._httpService.loginUser(this.logUser).subscribe(data=>{
//       console.log(this.logUser.email,"email", data['email'], "emaile database");
//       this.emailuser = data;
//       if(((this.logUser.email) !== data['email']) && ((this.logUser.password) !== data['password'])){
//         this.errorsValidation.push("we dont have email password in database");
//       }
//        this.compsync = bcrypt.compareSync( (this.logUser.password), data['password']);
//       console.log("comp", this.compsync);
//       if(this.compsync === true) {
       
//         this._router.navigate(['/main/admin']);
//       }else {
       
//         this.errorsValidation.push("password and email are not match");
//       }
      
      
      
//     },
//     error => {
//       this.error = error;
//       this.loading = false;
      
//     });

    
  
  
// }


  loginUser() {
    
    
    if (!this.logUser.email) {
      this.errorsValidation.push("email must be present");
    }
    if (!this.logUser.password) {
      this.errorsValidation.push("password must be present");
    
    }
    else {

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
                  // alert(data['_id'])
                  if(data['_id']==='5bb547178dc9f45c1414a077') {
                    window.location.assign("/main/admin") ;
                  }else {
                    window.location.assign("/main") ;
                  }
                 
                 
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

  resetKon(){
    $('#validation').addClass('hide');
    this.newUser = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:""
    };
    this.logUser = {
      email:"",
      password:""
    }
    
    // this._router.navigate(['/main']);
  }

  logout(){
    this._httpService.logout().subscribe(data=>{
      console.log(data,"logout");
      
      window.location.assign("/artists") ;
    
      // this._router.navigate(['/']);
        
      })
  }
}
