import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges} from '@angular/core';
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
    this._httpService.getMessageCount().subscribe((res:any[])=>{
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
      this.startDate2=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      this.endDate2=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());

    });

  }
  dateChanger(startdate: string){
    console.log(startdate)
    this.startDate1=startdate;
    console.log(this.startDate1)
    this.datePicCount+=1;
  }
  dateChangerEnd(enddate: string){
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
    this.startDate1;
    this.endDate;
    this.endDate2=enddate;
    this.startDate3;
    this.inputStartDate2=this.startDate3;
    this.inputEndDate2=this.endDate2;
  this.createChart(this.startDate1,this.endDate,this.startDate3,this.endDate2);
  }
 myFunction(type) {
   if(type=="new_user")
   console.log("new user")
   else  if(type=="ret_user")
   console.log("ret user")
   else  if(type=="message")
   console.log("message")
    
  }
  private createChart(startDate1,endDate1,startDate2,endDate2): void {
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
     for(var z=index1;(new Date(res[z].date))<=(new Date(endDate1)) ;z++)
     {
        sum1+=res[z].count;
     }
     console.log(sum1)
     for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
     {
        sum2+=res[a].count;
     }
     console.log(sum2)
 

    var final=[]
    
    var line1={date:startDate1+"\t\tTO\t\t "+endDate1,count:sum1} 
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
  .domain([0, 10])
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
      .style("top", (d3.mouse(this)[1]-50) + "px")
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
/*var x = d3.scaleTime().range([0, width]);

x.domain(d3.extent(fin, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(fin, function(d) { return d.count; }) - 5, 1000]);

svg.selectAll("myRect")
    .lineData(fin)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.date); })
    .attr("width", function(d) { return x(d.count); })
    .attr("height", y )
    .attr("fill", "#69b3a2")
/*var valueline = d3.line()
      .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.count);  })
      .curve(d3.curveMonotoneX);*/

/*svg.append("rect")
  .data([fin]) 
  .attr("class", "bar")  
.attr("d", valueline) 
.attr("fill","none")
.attr("stroke", "#ffab00")
.attr("stroke-width", "3");

//  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(fin.map(d=>d.date));

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_woy);

//  Add the Y Axis
//  svg.append("g").call(d3.axisLeft(y));

svg.selectAll(".dot")
  .data(fin)
  .enter()
  .append("circle") // Uses the enter().append() method
  .attr("class", "dot") // Assign a class for styling
  .attr("cx", function(d) { return x(d.date) })
  .attr("cy", function(d) { return y(d.count) })
  .attr("r", 5);  


svg.selectAll(".text")
  .data(fin)
  .enter()
  .append("text") // Uses the enter().append() method
  .attr("class", "label") // Assign a class for styling
  .attr("x", function(d, i) { return x(d.date) })
  .attr("y", function(d) { return y(d.count) })
  .attr("dy", "-5")
  .text(function(d) {return d.count; });
svg.append('text')                                     
    .attr('x', 10)              
    .attr('y', -5)    */
});
   
  }

}

