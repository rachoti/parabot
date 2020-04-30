import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ComponentFactoryResolver} from '@angular/core';
import * as d3 from 'd3';
import { CompareService } from './compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  aa;
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
  startDate1="";
  startDate2="2017-01-01";
  endDate2="";
  inputStartDate2="";
  inputEndDate2="";
  startDate3="";
  datePicCount=0;
  actdata1="+Activity";
  actdata2="+Compare";
  actdata3="+Conversation";
  actdata4="+Demographics";
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  newUserCount;
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
  @ViewChild('barChart')
  private chartContainer: ElementRef;

  @Input()


  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor(private _httpService:CompareService) { }

  ngOnInit() {
    this._httpService.getNewUserCount().subscribe((res:any[])=>{
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
      this.startDate2=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      this.endDate2=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());

    });

  }
  dateChanger(startdate: string){
   
    this.startDate1=startdate;
    console.log(this.startDate1)
    this.datePicCount+=1;
  }
  dateChangerEnd(enddate: string){
    console.log(enddate)
    this.endDate=enddate;
    this.startDate1;
    this.inputStartDate=this.startDate1;
    this.inputEndDate=this.endDate;
   // this.createChart(this.startDate1,this.endDate);
  }
  dateChanger1(startdate: string){
    
    this.startDate3=startdate;
    this.datePicCount+=1;
  }
  dateChangerEnd1(enddate: string){
    console.log(enddate)
    this.startDate1;
    this.endDate;
    this.endDate2=enddate;
    this.startDate3;
    this.inputStartDate2=this.startDate3;
    this.inputEndDate2=this.endDate2;
  this.createChart(this.startDate1,this.endDate,this.startDate3,this.endDate2);
  }
 myFunction(type) {
  var startDate1=this.startDate1;
  var endDate1=this.endDate;
  var startDate2=this.startDate3;
  var endDate2=this.endDate2
   if(type=="new_user")
{
   document.getElementById("div_template").innerHTML=" ";
  
   this.createChart(startDate1,endDate1,startDate2,endDate2)
}
   else  if(type=="ret_user")
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart1(startDate1,endDate1,startDate2,endDate2)
   }
   else  if(type=="message")
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart2(startDate1,endDate1,startDate2,endDate2)
   }
   else if(type=="gender")
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart3(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="user")
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart4(startDate1,endDate1,startDate2,endDate2)



   }
    
  }
  sum1;
  sum2;
  sum1_m;
  sum1_f;
  sum2_m;
  sum2_f;
  private createChart(startDate1,endDate1,startDate2,endDate2): void {
  //private createChart(): void{
   /* var startDate1=this.startDate1;
    var endDate1=this.endDate;
    var startDate2=this.startDate3;
    var endDate2=this.endDate2*/
    var index1=0;
    var index2=0;
    this._httpService.getNewUserCount().subscribe((res:any[])=>{
      this.aa=res[0].date;
     for(var i=0;i<res.length;i++)
     {
      
      if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate1).toLocaleDateString())){
        break;
     }
      index1++;
     }
     for(var i=0;i<res.length;i++)
     {
      
      if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate2).toLocaleDateString())){
        break;
     }
      index2++;
     }
   
    this.sum1=0;
   
     for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
     {
     
        this.sum1+=res[z].count;
        if(z==res.length-1)
        break;
     }
     this.sum2=0;
     for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
     {
        this.sum2+=res[a].count;
        if(a==res.length-1)
        break;
     }
 var max=Math.max(this.sum1,this.sum2)
 var range=max+1;

    var final=[]
    
    var line1={date:startDate1+"\t\t\tto\t\t\t "+endDate1,count:this.sum1} 
    var line2={date:startDate2+"\t\tto\t\t "+endDate2,count:this.sum2} 

final.push(line1,line2)

//var fin=[final[0][0],final[1][0]]

var lineData=[];
for(let i=0;i<final.length;i++){
  var obj ={date:final[i].date,count:final[i].count};
  console.log(obj)
  lineData.push(obj);
}

var height  = 400;
var width   = 1000;
var hEach   = 40;
var i=0;

