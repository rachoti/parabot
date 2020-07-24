import { Component, OnInit } from '@angular/core';
import { UseravtivityService } from './useractivity.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as d3 from "d3";
@Component({
  selector: 'app-useractivity',
  templateUrl: './useractivity.component.html',
  styleUrls: ['./useractivity.component.css']
})
export class UseractivityComponent implements OnInit {

  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
  startDate1="";
type1;
  datePicCount=0;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
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
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/useractivity'])
    

  }
  myFunction_drop(type)
  {
    console.log(this.startDate1)
    console.log(this.endDate)
    this.type1=type;
  
   console.log("aaa")
   
if(type=="new" && this.startDate1=="")
{
  document.getElementById("divv").innerHTML=" ";
  var lineData = [];
 	this._httpService.  getUserActivity().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].Date).getFullYear())+"-0"+(new Date(res[0].Date).getMonth()+1)+"-0"+(new Date(res[0].Date).getDate());
     this.endDate=""+(new Date(res[res.length-1].Date).getFullYear())+"-0"+(new Date(res[res.length-1].Date).getMonth()+1)+"-0"+(new Date(res[res.length-1].Date).getDate());
     for(let i=res.length-1;i>=(res.length-7);i--){
       var last_date=res[i].Date
     }
     this.inputStartDate= last_date;
    this.inputEndDate=this.endDate;
 			for(let i=res.length-1;i>=(res.length-7);i--){
         console.log();
 				var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
 				lineData.push(obj);
 			}
 var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
else if(type=="ret" && this.startDate1=="")
{
  document.getElementById("divv").innerHTML=" ";
  var lineData = [];
 	this._httpService.  getRetUserCount().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
     this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());
     for(let i=res.length-1;i>=(res.length-7);i--){
       var last_date=""+(new Date(res[i].date).getFullYear())+"-0"+(new Date(res[i].date).getMonth()+1)+"-"+(new Date(res[i].date).getDate());
     }
     this.inputStartDate= last_date;
    this.inputEndDate=this.endDate;
 			for(let i=res.length-1;i>=(res.length-7);i--){
         console.log();
 				var obj ={date:new Date(res[i].date),user_count:res[i].count};
 				lineData.push(obj);
 			}
 var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
else if(type=="tot" && this.startDate1=="")
{
  document.getElementById("divv").innerHTML=" ";
  var lineData = [];
 	this._httpService.  getUserCount().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
     this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());
     for(let i=res.length-1;i>=(res.length-7);i--){
       var last_date=""+(new Date(res[i].date).getFullYear())+"-0"+(new Date(res[i].date).getMonth()+1)+"-"+(new Date(res[i].date).getDate());
     }
     this.inputStartDate= last_date;
    this.inputEndDate=this.endDate;
 			for(let i=res.length-1;i>=(res.length-7);i--){
         console.log();
 				var obj ={date:new Date(res[i].date),user_count:res[i].count};
 				lineData.push(obj);
 			}
 var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
else if(type=="new" && this.startDate1!="")
{
  document.getElementById("divv").innerHTML=" ";
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    this._httpService.getUserActivity().subscribe((res:any[])=>{
      var index=0
  
    for(var j=0;j<res.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(res[j].Date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
        break;
     }
      index++;
    }
    var lineData1 = [];
    for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
      var obj ={date:new Date(res[z].Date),user_count:res[z].count_users};
      console.log(obj)
      lineData1.push(obj);
    }
    var lineData2=[]
    var lineData=[]
    if(lineData1.length>7)
    {
    for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
      var s=lineData1[j]
      lineData2.push(s);
    }
    
    for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
      var s=lineData2[j]
      lineData.push(s);
      }
    }
    else if(lineData1.length<=7)
    {
      for(var j=0;j<lineData1.length;j++)
      {
        var s=lineData1[j]
        lineData.push(s)
      }
    }
    var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
else if(type=="ret" && this.startDate1!="")
{
  document.getElementById("divv").innerHTML=" ";
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    this._httpService.getRetUserCount().subscribe((res:any[])=>{
      var index=0
  
    for(var j=0;j<res.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
        break;
     }
      index++;
    }
    var lineData1 = [];
    for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
      var obj ={date:new Date(res[z].date),user_count:res[z].count};
      console.log(obj)
      lineData1.push(obj);
    }
    var lineData2=[]
    var lineData=[]
    if(lineData1.length>7)
    {
    for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
      var s=lineData1[j]
      lineData2.push(s);
    }
    
    for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
      var s=lineData2[j]
      lineData.push(s);
      }
    }
    else if(lineData1.length<=7)
    {
      for(var j=0;j<lineData1.length;j++)
      {
        var s=lineData1[j]
        lineData.push(s)
      }
    }
    var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
