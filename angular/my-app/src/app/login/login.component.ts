import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(
    private authService :AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    //this is use for true false value of local storage in header
      this.isLoggedIn=localStorage.getItem('loggedIn');
      
    //this use for back button after login not redirect home page
      if(sessionStorage.getItem('token')){
        this.router.navigate(['banner']);
      }
  }
  formData={
    email: '',
    password: '',
    
  }
  obj={
    uname:'',
    pass:'',
    remember:''
  }
  isLoggedIn='';
 
  
 // isLoggedIn=localStorage.loggedIn ;
  onLogin(obj){
    this.formData.email=obj.uname,
    this.formData.password=obj.pass
    console.log("login data find",this.formData)
    this.authService.loginSubmit(this.formData)
    .subscribe((response:any) => {
      console.log("node login token data1",response);
      console.log("node login token data",response.data);
      var obj=response.data; //dat take in obj for fetch
      console.log("obj",obj)
      var getdata=[];
      getdata.push(obj);  //we fetch particular data from array
      console.log("getdatafind",getdata[0]); //print array data
      if (getdata[0]==="login successful"){
        if(response.token) //for store token inlocalStorage.se local storage
        {
            sessionStorage.setItem('token',response.token);
        }
        localStorage.setItem('loggedIn','true');
        this.isLoggedIn=localStorage.getItem('loggedIn');
        console.log("jkhjkhjkhjk", this.isLoggedIn)
        location.reload();//this is necessary bcz localstorag value not isloggedin update
        alert("you are success fully login")    
        this.router.navigate(['banner']);
      }
      else{
        alert("you cnt registerd");
      }
    })
  }
}