var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
.range(["blue","orange"]);
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;


//remove and create svg
document.getElementById("alignCenter_b1").textContent = "";
document.getElementById("alignCenter_b2").textContent = "";
document.getElementById("colorFillMale_b1").style.border = "";
document.getElementById("colorFillMale_b2").style.border = "";
document.getElementById("colorFillMale_b1").style.background = "";
document.getElementById("colorFillMale_b2").style.background = "";
document.getElementById("p_b1").textContent="";
document.getElementById("p_b2").textContent="";
document.getElementById("colorFillMale_b3").style.border = "";
document.getElementById("colorFillMale_b4").style.border = "";
document.getElementById("colorFillMale_b3").style.background = "";
document.getElementById("colorFillMale_b4").style.background = "";
document.getElementById("p_b3").textContent="";
document.getElementById("p_b4").textContent="";
document.getElementById("alignCenter").textContent = "Bot 1 New User Count";
document.getElementById("alignCenter1").textContent = "Bot 2 New User Count";
document.getElementById("pa").textContent = this.sum1;
document.getElementById("pa1").textContent = this.sum2;
document.getElementById("colorFillMale").style.background = "blue";
document.getElementById("colorFillFeMale").style.background = "orange";
document.getElementById("colorFillMale").style.border ="1px solid black";
document.getElementById("colorFillFeMale").style.border ="1px solid black";



var svg = d3.select('#div_template')
.append("svg")
.attr("width",  width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x = d3.scaleBand()
  .range([ 0, 400 ])
  .domain(lineData.map(function(d) { return d.date; }))
  .padding(0.2)
  
svg.append("g")

.attr("transform", "translate(0," + height + ")")
.style("font-weight","bold")
.style("font-size","13px")
.call(d3.axisBottom(x).tickSizeOuter(0))

/*svg.append("g")
.style("font-weight","bold")*/
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 11])
  .range([ height+2, 0]);
svg.append("g")
.style("font-weight","bold")
.style("font-size","15px")
  .call(d3.axisLeft(y))
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width-250)
  .attr("y", height + margin.top + 50)
  .text("Date")
  .style("font-weight","bold")
  .style("font-size","20px");
        
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+450)
  .attr("x", -margin.top-80)
  .text("Count")
  .style("font-weight","bold")
  .style("font-size","20px");
     
 

// Bars
var Tooltip = d3.select('#div_template')
.append('div')
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px")
  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
   
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("Date: " + d.date+"<br>Count: "+d.count)
      .style("left", (d3.mouse(this)[0]+500) + "px")
      .style("top", (d3.mouse(this)[1]+150) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }



      
svg.selectAll("mybar")
  .data(lineData)
  .enter()
   .append("rect")
    .attr("x", function(d) { return x(d.date); })
    .attr("y", function(d) { return y(d.count); })
    .attr("width", 150)
    .attr("height", function(d) { return height - y(d.count); })
    .attr("fill", function(d){ return myColor(d.date) })
  
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
   
  

    var size = 17;
    svg.append("rect").
    attr("x", 60)
    .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "blue")
    
    svg.append("rect").
    attr("x", 240)
    .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "orange")
    svg.append("text").attr("x", 90).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    svg.append("text").attr("x", 270).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")

});
   
  }
  private createChart1(startDate1,endDate1,startDate2,endDate2): void {
    //private createChart(): void{
     /* var startDate1=this.startDate1;
      var endDate1=this.endDate;
      var startDate2=this.startDate3;
      var endDate2=this.endDate2*/
      var index1=0;
      var index2=0;
      this._httpService.getRetUserCount().subscribe((res:any[])=>{
       for(var i=0;i<res.length;i++)
       {
        if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate1).toLocaleDateString())){
          break;
       }
        index1++;
       }
       for(var i=0;i<res.length;i++)
       {
        if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate2).toLocaleDateString())){
          break;
       }
        index2++;
       }
      this.sum1=0;
      this.sum2=0;
       
       for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
       {
          this.sum1+=res[z].count;
        
          if(z==res.length-1)
        break;
       }
      
      
       for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
       {
          this.sum2+=res[a].count;
          if(a==res.length-1)
        break;
       }
      var max=Math.max(this.sum1,this.sum2)
       var range=max;
      for(var c=0;(range%10)!=0;c++)
      {
          range++;
      }
    console.log(range)

  
      var final=[]
      
      var line1={date:startDate1+"\t\t\tto\t\t\t "+endDate1,count:this.sum1} 
      var line2={date:startDate2+"\t\tto\t\t "+endDate2,count:this.sum2} 
  
  final.push(line1,line2)
  
  //var fin=[final[0][0],final[1][0]]
  
  var lineData=[];
  for(let i=0;i<final.length;i++){
    var obj ={date:final[i].date,count:final[i].count};
    console.log(obj)
    lineData.push(obj);
  }
  
  var height  = 400;
  var width   = 1000;
  var hEach   = 40;
  var i=0;
  
  var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
  .range(["blue","orange"]);
  var margin = {top: 15, right: 40, bottom: 100, left:500};
  
  width =     width - margin.left - margin.right;
  height =    height - margin.top - margin.bottom;
  
  
  //remove and create svg
  document.getElementById("alignCenter_b1").textContent = "";
