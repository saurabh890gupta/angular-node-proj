import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(
    private router: Router,
    private authService :AuthServiceService,
  
  ) {}
 // this token also use for login logout header
  token:any;
  ngOnInit() {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log(" this.isLoggedIn header", this.isLoggedIn)
    console.log("gdfklgdghdfklgh",sessionStorage.getItem('token'))
 //this is use for token login logout header
  //  this.token=sessionStorage.getItem('token')
  //  console.log("fjsdhfjksdfh",this.token)
    // if(this.token==null){
    //   this.token='false';
    // }
    // else{
    //   this.token='true';
    // }
  }
  isLoggedIn:any;
  onlogout(){
    this.authService.logout()
    .subscribe((response:any) => {
      console.log("response find",response)
      if(response.data=="User logged out successfully!"){
          sessionStorage.clear();
          localStorage.setItem('loggedIn','false');
          this.isLoggedIn=localStorage.getItem('loggedIn');
          console.log("value logged in", this.isLoggedIn);
          alert("you sucessfully logout");
          location.reload(); //this is not necessary bcz localstorag value isloggedin update
          this.router.navigate(['']);
      }else{
        alert("you r not logout");
      }
    })
    
  

  }
}
