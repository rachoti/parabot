import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { SentimentService } from './sentiment.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {
  startDate="2017-01-01";
  endDate="";
  startDate1="";
  datePicCount=0;
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
  d1;
  d2;

  malePercentVal;
  femalePercentVal
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
  
  constructor(private router: Router,private _httpService:SentimentService,public authService: AuthService) { }
  
  ngOnInit() {
    this._httpService.getMessageCount().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
    for(let i=0;i<res.length;i++){
      console.log((new Date(res[i].date).toLocaleDateString()));
    }  
    
  });   
  

  }
  

        dateChanger(startdate: string){
          this.startDate1=startdate;
          this.datePicCount+=1;
        }

        dateChangerEnd(enddate: string)
        {
        this.endDate=enddate;
        this.startDate1;

    var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0)
     .style("position", "absolute")
     .style("text-align","center")
     .style("padding",".5rem")
     .style("background","#FFFFFF")
     .style("color","#313639")
     .style("border","1px solid #313639")
     .style("border-radius","8px")
     .style("pointer-events","none")
     .style("font-size","1rem");

    var date_diff_indays = function(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }
      //console.log(date_diff_indays(this.startDate1,this.endDate));




      
      
    this._httpService.getfulldate().subscribe((res:any[])=>{
    


      let arr=[];
      let index=0;
      for(var i=0;i<res.length-1;i++){
        if((new Date(res[i].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
        }
        index++;
        
      }
      index=index+1;
      var lineData = [];
      var xData = [];
      var count=0
      var sum=date_diff_indays(this.startDate1,this.endDate)
      
      for(var i=index;i<date_diff_indays(this.startDate1,this.endDate)+index+1;i++){
        
         

            var r=res[i].date
           
              var obj ={date:new Date(r),user_count:res[i].count};
              
              
              xData.push(obj);
           
      count=count+1;
    }
    if (count>7){
      console.log("len",xData.length)
    for(var j=xData.length-1;j>=(xData.length-7);j--){
    var s=xData[j]
    lineData.push(s);
    }
  }
    if (count<7){
      console.log("len",xData.length)
    for(var k=0;k<=xData.length-1;k++){
    var l=xData[k]
    lineData.push(l);
    }
    
    
} 
          

  
          var height  = 400;
          var width   = 1000;
          var hEach   = 40;
          var margin = {top: 15, right: 40, bottom: 20, left: 30};
    
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
          
          
          y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 2000]);
          
          var valueline = d3.line()
                  .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.user_count);  })
                  .curve(d3.curveMonotoneX);
          
          svg.append("path")
              .data([lineData]) 
              .attr("class", "line")  
            .attr("d", valueline) 
            .attr("fill","none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", "3");
          
          //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
          var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));
          
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
                this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
                this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
                ;  
      
    });



  }

  dateChangerEndWeek(enddate: string){

    this.endDate=enddate;
    this.startDate1;

var div = d3.select("body").append("div")
 .attr("class", "tooltip-donut")
 .style("opacity", 0)
 .style("position", "absolute")
 .style("text-align","center")
 .style("padding",".5rem")
 .style("background","#FFFFFF")
 .style("color","#313639")
 .style("border","1px solid #313639")
 .style("border-radius","8px")
 .style("pointer-events","none")
 .style("font-size","1rem");

var date_diff_indays = function(date1, date2) {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  //console.log(date_diff_indays(this.startDate1,this.endDate));




  
  
this._httpService.getfulldate().subscribe((res:any[])=>{



  let arr=[];
  let index=0;
  for(var i=0;i<res.length-1;i++){
    if((new Date(res[i].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
      break;
    }
    index++;
    
  }
  index=index+1;
  var lineData = [];
  var xData = [];
  var count=0
  var sum=date_diff_indays(this.startDate1,this.endDate)
  
  for(var i=index;i<date_diff_indays(this.startDate1,this.endDate)+index+1;i++){
    
     

        var r=res[i].date
       if(res[i].day_week=="Tuesday"){
          var obj ={date:new Date(r),user_count:res[i].count};
          
          
          lineData.push(obj);
       
       }
}
console.log(lineData)

 
      


      var height  = 400;
      var width   = 1000;
      var hEach   = 40;
      var margin = {top: 15, right: 40, bottom: 20, left: 30};

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
      
      
      y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 2000]);
      
      var valueline = d3.line()
              .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.user_count);  })
              .curve(d3.curveMonotoneX);
      
      svg.append("path")
          .data([lineData]) 
          .attr("class", "line")  
        .attr("d", valueline) 
        .attr("fill","none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", "3");
      
      //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
      var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));
      
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
            this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
    
            this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
            ;  
  
});

  }

        logout(): void {
          console.log("Logout");
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
