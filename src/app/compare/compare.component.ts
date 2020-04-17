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

    });

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
    this.createChart(this.startDate1,this.endDate);
  }
    
  private createChart(startDate,endDate): void {
    var final=[]
    this._httpService.getMessageCount().subscribe((res:any[])=>{
    
    if (!res) { return; }

  console.log(startDate)
  var yahooOnly = res.filter(function (entry) {
    var temp;
    
    temp=""+(new Date(entry.date).getFullYear())+"-0"+(new Date(entry.date).getMonth()+1)+"-"+(new Date(entry.date).getDate().toString().padStart(2, "0"));
    console.log(temp)
    return temp === startDate;

    
});
var yahooOnly1 = res.filter(function (entry) {
  var temp;
  
  temp=""+(new Date(entry.date).getFullYear())+"-0"+(new Date(entry.date).getMonth()+1)+"-"+(new Date(entry.date).getDate().toString().padStart(2, "0"));
  console.log(temp)
  return temp === endDate;

  
});
final.push(yahooOnly,yahooOnly1)

var fin=[final[0][0],final[1][0]]

var lineData=[];
for(let i=0;i<fin.length;i++){
  var obj ={date:(new Date(fin[i].date).getFullYear())+"-0"+(new Date(fin[i].date).getMonth()+1)+"-"+(new Date(fin[i].date).getDate()),count:fin[i].count};
  lineData.push(obj);
}
console.log(lineData.map(function(d) { return new Date(d.date); }))
var height  = 400;
var width   = 1000;
var hEach   = 40;
var i=0;

var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
  .range(["black", "grey"])
var margin = {top: 15, right: 40, bottom: 20, left: 450};

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
  .range([ 0, 500 ])
  .domain(lineData.map(function(d) { return d.date; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(0,0)rotate(0)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

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
    svg.append("text").attr("x", 460).attr("y", 30).text("Bot1").style("font-size", "20px").attr("alignment-baseline","right")
    svg.append("text").attr("x", 460).attr("y", 60).text("Bot2").style("font-size", "20px").attr("alignment-baseline","right")
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

