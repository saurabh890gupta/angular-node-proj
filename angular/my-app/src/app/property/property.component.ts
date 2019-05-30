import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor() { }
isLoggedIn:any;
  ngOnInit() {

   // this.isLoggedIn=localStorage.getItem('loggedIn');
  }
 //for tab system of property  
  tab = 1;
  setTab(newTab){
    this.tab = newTab;

  }
  isSet (tabNum){
      return this.tab === tabNum;
  };
//for tab system of property  
//this comment also for tab system
    //   stepFirst:boolean = true;
    // stepSecond:boolean=false;
    // stepThird:boolean=false;
    // stepFour:boolean=false;
    // setTab(newTab){debugger
    //   this.tab = newTab;
    //   if(this.tab == 1){
    //     this.stepFirst=true;
    //     this.stepSecond=false;
    //     this.stepThird=false;
    //     this.stepFour=false;
    //   }else if(this.tab == 2){
    //     this.stepSecond = true;
    //     this.stepFirst = false;
    //     this.stepThird=false;
    //     this.stepFour=false;
    //   }else if(this.tab == 3){
    //     this.stepThird = true;
    //     this.stepSecond = false;
    //     this.stepFirst = false;
    //     this.stepFour=false;
    //   }else{
    //     this.stepThird = false;
    //     this.stepSecond = false;
    //     this.stepFirst = false;
    //     this.stepFour = true;
    //   }

    // }
    // isSet (tabNum){
    //     return this.tab === tabNum;
    //   };
//this comment also for tab system

// for Property City option 
city=[
  {id: 1, name: "Noida"},
  {id: 2, name: "Ghaziabad"},
  {id: 3, name: "Greater Noida"},
  {id: 4, name: "New Delhi"},
  {id: 5, name: "Kolkata"}, 
];
//end for Property City option 

// for Property state option 
state=[
  {id: 0, name: "Utter Pradesh"},
  {id: 1, name: "Delhi"},
];
//end for Property state option 

//for Property status option 
status=[
  {id: 0, name: "Rent"},
  {id: 1, name: "Buy"}
]
//end for Property status option 

//for Property leasePeriod option 
leasePeriod=[
  {id: 0, name: "1 year"},
  {id: 1, name: "2 year"},
  {id: 2, name: "3 year"}  
]
//end for PropertyleasePeriodoption 
}
