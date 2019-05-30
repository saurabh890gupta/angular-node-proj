import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../services/auth-service.service'
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  obj={
    email:''
  }
  constructor(
    private authService:AuthServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
  }
  forgrtData(obj){
    console.log("forget email obj",obj)
    if(!obj.email){
      alert("email necessary!")
      return
    }
    else{
      this.authService.forgetEmail(obj).subscribe((response:any)=>{
        console.log("response data from",response);
        if(response.res){
          alert("check your email id for forget password link")
        }
        else if(response.err){
          alert("user not exist")
        }

      })

    }

  }
}
