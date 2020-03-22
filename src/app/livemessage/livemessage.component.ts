import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { LivemessageService } from './livemessage.service';
@Component({
  selector: 'app-livemessage',
  templateUrl: './livemessage.component.html',
  styleUrls: ['./livemessage.component.css']
})
export class LivemessageComponent implements OnInit {
 
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
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
  
  constructor(private router: Router,private _httpService:LivemessageService,public authService: AuthService) { }

  ngOnInit() {
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

  var height  = 400;
  var width   = 900;
  var hEach   = 30;

  var margin = {top: 30, right: 25, bottom: 25, left: 30};
  
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

}
