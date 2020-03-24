import { Component, OnInit } from '@angular/core';
import { MessageInService } from './message-in.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-message-in',
  templateUrl: './message-in.component.html',
  styleUrls: ['./message-in.component.css']
})
export class MessageInComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
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
  dateChanger(startdate: string){
    
    
    this.startDate1=startdate;
    
    this.datePicCount+=1;

  }
  
  dateChangerEnd(enddate: string){
    this.endDate=enddate;
    this.startDate1;
    this.inputStartDate=this.startDate1;
    this.inputEndDate=this.endDate;
    this._httpService.getMessageCount().subscribe((res:any[])=>{
        
    
       
      
    });
  }
  constructor(private _httpService:MessageInService) { }

  ngOnInit() {
    
      var lineData = [];
      var markup;
      var tableBody;
      let lineNo = 0;
      let c=0;
      this._httpService.getMessageCount().subscribe((res:any[])=>{
        
        this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
        this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
        this.inputStartDate= this.startDate;
        this.inputEndDate=this.endDate;
       for (let i=0;i<res.length;i++)
       {
        markup = "<tr><td>"+ res[i].text+ "</td><td>"+ res[i].count+ "</td></tr>"; 
        tableBody = $("table tbody"); 
        tableBody.append(markup); 
        lineNo++; 
        c++;
       }
      });  
    
    }

  }


