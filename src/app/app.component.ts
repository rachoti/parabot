
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener } from '@angular/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  public  query   :string;

  public constructor() {
    
      this.query = "Chennai";
      
   
  }



}
