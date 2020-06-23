import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TransFilter } from './TransFilter';
import { TransearchService } from './transearch.service';
@Component({
  selector: 'app-tran-search',
  templateUrl: './tran-search.component.html',
  styleUrls: ['./tran-search.component.css']
})
export class TranSearchComponent implements OnInit {

  myArray:Array<TransFilter>=new Array();
  mod=new TransFilter('','','');
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2015-01-01";
  endDate="";
  startDate1="";
  datePicCount=0;
  malePercentVal;
  femalePercentVal
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
  d1;
  d2;
  isShowDiv5 = true;
  myFunction() {  
    this.isShowDiv1 = !this.isShowDiv1;
    $("#aa").toggleClass("fa-minus-circle")
} 
myFunction1() {  
  this.isShowDiv2 = !this.isShowDiv2;
  $("#compare").toggleClass("fa-minus-circle")
} 
myFunction2() {  
  this.isShowDiv3= !this.isShowDiv3;
  $("#conversation").toggleClass("fa-minus-circle")
} 
myFunction3() {  
  this.isShowDiv4= !this.isShowDiv4;
  $("#demograp").toggleClass("fa-minus-circle")
} 
myFunction4() {  
  this.isShowDiv5= !this.isShowDiv5;
  $("#settings").toggleClass("fa-minus-circle")
}
  toggleDisplayDiv1() {
    this.isShowDiv1 = !this.isShowDiv1;
    if(this.actdata1==="+ Activity"){
      this.actdata1="- Activity";
    }else{
      this.actdata1="+ Activity";
    }
    
  }
  toggleDisplayDiv2() {
    this.isShowDiv2 = !this.isShowDiv2;
    if(this.actdata2==="+ Compare"){
      this.actdata2="- Compare";
    }else{
      this.actdata2="+ Compare";
    }
    
  }

  toggleDisplayDiv3() {
    this.isShowDiv3= !this.isShowDiv3;
    if(this.actdata3==="+ Conversation"){
      this.actdata3="- Conversation";
    }else{
      this.actdata3="+ Conversation";
    }
  }

  toggleDisplayDiv4() {
    this.isShowDiv4= !this.isShowDiv4;
    if(this.actdata4==="+ Demographics"){
      this.actdata4="- Demographics";
    }else{
      this.actdata4="+ Demographics";
    }
  }
  dateChanger(){
    this.startDate1=this.mod.CstartDate;
    this.datePicCount+=1;
  }
  
  dateChangerEnd(e){
    this.endDate=this.mod.CendDate;

    var date_diff_indays = function(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }
      console.log(date_diff_indays(this.startDate1,this.endDate));

  }


  constructor(private router: Router,private _httpService:TransearchService,public authService: AuthService) { 
    
  }
  SearchKey(tempwords:string){
    this._httpService.TransResults(this.mod).subscribe( data => {
    console.log(data)               
    })
      
  }
  ngOnInit() {
  }
  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
