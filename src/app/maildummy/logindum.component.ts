
import { Component, OnInit, OnChanges } from "@angular/core";

import { FormControl, Validators } from "@angular/forms";
import { LogindumService } from "./logindum.service";
@Component({
  selector: 'app-logindum',
  templateUrl: './logindum.component.html',
  styleUrls: ['./logindum.component.css']
})
export class LogindumComponent implements OnInit {

 
  
  loading = false;
  buttionText = "Submit";

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ])

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  msgFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  constructor(public http: LogindumService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    console.log("name",this.nameFormControl.value)
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      msg: this.msgFormControl.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          ` ${user.name} is successfully register and mail has been sent `
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }

}
