import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css']
})
export class ShowPropertyComponent implements OnInit {
result:any;
  constructor(
    private authService:AuthServiceService,
  ) {

 
   }

  ngOnInit() {
    this.authService.propertyShow()
    .subscribe((response:any) => {
      this.result=response
      console.log("propertyscrollj",this.result);
        });
  }
  

}
