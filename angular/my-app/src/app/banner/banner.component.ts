import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  isLoggedIn:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log(this.isLoggedIn,'isLoggedIn');
    //this use for back button after logout not redirect banner page
    if(sessionStorage.getItem('token')==null){
      this.router.navigate(['']);
    }
    // this.tokenVal = sessionStorage.getItem('token')
    // console.log(this.tokenVal,'token');
    
  }

  city=[
    {id: 0, name: "Noida"},
    {id: 2, name: "Ghaziabad"},
    {id: 3, name: "Greater Noida"},
    {id: 4, name: "New Delhi"},
    {id: 5, name: "Kolkata"}, 
  ];
  status=[
    {id: 0, name: "Noida"},
    {id: 2, name: "Ghaziabad"},
    {id: 3, name: "Greater Noida"},
    {id: 4, name: "New Delhi"},
    {id: 5, name: "Kolkata"}, 
  ];
}
