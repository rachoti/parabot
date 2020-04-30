import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { FormControl, Validators } from "@angular/forms";

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
  actdata1="+Activity";
  actdata2="+Compare";
  actdata3="+Conversation";
  actdata4="+Demographics";
  toggleDisplayDiv1() {
    this.isShowDiv1 = !this.isShowDiv1;
    if(this.actdata1==="+Activity"){
      this.actdata1="-Activity";
    }else{
      this.actdata1="+Activity";
    }
    
  }
  
  toggleDisplayDiv2() {
    this.isShowDiv2 = !this.isShowDiv2;
    if(this.actdata2==="+Compare"){
      this.actdata2="-Compare";
    }else{
      this.actdata2=" +Compare";
    }
    
  }

  toggleDisplayDiv3() {
    this.isShowDiv3= !this.isShowDiv3;
    if(this.actdata3==="+Conversation"){
      this.actdata3="- Conversation";
    }else{
      this.actdata3="+ Conversation";
    }
    
  }
  toggleDisplayDiv4() {
    this.isShowDiv4= !this.isShowDiv4;
    if(this.actdata4==="+Demographics"){
      this.actdata4="-Demographics";
    }else{
      this.actdata4="+Demographics";
    }
  }
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/dashboard'])
    

  }



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


  constructor(public http: DashboardserviceService,private router2:ActivatedRoute,private router: Router,private _httpService:DashboardserviceService,public authService: AuthService) { }
  
  ngOnInit() {
    this._httpService.getUserActivity().subscribe((res:any[])=>{
      console.log(localStorage.getItem('token'));
      console.log(res);
      for (let index = 0; index < res.length; index++) {
        this.newUserCount=res[0].Count;
        this.returnUserCount=res[1].Count;
        this.lifetimeUserCount=res[2].Count;
        this.totalActivityUserCount=this.newUserCount+this.returnUserCount+this.lifetimeUserCount;
        console.log(this.newUserCount);
        this.Useractpercentage=(this.newUserCount/this.totalActivityUserCount)*100;
        this.Useractpercentage = this.Useractpercentage.toFixed(2);
        this.returnactpercentage=(this.returnUserCount/this.totalActivityUserCount)*100;
        this.returnactpercentage = this.returnactpercentage.toFixed(2);
      }
      
    });


    this._httpService.getMessageActivity().subscribe((res:any[])=>{
      console.log(res);
      
     // for (let index = 0; index < res.length; index++) {
        this.userMessageCount=res[0].User_count;
        this.wizardMessageCount=res[0].Wizard_count;
        this.totalMessageCount=res[0].total;
        this.totalTodayMessageCount=res[0].User_last;
      //}
      this.WizardMessPercent=(this.wizardMessageCount/this.totalMessageCount)*100;
      this.WizardMessPercent = this.WizardMessPercent.toFixed(2);
      this.userMessPercent=(this.userMessageCount/this.totalMessageCount)*100;
      this.userMessPercent = this.userMessPercent.toFixed(2);
    });





    ////////////////////////////////////////////////live message Graph//////////////////////////////////////

    var lineData = [];
    var maxCount=0;
    var countArray=[];
    this._httpService.getLiveActivity().subscribe((res:any[])=>{
        for(let i=res.length-1;i>=(res.length-7);i--){
          var t=res[i].Time.split(":");
          var dateq = new Date(0);
          dateq.setHours(t[0]); // specify value for hours here
          dateq.setMinutes(t[1]); // specify value for minutes here
          countArray.push(res[i].Count);
          var obj ={date:dateq,user_count:res[i].Count};
          lineData.push(obj);
        }
        console.log(lineData);
        maxCount=Math.max(...countArray)

  var height  = 120;
  var width   = 450;
  var hEach   = 30;

  var margin = {top: 20, right: 25, bottom: 18, left: 10};
  
  width =     width - margin.left - margin.right;
  height =    height - margin.top - margin.bottom;
  
  var svg = d3.select('svg')
    .attr("width",  width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var x = d3.scaleTime().range([0, width]);
    
  x.domain(d3.extent(lineData, function(d) { return d.date; }));
  
  
  var y = d3.scaleLinear().range([height, 0]);
  
  
  y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, maxCount]);
  
  var valueline = d3.line()
          .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.user_count);  })
          .curve(d3.curveMonotoneX);
  
  svg.append("path")
      .data([lineData]) 
      .attr("class", "line")  
    .attr("d", valueline) 
    .attr("fill","none")
    .attr("stroke", "#ffab00")
    .attr("stroke-width", "3");
  
  //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
  var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%H:%M")).tickValues(lineData.map(d=>d.date));
  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis_woy);
  
  //  Add the Y Axis
  //  svg.append("g").call(d3.axisLeft(y));
  
  svg.selectAll(".dot")
      .data(lineData)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d) { return x(d.date) })
      .attr("cy", function(d) { return y(d.user_count) })
      .attr("r", 5);  
  
  
  svg.selectAll(".text")
      .data(lineData)
      .enter()
      .append("text") // Uses the enter().append() method
      .attr("class", "label") // Assign a class for styling
      .attr("x", function(d, i) { return x(d.date) })
      .attr("y", function(d) { return y(d.user_count) })
      .attr("dy", "-5")
      .text(function(d) {return d.user_count; });
  
  svg.append('text')                                     
        .attr('x', 10)              
        .attr('y', -5)             
    
    });
    
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




 
   
  
  
 
 
  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}