document.getElementById("alignCenter_b2").textContent = "";
document.getElementById("colorFillMale_b1").style.border = "";
document.getElementById("colorFillMale_b2").style.border = "";
document.getElementById("colorFillMale_b1").style.background = "";
document.getElementById("colorFillMale_b2").style.background = "";
document.getElementById("p_b1").textContent="";
document.getElementById("p_b2").textContent="";
document.getElementById("colorFillMale_b3").style.border = "";
document.getElementById("colorFillMale_b4").style.border = "";
document.getElementById("colorFillMale_b3").style.background = "";
document.getElementById("colorFillMale_b4").style.background = "";
document.getElementById("p_b3").textContent="";
document.getElementById("p_b4").textContent="";
  document.getElementById("alignCenter").textContent = "Bot 1 Returning User Count";


document.getElementById("alignCenter1").textContent = "Bot 2 Returning User Count";
document.getElementById("pa").textContent = this.sum1;
document.getElementById("pa1").textContent = this.sum2;
document.getElementById("colorFillMale").style.background = "blue";
document.getElementById("colorFillFeMale").style.background = "orange";
document.getElementById("colorFillMale").style.border ="1px solid black";
document.getElementById("colorFillFeMale").style.border ="1px solid black";


  var svg = d3.select('#div_template')
  .append("svg")
  .attr("width",  width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var x = d3.scaleBand()
    .range([ 0, 400 ])
    .domain(lineData.map(function(d) { return d.date; }))
    .padding(0.2)
    
  svg.append("g")
  
  .attr("transform", "translate(0," + height + ")")
  .style("font-weight","bold")
.style("font-size","13px")
  .call(d3.axisBottom(x).tickSizeOuter(0))
  
  svg.append("g")
  .style("font-weight","bold")
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, range])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .style("font-weight","bold");
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width-250)
    .attr("y", height + margin.top + 50)
    .text("Date")
    .style("font-weight","bold")
    .style("font-size","20px");
          
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+450)
    .attr("x", -margin.top-80)
    .text("Count")
    .style("font-weight","bold")
    .style("font-size","20px");
     
  // Bars
  var Tooltip = d3.select('#div_template')
  .append('div')
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      console.log("mouse hover")
      Tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      Tooltip
        .html("Date: " + d.date+"<br>Count: "+d.count)
        .style("left", (d3.mouse(this)[0]+500) + "px")
        .style("top", (d3.mouse(this)[1]+150) + "px")
    }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
    }
  svg.selectAll("mybar")
    .data(lineData)
    .enter()
     .append("rect")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", 150)
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", function(d){ return myColor(d.date) })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      
    
      var size = 17;
      svg.append("rect").
      attr("x", 60)
      .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "blue")
      
      svg.append("rect").
      attr("x", 240)
      .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "orange")
      svg.append("text").attr("x", 90).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 270).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
  
  });
     
    }
  summm1;
  summm2;
    private createChart2(startDate1,endDate1,startDate2,endDate2): void {
      //private createChart(): void{
       /* var startDate1=this.startDate1;
        var endDate1=this.endDate;
        var startDate2=this.startDate3;
        var endDate2=this.endDate2*/
        var index1=0;
        var index2=0;
        this._httpService.getMessageCount().subscribe((res:any[])=>{
         for(var i=0;i<res.length;i++)
         {
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate1).toLocaleDateString())){
            break;
         }
          index1++;
         }
         for(var i=0;i<res.length;i++)
         {
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate2).toLocaleDateString())){
            break;
         }
          index2++;
         }
         var sum1=0;
         var sum2=0;
         var temp1=0;
     var temp2=0;
         for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
         {
           temp1++;
             sum1+=res[z].count;
            if(z==res.length-1)
            break;
         }
         console.log("aaa"+temp1)
         this.summm1=sum1/temp1;
         
       
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            sum2+=res[a].count;
            temp2++;
            if(a==res.length-1)
             break;
         }
         
         console.log("aaa"+temp1)
         this.summm2=sum2/temp2;
        
    var max=Math.max(Math.round(this.summm1),Math.round(this.summm2))
    var range=max;
    for(var c=0;(range%100)!=0;c++)
    {
        range++;
    }
    console.log(range)
        var final=[]
        
        var line1={date:startDate1+"\t\t\tto\t\t\t "+endDate1,count:Math.round(this.summm1)} 
        var line2={date:startDate2+"\t\tto\t\t "+endDate2,count:Math.round(this.summm2)} 
    
    final.push(line1,line2)
    
    //var fin=[final[0][0],final[1][0]]
    
    var lineData=[];
    for(let i=0;i<final.length;i++){
      var obj ={date:final[i].date,count:final[i].count};
      console.log(obj)
      lineData.push(obj);
    }
    
    var height  = 400;
    var width   = 1000;
    var hEach   = 40;
    var i=0;
    
    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
    var margin = {top: 15, right: 40, bottom: 100, left:500};
    
    width =     width - margin.left - margin.right;
    height =    height - margin.top - margin.bottom;
    
    this.summm1=Math.round(this.summm1);
    this.summm2=Math.round(this.summm2)
    //remove and create svg
    document.getElementById("alignCenter_b1").textContent = "";