else if(type=="tot" && this.startDate1!="")
{ document.getElementById("divv").innerHTML=" ";
var date_diff_indays = function(date1, date2) {
  
  let dt1 = new Date(date1);
  
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  this._httpService.getUserCount().subscribe((res:any[])=>{
    var index=0

  for(var j=0;j<res.length;j++){
    
    //console.log(new Date(this.startDate1))
    //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
   if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
      break;
   }
    index++;
  }
  var lineData1 = [];
  for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
    var obj ={date:new Date(res[z].date),user_count:res[z].count};
    console.log(obj)
    lineData1.push(obj);
  }
  var lineData2=[]
  var lineData=[]
  if(lineData1.length>7)
  {
  for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
    var s=lineData1[j]
    lineData2.push(s);
  }
  
  for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
    var s=lineData2[j]
    lineData.push(s);
    }
  }
  else if(lineData1.length<=7)
  {
    for(var j=0;j<lineData1.length;j++)
    {
      var s=lineData1[j]
      lineData.push(s)
    }
  }
  var height  = 400;
var width   = 1000;
var hEach   = 40;

var margin = {top: 15, right: 40, bottom: 20, left: 30};

width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;

var svg = d3.select('#divv')
.append("svg")
 .attr("width",  width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().range([0, width]);

x.domain(d3.extent(lineData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

var valueline = d3.line()
       .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
       .curve(d3.curveMonotoneX);

svg.append("path")
   .data([lineData]) 
   .attr("class", "line")  
 .attr("d", valueline) 
 .attr("fill","none")
 .attr("stroke", "#ffab00")
 .attr("stroke-width", "3");

var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis_woy);

//Add the Y Axis
svg.append("g").call(d3.axisLeft(y));

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
  dateChanger(startdate: string){
    
    
    this.startDate1=startdate;
    
    this.datePicCount+=1;

  } 
  dateChangerEnd(enddate: string){
  
  this.endDate=enddate;
  this._httpService.getRetUserCount().subscribe((res:any[])=>{
    this.startDate1= ""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
    var b;
    for(var j=res.length-1;j>=0;j--)
    {
      if(new Date(res[j].date).toLocaleDateString()==new Date(this.endDate).toLocaleDateString())
      {
        b=j-6;
      }
    }
    console.log("aaaaaaaaaaaaaaa")
    if(b>=0)
    {
    this.inputStartDate=""+(new Date(res[b].date).getFullYear())+"-0"+(new Date(res[b].date).getMonth()+1)+"-"+(new Date(res[b].date).getDate());;
    }
    else if(b<0)
    {
      this.inputStartDate=this.startDate1;
    }
    this.inputEndDate=this.endDate;
    });
    
  this.inputEndDate=this.endDate;
  if(this.type1=='new' || this.type1==null)
  {
    
  document.getElementById("divv").innerHTML=" ";
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    this._httpService.getUserActivity().subscribe((res:any[])=>{
      var index=0
  
    for(var j=0;j<res.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(res[j].Date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
        break;
     }
      index++;
    }
    
    var lineData1= [];
    for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
      var obj ={date:new Date(res[z].Date),user_count:res[z].count_users};
      console.log(obj)
      lineData1.push(obj);
    }
    var lineData2=[]
    var lineData=[]
    if(lineData1.length>7)
    {
    for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
      var s=lineData1[j]
      lineData2.push(s);
    }
    
    for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
      var s=lineData2[j]
      lineData.push(s);
      }
    }
    else if(lineData1.length<=7)
    {
      for(var j=0;j<lineData1.length;j++)
      {
        var s=lineData1[j]
        lineData.push(s)
      }
    }
    console.log(lineData)
   console.log(lineData.length)
    var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
  else if(this.type1=='ret')
  {
    console.log(this.startDate1)
    document.getElementById("divv").innerHTML=" ";
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    this._httpService.getRetUserCount().subscribe((res:any[])=>{
      var index=0
  
    for(var j=0;j<res.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
        break;
     }
      index++;
    }
    var lineData1 = [];
    for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
      var obj ={date:new Date(res[z].date),user_count:res[z].count};
      console.log(obj)
      lineData1.push(obj);
    }
    var lineData2=[]
    var lineData=[]
    if(lineData1.length>7)
    {
    for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
      var s=lineData1[j]
      lineData2.push(s);
    }
    
    for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
      var s=lineData2[j]
      lineData.push(s);
      }
    }
    else if(lineData1.length<=7)
    {
      for(var j=0;j<lineData1.length;j++)
      {
        var s=lineData1[j]
        lineData.push(s)
      }
    }
   
    var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
  else if(this.type1=='tot')
  {
    
    console.log(this.endDate)
    document.getElementById("divv").innerHTML=" ";
var date_diff_indays = function(date1, date2) {
  
  let dt1 = new Date(date1);
  
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  this._httpService.getUserCount().subscribe((res:any[])=>{
    this.startDate1= ""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());

    var index=0

  for(var j=0;j<res.length;j++){
    
    //console.log(new Date(this.startDate1))
    //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
   if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
      break;
   }
    index++;
  }
  var lineData1 = [];
  for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
    var obj ={date:new Date(res[z].date),user_count:res[z].count};
    console.log(obj)
    lineData1.push(obj);
  }
  var lineData2=[]
  var lineData=[]
  if(lineData1.length>7)
  {
  for(var j=lineData1.length-1;j>=(lineData1.length-7);j--){
    var s=lineData1[j]
    lineData2.push(s);
  }
  
  for(var j=lineData2.length-1;j>=(lineData2.length-7);j--){
    var s=lineData2[j]
    lineData.push(s);
    }
  }
  else if(lineData1.length<=7)
  {
    for(var j=0;j<lineData1.length;j++)
    {
      var s=lineData1[j]
      lineData.push(s)
    }
  }
  var height  = 400;
var width   = 1000;
var hEach   = 40;

var margin = {top: 15, right: 40, bottom: 20, left: 30};

width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;

var svg = d3.select('#divv')
.append("svg")
 .attr("width",  width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().range([0, width]);

x.domain(d3.extent(lineData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

var valueline = d3.line()
       .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
       .curve(d3.curveMonotoneX);

svg.append("path")
   .data([lineData]) 
   .attr("class", "line")  
 .attr("d", valueline) 
 .attr("fill","none")
 .attr("stroke", "#ffab00")
 .attr("stroke-width", "3");

var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis_woy);

//Add the Y Axis
svg.append("g").call(d3.axisLeft(y));

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
  constructor(private router: Router,public authService: AuthService,  private _httpService:UseravtivityService) { 
    
  }


  ngOnInit() {

    var lineData = [];
 	this._httpService.  getUserActivity().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].Date).getFullYear())+"-0"+(new Date(res[0].Date).getMonth()+1)+"-0"+(new Date(res[0].Date).getDate());
     this.endDate=""+(new Date(res[res.length-1].Date).getFullYear())+"-0"+(new Date(res[res.length-1].Date).getMonth()+1)+"-0"+(new Date(res[res.length-1].Date).getDate());
     for(let i=res.length-1;i>=(res.length-7);i--){
       var last_date=res[i].Date
     }
     this.inputStartDate= last_date;
    this.inputEndDate=this.endDate;
 			for(let i=res.length-1;i>=(res.length-7);i--){
         console.log();
 				var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
 				lineData.push(obj);
 			}
 var height  = 400;
 var width   = 1000;
 var hEach   = 40;

 var margin = {top: 15, right: 40, bottom: 20, left: 30};

 width =     width - margin.left - margin.right;
 height =    height - margin.top - margin.bottom;

 var svg = d3.select('#divv')
 .append("svg")
   .attr("width",  width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var x = d3.scaleTime().range([0, width]);
  
 x.domain(d3.extent(lineData, function(d) { return d.date; }));


 var y = d3.scaleLinear().range([height, 0]);


 y.domain([d3.min(lineData, function(d) { return d.user_count; }) , 10]);

 var valueline = d3.line()
         .x(function(d) { return x(d.date); }) 		.y(function(d) { return y(d.user_count);  })
         .curve(d3.curveMonotoneX);

 svg.append("path")
     .data([lineData]) 
     .attr("class", "line")  
 	.attr("d", valueline) 
 	.attr("fill","none")
 	.attr("stroke", "#ffab00")
 	.attr("stroke-width", "3");

  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
 var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

 svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis_woy);

  //Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

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
