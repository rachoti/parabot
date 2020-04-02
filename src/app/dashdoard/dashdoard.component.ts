import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { DashboardserviceService } from './dashdoardservice.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-dashdoard',
  templateUrl: './dashdoard.component.html',
  styleUrls: ['./dashdoard.component.css']
})
export class DashdoardComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  newUserCount;
  returnUserCount;
  lifetimeUserCount;
  totalActivityUserCount;

  userMessageCount;
  wizardMessageCount;
  totalMessageCount;
  totalTodayMessageCount;
  userMessPercent;
  WizardMessPercent;
  Useractpercentage;
  returnactpercentage;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
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
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/dashboard'])
    

  }
 
  constructor(private router: Router,private router2:ActivatedRoute,private _httpService:DashboardserviceService,public authService: AuthService) { 
   
  }
  
  ngOnInit() {
   }
  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}