document.getElementById("alignCenter_b2").textContent = "";
document.getElementById("colorFillMale_b1").style.border = "";
document.getElementById("colorFillMale_b2").style.border = "";
document.getElementById("colorFillMale_b1").style.background = "";
document.getElementById("colorFillMale_b2").style.background = "";
document.getElementById("p_b1").textContent="";
document.getElementById("p_b2").textContent="";
document.getElementById("colorFillMale_b3").style.border = "";
document.getElementById("colorFillMale_b4").style.border = "";
document.getElementById("colorFillMale_b3").style.background = "";
document.getElementById("colorFillMale_b4").style.background = "";
document.getElementById("p_b3").textContent="";
document.getElementById("p_b4").textContent="";
    document.getElementById("alignCenter").textContent = "Bot 1 Message Count";


document.getElementById("alignCenter1").textContent = "Bot 2 Message  Count";
document.getElementById("pa").textContent = this.summm1;
document.getElementById("pa1").textContent = this.summm2;
document.getElementById("colorFillMale").style.background = "blue";
document.getElementById("colorFillFeMale").style.background = "orange";
document.getElementById("colorFillMale").style.border ="1px solid black";
document.getElementById("colorFillFeMale").style.border ="1px solid black";
    
    var svg = d3.select('#div_template')
    .append("svg")
    .attr("width",  width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
      .range([ 0, 400 ])
      .domain(lineData.map(function(d) { return d.date; }))
      .padding(0.2)
      
    svg.append("g")
    
    .attr("transform", "translate(0," + height + ")")
    .style("font-weight","bold")
.style("font-size","13px")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    
    svg.append("g")
    .style("font-weight","bold")
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, range])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .style("font-weight","bold");
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-250)
      .attr("y", height + margin.top + 50)
      .text("Date")
      .style("font-weight","bold")
      .style("font-size","20px");
            
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+450)
      .attr("x", -margin.top-80)
      .text("Count")
      .style("font-weight","bold")
      .style("font-size","20px");
         
    // Bars
    var Tooltip = d3.select('#div_template')
    .append('div')
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        console.log("mouse hover")
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("Date: " + d.date+"<br>Count: "+d.count)
          .style("left", (d3.mouse(this)[0]+500) + "px")
          .style("top", (d3.mouse(this)[1]+150) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
      }
    svg.selectAll("mybar")
      .data(lineData)
      .enter()
       .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", 150)
        .attr("height", function(d) { return height - y(d.count); })
        .attr("fill", function(d){ return myColor(d.date) })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        
      
    
        var size = 17;
        var size = 17;
    svg.append("rect").
    attr("x", 60)
    .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "blue")
    
    svg.append("rect").
    attr("x", 240)
    .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "orange")
    svg.append("text").attr("x", 90).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    svg.append("text").attr("x", 270).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    
    });
       
      }
      private createChart3(startDate1,endDate1,startDate2,endDate2): void {
        var index1=0;
        var index2=0;
        this._httpService.getGenderCount().subscribe((res:any[])=>{
          for(var i=0;i<res.length;i++)
         {
          
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate1).toLocaleDateString())){
            break;
         }
          index1++;
         }
         for(var i=0;i<res.length;i++)
         {
          
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate2).toLocaleDateString())){
            break;
         }
          index2++;
         }
         this.sum1_m=0;
         this.sum1_f=0;
         for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
         {
         
            this.sum1_m+=res[z].Male;;
            if(z==res.length-1)
            break;
         }
         for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
         {
         
            this.sum1_f+=res[z].Female;;
            if(z==res.length-1)
            break;
         }
         this.sum2_m=0;
         this.sum2_f=0;
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            this.sum2_m+=res[a].Male;
            if(a==res.length-1)
            break;
         }
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            this.sum2_f+=res[a].Female;
            if(a==res.length-1)
            break;
         }
         var max1=Math.max(this.sum1_m,this.sum1_f,this.sum2_m,this.sum2_f)
        console.log(max1)
        var range=max1;
        for(var c=0;(range%5)!=0;c++)
        {
            range++;
        }
        console.log(range)
    
        // var max=Math.max(max1,max2)
         //console.log(max)
         console.log(this.sum1_m)
         console.log(this.sum1_f)
         console.log(this.sum2_m)
         console.log(this.sum2_f)
         var final=[]
        
        var line1={date:startDate1+"\t\t\tto\t\t\t "+endDate1,male:this.sum1_m,female:this.sum1_f} 
        var line2={date:startDate2+"\t\tto\t\t "+endDate2,male:this.sum2_m,female:this.sum2_f}
        final.push(line1,line2)
    
        //var fin=[final[0][0],final[1][0]]
        
        var lineData=[];
        for(let i=0;i<final.length;i++){
          var obj ={date:final[i].date,male:final[i].male,female:final[i].female};
         
          lineData.push(obj);
        }
        console.log(lineData)
        
       var container = d3.select('#div_template'),
      width = 920,
      height = 380,
      margin = {top: 25, right: 40, bottom: 100, left:500},
      //{top: 15, right: 40, bottom: 100, left:500};
      barPadding = .2,
      axisTicks = {qty: 6, outerSize: 0, dateFormat: '%m-%d'};
      var svg = container
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);
     var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
     var xScale1 = d3.scaleBand()
     console.log(height - margin.top - margin.bottom)
     var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
     var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
     var yAxis = d3.axisLeft(yScale).ticks(10).tickSizeOuter(axisTicks.outerSize);
     xScale0.domain(lineData.map(d => d.date))
     xScale1.domain(['male', 'female']).range([0, xScale0.bandwidth()])
     yScale.domain([0, d3.max(lineData, d => d.male > d.female ? d.male : d.female)])
     var Tooltip = d3.select('#div_template')
    .append('div')
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
       
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("Date: " + d.date+"<br>Male Count: "+d.male)
          .style("left", (d3.mouse(this)[0]+500) + "px")
          .style("top", (d3.mouse(this)[1]+150) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
      }
      var mouseover1 = function(d) {
       
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove1 = function(d) {
        Tooltip
          .html("Date: " + d.date+"<br>Feamale Count: "+d.female)
          .style("left", (d3.mouse(this)[0]+500) + "px")
          .style("top", (d3.mouse(this)[1]+150) + "px")
      }
      var mouseleave1 = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
      }
     var date = svg.selectAll(".date")
  .data(lineData)
  .enter().append("g")
  .attr("class", "date")
  .attr("transform", d => `translate(${xScale0(d.date)},0)`)

    // Bars
    svg.append("text")
    .attr("text-anchor", "end")
   // .attr("x", 90)
   // .attr("y",325)
    .attr("x", width-710)
     .attr("y", height-margin.top-30)
    .text("Date")
    .style("font-weight","bold")
    .style("font-size","20px");
          
          
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+450)
    .attr("x", -margin.top-80)
    .text("Count")
    .style("font-weight","bold")
    .style("font-size","20px");
  date.selectAll(".bar.male")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar male")
