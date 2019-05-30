import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Router } from '@angular/router';
import { config } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private config:Config,
    private router: Router
    ){
     
     }
    
    signupSubmit(obj){
        const URL = this.config.url + 'signup';
        return this.http.post(URL, obj, httpOptions);
    }

    loginSubmit(formData){
      console.log("--->",formData)
      const URL = this.config.url + 'login';
      console.log("dkjskf",URL)
      return this.http.post(URL, formData,httpOptions);
    }
    logout(){
      const URL = this.config.url + 'logOut';
      return this.http.get(URL, httpOptions);
    }
    contactSubmit(obj){
      const URL=this.config.url + 'contactus';
      return this.http.post(URL,obj,httpOptions);
    }
    forgetEmail(obj){
      const URL=this.config.url+'forgetpassword';
      return this.http.post(URL,obj,httpOptions);
    }
    propertyShow(){
      const URL=this.config.url+'PropertyDataSchema';
      return this.http.get(URL,httpOptions);
    }
}
