import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ComponentFactoryResolver} from '@angular/core';
import * as d3 from 'd3';
import { CompareService } from './compare.service';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
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
    
  }
  private createChart(startDate1,endDate1,startDate2,endDate2): void {
  //private createChart(): void{
   /* var startDate1=this.startDate1;
    var endDate1=this.endDate;
    var startDate2=this.startDate3;
    var endDate2=this.endDate2*/
    var index1=0;
    var index2=0;
    this._httpService.getNewUserCount().subscribe((res:any[])=>{
      
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
    
     for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
     {
     
        sum1+=res[z].count;
        if(z==res.length-1)
        break;
     }
    
     for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
     {
        sum2+=res[a].count;
        if(a==res.length-1)
        break;
     }
 

    var final=[]
    
    var line1={date:startDate1+"\t\t\tTO\t\t\t "+endDate1,count:sum1} 
    var line2={date:startDate2+"\t\tTO\t\t "+endDate2,count:sum2} 

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
  .range(["black", "grey"])
var margin = {top: 15, right: 40, bottom: 60, left: 450};

width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;


//remove and create svg


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
.call(d3.axisBottom(x).tickSizeOuter(0))

svg.append("g")
.style("font-weight","bold")
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 11])
  .range([ height+2, 0]);
svg.append("g")
  .call(d3.axisLeft(y))
  .style("font-weight","bold");
  svg.append("text")      // text label for the x axis
        .attr("x", 205 )
        .attr("y", 370 )
        .style("text-anchor", "middle").
        style("font-weight","bold")
        .text("Date");

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
    attr("x", 420)
    .attr("y",15) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "black")
    
    svg.append("rect").
    attr("x", 420)
    .attr("y",45) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "grey")
    svg.append("text").attr("x", 460).attr("y", 30).text("Bot1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    svg.append("text").attr("x", 460).attr("y", 60).text("Bot2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")

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
       var sum1=0;
       var sum2=0;
       
       for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
       {
          sum1+=res[z].count;
        
          if(z==res.length-1)
        break;
       }
      
      
       for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
       {
          sum2+=res[a].count;
          if(a==res.length-1)
        break;
       }
       console.log(sum2)
   
  
      var final=[]
      
      var line1={date:startDate1+"\t\t\tTO\t\t\t "+endDate1,count:sum1} 
      var line2={date:startDate2+"\t\tTO\t\t "+endDate2,count:sum2} 
  
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
    .range(["black", "grey"])
  var margin = {top: 15, right: 40, bottom: 60, left: 450};
  
  width =     width - margin.left - margin.right;
  height =    height - margin.top - margin.bottom;
  
  
  //remove and create svg
  
  
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
  .call(d3.axisBottom(x).tickSizeOuter(0))
  
  svg.append("g")
  .style("font-weight","bold")
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 45])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .style("font-weight","bold");
    svg.append("text")      // text label for the x axis
          .attr("x", 205 )
          .attr("y", 370 )
          .style("text-anchor", "middle").
          style("font-weight","bold")
          .text("Date");
  
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
      attr("x", 420)
      .attr("y",15) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "black")
      
      svg.append("rect").
      attr("x", 420)
      .attr("y",45) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "grey")
      svg.append("text").attr("x", 460).attr("y", 30).text("Bot1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 460).attr("y", 60).text("Bot2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
  
  });
     
    }
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
         var summm1=sum1/temp1;
         
       
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            sum2+=res[a].count;
            temp2++;
            if(a==res.length-1)
             break;
         }
         
         console.log("aaa"+temp1)
         var summm2=sum2/temp2;
        
    
        var final=[]
        
        var line1={date:startDate1+"\t\t\tTO\t\t\t "+endDate1,count:Math.round(summm1)} 
        var line2={date:startDate2+"\t\tTO\t\t "+endDate2,count:Math.round(summm2)} 
    
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
      .range(["black", "grey"])
    var margin = {top: 15, right: 40, bottom: 60, left: 450};
    
    width =     width - margin.left - margin.right;
    height =    height - margin.top - margin.bottom;
    
    
    //remove and create svg
    
    
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
    .call(d3.axisBottom(x).tickSizeOuter(0))
    
    svg.append("g")
    .style("font-weight","bold")
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 2000])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .style("font-weight","bold");
      svg.append("text")      // text label for the x axis
            .attr("x", 205 )
            .attr("y", 370 )
            .style("text-anchor", "middle").
            style("font-weight","bold")
            .text("Date");
    
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
        attr("x", 420)
        .attr("y",15) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "black")
        
        svg.append("rect").
        attr("x", 420)
        .attr("y",45) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "grey")
        svg.append("text").attr("x", 460).attr("y", 30).text("Bot1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
        svg.append("text").attr("x", 460).attr("y", 60).text("Bot2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    
    });
       
      }

}