.style("fill","green")


  .attr("x", d => xScale1('male'))
  .attr("y", d => yScale(d.male))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.male)
  })
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
 ;
 
date.selectAll(".bar.female")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar female")
.style("fill","red")
  .attr("x", d => xScale1('female'))
  .attr("y", d => yScale(d.female))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.female)
  })
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1)
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", 'translate(0,255)')
     .style("font-weight","bold")
     .style("font-size","13px")
     .call(xAxis);
     svg.append("g")
     .attr("class", "y axis")
     .style("font-weight","bold")
     .style("font-size","13px")
     
     .call(yAxis);
    
     document.getElementById("alignCenter").textContent = "";
     document.getElementById("alignCenter1").textContent = "";
     document.getElementById("pa").textContent = " ";
     document.getElementById("pa1").textContent = " ";
     document.getElementById("colorFillMale").style.background = "";
     document.getElementById("colorFillFeMale").style.background = "";
     document.getElementById("colorFillMale").style.border ="";
     document.getElementById("colorFillFeMale").style.border ="";
     document.getElementById("alignCenter_b1").textContent = "Bot 1 Gender Count";
     document.getElementById("alignCenter_b2").textContent = "Bot 2 Gender Count";
     document.getElementById("colorFillMale_b1").style.border = "1px solid black";
     document.getElementById("colorFillMale_b2").style.border = "1px solid black";
     document.getElementById("colorFillMale_b1").style.background = "Green";
     document.getElementById("colorFillMale_b2").style.background = "Green";
     document.getElementById("p_b1").textContent="Male Users: "+this.sum1_m;
     document.getElementById("p_b2").textContent="Male Users: "+this.sum2_m;
     document.getElementById("colorFillMale_b3").style.border = "1px solid black";
     document.getElementById("colorFillMale_b4").style.border = "1px solid black";
     document.getElementById("colorFillMale_b3").style.background = "Red";
     document.getElementById("colorFillMale_b4").style.background = "Red";
     document.getElementById("p_b3").textContent="Female Users: "+this.sum1_f;
     document.getElementById("p_b4").textContent="Feamle Users: "+this.sum2_f;

     
     
     var size = 17;
    
     
    
     svg.append("text").attr("x", 75).attr("y", 295).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
     svg.append("text").attr("x", 250).attr("y", 295).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")   
        
});      

      }
      private createChart4(startDate1,endDate1,startDate2,endDate2): void {

        var index1=0;
        var index2=0;
        this._httpService.getUserCount().subscribe((res:any[])=>{
          
         for(var i=0;i<res.length;i++)
         {
          
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate1).toLocaleDateString())){
            break;
         }
          index1++;
         }
         for(var i=0;i<res.length;i++)
         {
          
          if((new Date(res[i].date).toLocaleDateString())==(new Date(startDate2).toLocaleDateString())){
            break;
         }
          index2++;
         }
       
        this.sum1=0;
       
         for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
         {
         
            this.sum1+=res[z].count;
            if(z==res.length-1)
            break;
         }
         this.sum2=0;
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            this.sum2+=res[a].count;
            if(a==res.length-1)
            break;
         }
         var max=Math.max(this.sum1,this.sum2)
         var range=max;
        for(var c=0;(range%10)!=0;c++)
        {
            range++;
        }
    
        var final=[]
        
        var line1={date:startDate1+"\t\t\tto\t\t\t "+endDate1,count:this.sum1} 
        var line2={date:startDate2+"\t\tto\t\t "+endDate2,count:this.sum2} 
    
    final.push(line1,line2)
    
    //var fin=[final[0][0],final[1][0]]
    
    var lineData=[];
    for(let i=0;i<final.length;i++){
      var obj ={date:final[i].date,count:final[i].count};
      console.log(obj)
      lineData.push(obj);
    }
    
    var height  = 400;
    var width   = 1000;
    var hEach   = 40;
    var i=0;
    
    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
    var margin = {top: 15, right: 40, bottom: 100, left:500};
    width =     width - margin.left - margin.right;
    height =    height - margin.top - margin.bottom;
    
    
    //remove and create svg
    document.getElementById("alignCenter_b1").textContent = "";
document.getElementById("alignCenter_b2").textContent = "";
document.getElementById("colorFillMale_b1").style.border = "";
document.getElementById("colorFillMale_b2").style.border = "";
document.getElementById("colorFillMale_b1").style.background = "";
document.getElementById("colorFillMale_b2").style.background = "";
document.getElementById("p_b1").textContent="";
document.getElementById("p_b2").textContent="";
document.getElementById("colorFillMale_b3").style.border = "";
document.getElementById("colorFillMale_b4").style.border = "";
document.getElementById("colorFillMale_b3").style.background = "";
document.getElementById("colorFillMale_b4").style.background = "";
document.getElementById("p_b3").textContent="";
document.getElementById("p_b4").textContent="";
    document.getElementById("alignCenter").textContent = "Bot 1 Total User Count";
    document.getElementById("alignCenter1").textContent = "Bot 2 Total User Count";
    document.getElementById("pa").textContent = this.sum1;
    document.getElementById("pa1").textContent = this.sum2;
    document.getElementById("colorFillMale").style.background = "blue";
    document.getElementById("colorFillFeMale").style.background = "orange";
    document.getElementById("colorFillMale").style.border ="1px solid black";
    document.getElementById("colorFillFeMale").style.border ="1px solid black";
    
    
    
    var svg = d3.select('#div_template')
    .append("svg")
    .attr("width",  width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
      .range([ 0, 400 ])
      .domain(lineData.map(function(d) { return d.date; }))
      .padding(0.2)
      
    svg.append("g")
    
    .attr("transform", "translate(0," + height + ")")
    .style("font-weight","bold")
    .style("font-size","13px")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    
    /*svg.append("g")
    .style("font-weight","bold")*/
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0,range])
      .range([ height+2, 0]);
    svg.append("g")
    .style("font-weight","bold")
    .style("font-size","15px")
      .call(d3.axisLeft(y))
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-250)
      .attr("y", height + margin.top + 50)
      .text("Date")
      .style("font-weight","bold")
      .style("font-size","20px");
            
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+450)
      .attr("x", -margin.top-80)
      .text("Count")
      .style("font-weight","bold")
      .style("font-size","20px");
         
     
    
    // Bars
    var Tooltip = d3.select('#div_template')
    .append('div')
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
       
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("Date: " + d.date+"<br>Count: "+d.count)
          .style("left", (d3.mouse(this)[0]+500) + "px")
          .style("top", (d3.mouse(this)[1]+150) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
      }
    
    
    
          
    svg.selectAll("mybar")
      .data(lineData)
      .enter()
       .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", 150)
        .attr("height", function(d) { return height - y(d.count); })
        .attr("fill", function(d){ return myColor(d.date) })
      
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
       
      
    
        var size = 17;
        svg.append("rect").
        attr("x", 60)
        .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "blue")
        
        svg.append("rect").
        attr("x", 240)
        .attr("y",310) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "orange")
        svg.append("text").attr("x", 90).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
        svg.append("text").attr("x", 270).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    
    });
   
      }




}

