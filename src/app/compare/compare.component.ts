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
  type1;
  type2;
  actdata1="+Activity";
  actdata2="+Compare";
  actdata3="+Conversation";
  actdata4="+Demographics";
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  newUserCount;
  isShowDiv5 = true;
  myFunction() {  
    console.log("bb")
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
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());
      this.startDate2=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
      this.endDate2=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());

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
 myFunction_drop(type) {
  var startDate1=this.startDate1;
  var endDate1=this.endDate;
  var startDate2=this.startDate3;
  var endDate2=this.endDate2;
  this.type1=type;
this.type2;
console.log(this.type2)
if(this.type2==null)
{
  console.log("empty")
}

   if(type=="new_user" && (this.type2==null || this.type2=='bar') )
{
   document.getElementById("div_template").innerHTML=" ";
  
   this.createChart(startDate1,endDate1,startDate2,endDate2)
}
   else  if(type=="ret_user"  && (this.type2==null || this.type2=='bar'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart1(startDate1,endDate1,startDate2,endDate2)
   }
   else  if(type=="message"  && (this.type2==null || this.type2=='bar'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart2(startDate1,endDate1,startDate2,endDate2)
   }
   else if(type=="gender"  && (this.type2==null || this.type2=='bar'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart3(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="user" && (this.type2==null || this.type2=='bar'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart4(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="new_user" && (this.type2=='pie'))
   {
     console.log("new user")
    document.getElementById("div_template").innerHTML=" ";
    this.createChart_pie(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="ret_user" && (this.type2=='pie'))
   {
     console.log("ret user")
    document.getElementById("div_template").innerHTML=" ";
    this.createChart1_pie(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="message" && (this.type2=='pie'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart2_pie(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="user" && (this.type2=='pie'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart4_pie(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="new_user" && (this.type2=='line'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart_line(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="ret_user" && (this.type2=='line'))
   {
    document.getElementById("div_template").innerHTML=" ";
        this.createChart1_line(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="message" && (this.type2=='line'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart2_line(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="user" && (this.type2=='line'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart4_line(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="new_user" && (this.type2=='bubble'))
   {
     console.log("new user")
    document.getElementById("div_template").innerHTML=" ";
    this.createChart_bubble(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="ret_user" && (this.type2=='bubble'))
   {
     console.log("ret user")
    document.getElementById("div_template").innerHTML=" ";
    this.createChart1_bubble(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="message" && (this.type2=='bubble'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart2_bubble(startDate1,endDate1,startDate2,endDate2)



   }
   else if(type=="user" && (this.type2=='bubble'))
   {
    document.getElementById("div_template").innerHTML=" ";
    this.createChart4_bubble(startDate1,endDate1,startDate2,endDate2)



   }
   
   

    
  }
  myFunction1_drop(type)
  {
    var startDate1=this.startDate1;
  var endDate1=this.endDate;
  var startDate2=this.startDate3;
  var endDate2=this.endDate2;
    this.type1;
    console.log(this.type1)
    this.type2=type;
    console.log(type)
    if(this.type1=="new_user" && type=='bar')
    {
       document.getElementById("div_template").innerHTML=" ";
      
       this.createChart(startDate1,endDate1,startDate2,endDate2)
    }
       else  if(this.type1=="ret_user"  && type=='bar')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart1(startDate1,endDate1,startDate2,endDate2)
       }
       else  if(this.type1=="message"  &&  type=='bar')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart2(startDate1,endDate1,startDate2,endDate2)
       }
       else if(this.type1=="gender"  && type=='bar')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart3(startDate1,endDate1,startDate2,endDate2)
    
    
    
       }
       else if(this.type1=="user" && type=='bar')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart4(startDate1,endDate1,startDate2,endDate2)
    
    
    
       }
       else if(type=='pie' && (this.type1==null || this.type1=='new_user'))
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart_pie(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='pie' && this.type1=='ret_user')
       {
         console.log("ter")
        document.getElementById("div_template").innerHTML=" ";
        this.createChart1_pie(startDate1,endDate1,startDate2,endDate2)
       }
       
       else if(type=='pie' && this.type1=='message')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart2_pie(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='pie' && this.type1=='user')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart4_pie(startDate1,endDate1,startDate2,endDate2)
       }
      
       else if(type=='line' && (this.type1==null || this.type1=='new_user'))
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart_line(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='line' && this.type1=='ret_user')
       {
         console.log("ter")
         document.getElementById("div_template").innerHTML=" ";
         this.createChart1_line(startDate1,endDate1,startDate2,endDate2)
       }
       
       else if(type=='line' && this.type1=='message')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart2_line(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='line' && this.type1=='user')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart4_line(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='bubble' && (this.type1==null || this.type1=='new_user'))
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart_bubble(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='bubble' && this.type1=='ret_user')
       {
         console.log("ter")
         document.getElementById("div_template").innerHTML=" ";
         this.createChart1_bubble(startDate1,endDate1,startDate2,endDate2)
       }
       
       else if(type=='bubble' && this.type1=='message')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart2_bubble(startDate1,endDate1,startDate2,endDate2)
       }
       else if(type=='bubble' && this.type1=='user')
       {
        document.getElementById("div_template").innerHTML=" ";
        this.createChart4_bubble(startDate1,endDate1,startDate2,endDate2)
       }
   if(type=="bar" && this.type1==null) 
   {
      document.getElementById("div_template").innerHTML=" ";
     
      this.createChart(startDate1,endDate1,startDate2,endDate2)
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
  .domain([0, range])
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
        console.log(sum1)
         console.log("aaa"+temp1)
         this.summm1=sum1;
         
       
         for(var a=index2;(new Date(res[a].date))<=(new Date(endDate2));a++)
         {
            sum2+=res[a].count;
            temp2++;
            if(a==res.length-1)
             break;
         }
         
         console.log("aaa"+temp1)
         this.summm2=sum2;
        
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
.style("fill","blue")


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
.style("fill","orange")
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
     document.getElementById("colorFillMale_b1").style.background = "blue";
     document.getElementById("colorFillMale_b2").style.background = "blue";
     document.getElementById("p_b1").textContent="Male Users: "+this.sum1_m;
     document.getElementById("p_b2").textContent="Male Users: "+this.sum2_m;
     document.getElementById("colorFillMale_b3").style.border = "1px solid black";
     document.getElementById("colorFillMale_b4").style.border = "1px solid black";
     document.getElementById("colorFillMale_b3").style.background = "orange";
     document.getElementById("colorFillMale_b4").style.background = "orange";
     document.getElementById("p_b3").textContent="Female Users: "+this.sum1_f;
     document.getElementById("p_b4").textContent="Female Users: "+this.sum2_f;

     
     
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
      private createChart_pie(startDate1,endDate1,startDate2,endDate2): void {
        
        var index1=0;
    var index2=0;
    var div = d3.select("#div_template").append("div")
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
    this._httpService.getNewUserCount().subscribe((res:any[])=>{
      const pieChart = (selector, data) => {
        const size = 500;
        const fourth = size / 2.5;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.female_count, 0);
        const container = d3.select(selector);
        console.log("Aa")
        const chart = container.append('svg')
          .style('width', '50%')
          .attr('viewBox', `0 0 ${size} ${size}`)
          //.style('border','2px solid black')
          .style('height','400px')
          .style('position','absolute')
          .style('left','320px')
          .style('top','350px');
          
        const plotArea = chart.append('g')
          .attr('transform', `translate(${half}, ${half})`);
          
            
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.label))
          .range(["blue","orange"]);
      
        const pie = d3.pie()
          .sort(null)
          .value(d => d.female_count);
        
        const arcs = pie(data);
        
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(fourth);
        
        const arcLabel = d3.arc()
          .innerRadius(labelOffset)
          .outerRadius(labelOffset);
        
        plotArea.selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('fill', d => color(d.data.label))
          .attr('stroke', 'white')
          .attr('d', arc)
          .on("mouseover", mouseover)
          .on("mousemove",mousemove)
          .on("mouseout", mouseleave)
        
      };
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
  
  lineData.push(obj);
}
pieChart('#div_template', [{label:startDate1+"\t\t\tto\t\t\t "+endDate1,female_count:this.sum1},
                          {label:startDate2+"\t\tto\t\t "+endDate2,female_count:this.sum2}
                        ]);
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

    });

//remove and create svg


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
      .html("Date: " + d.data.label+"<br>Count: "+d.data.female_count)
      .style("left", (d3.mouse(this)[0]+500) + "px")
      .style("top", (d3.mouse(this)[1]+350) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
  

      }

      private createChart1_pie(startDate1,endDate1,startDate2,endDate2): void {
        
        var index1=0;
    var index2=0;
    var div = d3.select("#div_template").append("div")
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
    this._httpService.getRetUserCount().subscribe((res:any[])=>{
      const pieChart = (selector, data) => {
        const size = 500;
        const fourth = size / 2.5;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.female_count, 0);
        const container = d3.select(selector);
        console.log("Aa")
        const chart = container.append('svg')
          .style('width', '50%')
          .attr('viewBox', `0 0 ${size} ${size}`)
          //.style('border','2px solid black')
          .style('height','400px')
          .style('position','absolute')
          .style('left','320px')
          .style('top','350px');
          
        const plotArea = chart.append('g')
          .attr('transform', `translate(${half}, ${half})`);
          
            
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.label))
          .range(["blue","orange"]);
      
        const pie = d3.pie()
          .sort(null)
          .value(d => d.female_count);
        
        const arcs = pie(data);
        
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(fourth);
        
        const arcLabel = d3.arc()
          .innerRadius(labelOffset)
          .outerRadius(labelOffset);
        
        plotArea.selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('fill', d => color(d.data.label))
          .attr('stroke', 'white')
          .attr('d', arc)
          .on("mouseover", mouseover)
          .on("mousemove",mousemove)
          .on("mouseout", mouseleave)
        
      };
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
  
  lineData.push(obj);
}
pieChart('#div_template', [{label:startDate1+"\t\t\tto\t\t\t "+endDate1,female_count:this.sum1},
                          {label:startDate2+"\t\tto\t\t "+endDate2,female_count:this.sum2}
                        ]);
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

    });

//remove and create svg



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
      .html("Date: " + d.data.label+"<br>Count: "+d.data.female_count)
      .style("left", (d3.mouse(this)[0]+500) + "px")
      .style("top", (d3.mouse(this)[1]+350) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
  

      }
      private createChart2_pie(startDate1,endDate1,startDate2,endDate2): void {
        
        var index1=0;
    var index2=0;
    var div = d3.select("#div_template").append("div")
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
    this._httpService.getMessageCount().subscribe((res:any[])=>{
      const pieChart = (selector, data) => {
        const size = 500;
        const fourth = size / 2.5;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.female_count, 0);
        const container = d3.select(selector);
        console.log("Aa")
        const chart = container.append('svg')
          .style('width', '50%')
          .attr('viewBox', `0 0 ${size} ${size}`)
          //.style('border','2px solid black')
          .style('height','400px')
          .style('position','absolute')
          .style('left','320px')
          .style('top','350px');
          
        const plotArea = chart.append('g')
          .attr('transform', `translate(${half}, ${half})`);
          
            
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.label))
          .range(["blue","orange"]);
      
        const pie = d3.pie()
          .sort(null)
          .value(d => d.female_count);
        
        const arcs = pie(data);
        
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(fourth);
        
        const arcLabel = d3.arc()
          .innerRadius(labelOffset)
          .outerRadius(labelOffset);
        
        plotArea.selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('fill', d => color(d.data.label))
          .attr('stroke', 'white')
          .attr('d', arc)
          .on("mouseover", mouseover)
          .on("mousemove",mousemove)
          .on("mouseout", mouseleave)
        
      };
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
  
  lineData.push(obj);
}
pieChart('#div_template', [{label:startDate1+"\t\t\tto\t\t\t "+endDate1,female_count:this.sum1},
                          {label:startDate2+"\t\tto\t\t "+endDate2,female_count:this.sum2}
                        ]);
                        document.getElementById("alignCenter_b1").textContent = "";
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
                        document.getElementById("pa").textContent = this.sum1;
                        document.getElementById("pa1").textContent = this.sum2;
                        document.getElementById("colorFillMale").style.background = "blue";
                        document.getElementById("colorFillFeMale").style.background = "orange";
                        document.getElementById("colorFillMale").style.border ="1px solid black";
                        document.getElementById("colorFillFeMale").style.border ="1px solid black";

    });

//remove and create svg



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
      .html("Date: " + d.data.label+"<br>Count: "+d.data.female_count)
      .style("left", (d3.mouse(this)[0]+500) + "px")
      .style("top", (d3.mouse(this)[1]+350) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
  

      }
      private createChart4_pie(startDate1,endDate1,startDate2,endDate2): void {
        
        var index1=0;
    var index2=0;
    var div = d3.select("#div_template").append("div")
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
    this._httpService.getUserCount().subscribe((res:any[])=>{
      const pieChart = (selector, data) => {
        const size = 500;
        const fourth = size / 2.5;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.female_count, 0);
        const container = d3.select(selector);
        console.log("Aa")
        const chart = container.append('svg')
          .style('width', '50%')
          .attr('viewBox', `0 0 ${size} ${size}`)
          //.style('border','2px solid black')
          .style('height','400px')
          .style('position','absolute')
          .style('left','320px')
          .style('top','350px');
          
        const plotArea = chart.append('g')
          .attr('transform', `translate(${half}, ${half})`);
          
            
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.label))
          .range(["blue","orange"]);
      
        const pie = d3.pie()
          .sort(null)
          .value(d => d.female_count);
        
        const arcs = pie(data);
        
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(fourth);
        
        const arcLabel = d3.arc()
          .innerRadius(labelOffset)
          .outerRadius(labelOffset);
        
        plotArea.selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('fill', d => color(d.data.label))
          .attr('stroke', 'white')
          .attr('d', arc)
          .on("mouseover", mouseover)
          .on("mousemove",mousemove)
          .on("mouseout", mouseleave)
        
      };
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
  
  lineData.push(obj);
}
pieChart('#div_template', [{label:startDate1+"\t\t\tto\t\t\t "+endDate1,female_count:this.sum1},
                          {label:startDate2+"\t\tto\t\t "+endDate2,female_count:this.sum2}
                        ]);
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
    

    });

//remove and create svg



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
      .html("Date: " + d.data.label+"<br>Count: "+d.data.female_count)
      .style("left", (d3.mouse(this)[0]+500) + "px")
      .style("top", (d3.mouse(this)[1]+350) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
  

      }

      private createChart_line(startDate1,endDate1,startDate2,endDate2): void {
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
    var obj ={date:final[i].date,user_count:final[i].count};
    
    lineData.push(obj);
     
  }
  var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

/*var x = d3.scaleTime().range([0, width]);
  
x.domain(d3.extent(lineData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 1000]);*/
var x = d3.scaleBand()
.domain( lineData.map(function(d) { return d.date; }))
.range([ 0, width ])
.padding(1);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.style("font-weight","bold")
          .style("font-size","11px");


    
         
// Max value observed:
const max1 = d3.max(lineData, function(d) { return +d.user_count; })

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, max1+2])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y))
  .style("font-weight","bold")
          .style("font-size","11px");

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.user_count);  })
        .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
	.attr("d", valueline) 
	.attr("fill","none")
	.attr("stroke", "black")
	.attr("stroke-width", "3");

//  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
/*var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d=>d.date));

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_woy);*/

//  Add the Y Axis
//  svg.append("g").call(d3.axisLeft(y));
var i=0;

    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
   
svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling

    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.user_count) })
    .attr("r", 7)
    .style("fill",function(d){return myColor(d.date)});  


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

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-200)
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
      svg.append("text").attr("x", 130).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 290).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
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
 /* lineData.forEach(function(d) {
    return { date : d.date,count : d.count }
  
});

var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
     

        // Add X axis --> it is a date format
        var x = d3.scaleBand()
        .domain(d3.extent(lineData, function(d) { return d.date; }))
        .range([ 0, width ])
        .padding(1);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
    
        // Max value observed:
        const max1 = d3.max(lineData, function(d) { return +d.count; })
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, max1+2])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // Set the gradient
        
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(max1+2))
          .selectAll("stop")
            .data([
              {offset: "0%", color: "blue"},
              {offset: "100%", color: "orange"}
            ])
          .enter().append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });
    
        // Add the line
        var linn=d3.line()
        .x(function(d) { console.log(d.date);return x(d.date) })
        .y(function(d) { return y(d.count) })

        
        
        svg.append("path")
          .data(lineData)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)" )
          .attr("stroke-width", 2)
          .attr("d",linn(lineData))*/
    
 
 


      
  
      });

    }
    private createChart1_line(startDate1,endDate1,startDate2,endDate2): void {
      var index1=0;
      
      var index2=0;
      
      this._httpService.getRetUserCount().subscribe((res:any[])=>{
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
    var obj ={date:final[i].date,user_count:final[i].count};
    
    lineData.push(obj);
     
  }
  var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

/*var x = d3.scaleTime().range([0, width]);
  
x.domain(d3.extent(lineData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 1000]);*/
var x = d3.scaleBand()
.domain(d3.extent(lineData.map(function(d) { return d.date; })))
.range([ 0, width ])
.padding(1);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.style("font-weight","bold")
          .style("font-size","11px");


// Max value observed:
const max1 = d3.max(lineData, function(d) { return +d.user_count; })

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, max1+2])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y))
  .style("font-weight","bold")
          .style("font-size","11px");

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.user_count);  })
        .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
	.attr("d", valueline) 
	.attr("fill","none")
	.attr("stroke", "black")
	.attr("stroke-width", "3");



//  Add the Y Axis
//  svg.append("g").call(d3.axisLeft(y));

var i=0;

    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
    
svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling

    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.user_count) })
    .attr("r", 7)
    .style("fill",function(d){return myColor(d.date)});  


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

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-200)
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
      svg.append("text").attr("x", 130).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 290).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
     
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
 /* lineData.forEach(function(d) {
    return { date : d.date,count : d.count }
  
});

var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
     

        // Add X axis --> it is a date format
        var x = d3.scaleBand()
        .domain(d3.extent(lineData, function(d) { return d.date; }))
        .range([ 0, width ])
        .padding(1);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
    
        // Max value observed:
        const max1 = d3.max(lineData, function(d) { return +d.count; })
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, max1+2])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // Set the gradient
        
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(max1+2))
          .selectAll("stop")
            .data([
              {offset: "0%", color: "blue"},
              {offset: "100%", color: "orange"}
            ])
          .enter().append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });
    
        // Add the line
        var linn=d3.line()
        .x(function(d) { console.log(d.date);return x(d.date) })
        .y(function(d) { return y(d.count) })

        
        
        svg.append("path")
          .data(lineData)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)" )
          .attr("stroke-width", 2)
          .attr("d",linn(lineData))*/
    
 
 


      
  
      });

    }
    private createChart2_line(startDate1,endDate1,startDate2,endDate2): void {
      var index1=0;
      
      var index2=0;
      
      this._httpService.getMessageCount().subscribe((res:any[])=>{
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
    var obj ={date:final[i].date,user_count:final[i].count};
    
    lineData.push(obj);
     
  }
  var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

/*var x = d3.scaleTime().range([0, width]);
  
x.domain(d3.extent(lineData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 1000]);*/

var x = d3.scaleBand()
.domain(lineData.map(function(d) { return d.date; }))
.range([ 0, width ])
.padding(1);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.style("font-weight","bold")
.style("font-size","11px");;


// Max value observed:
const max1 = d3.max(lineData, function(d) { return +d.user_count; })

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, max1+2])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y))
  .style("font-weight","bold")
          .style("font-size","11px"); ;

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.user_count);  })
        .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
	.attr("d", valueline) 
	.attr("fill","none")
	.attr("stroke", "black")
	.attr("stroke-width", "3");


var i=0;

    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling

    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.user_count) })
    .attr("r", 7) 
    .style("fill",function(d){return myColor(d.date)})
    
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

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-200)
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
      svg.append("text").attr("x", 130).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 290).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
     
      document.getElementById("alignCenter_b1").textContent = "";
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
                        document.getElementById("pa").textContent = this.sum1;
                        document.getElementById("pa1").textContent = this.sum2;
                        document.getElementById("colorFillMale").style.background = "blue";
                        document.getElementById("colorFillFeMale").style.background = "orange";
                        document.getElementById("colorFillMale").style.border ="1px solid black";
                        document.getElementById("colorFillFeMale").style.border ="1px solid black";
 /* lineData.forEach(function(d) {
    return { date : d.date,count : d.count }
  
});

var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
     

        // Add X axis --> it is a date format
        var x = d3.scaleBand()
        .domain(d3.extent(lineData, function(d) { return d.date; }))
        .range([ 0, width ])
        .padding(1);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
    
        // Max value observed:
        const max1 = d3.max(lineData, function(d) { return +d.count; })
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, max1+2])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // Set the gradient
        
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(max1+2))
          .selectAll("stop")
            .data([
              {offset: "0%", color: "blue"},
              {offset: "100%", color: "orange"}
            ])
          .enter().append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });
    
        // Add the line
        var linn=d3.line()
        .x(function(d) { console.log(d.date);return x(d.date) })
        .y(function(d) { return y(d.count) })

        
        
        svg.append("path")
          .data(lineData)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)" )
          .attr("stroke-width", 2)
          .attr("d",linn(lineData))*/
    
 
 


      
  
      });

    }
    private createChart4_line(startDate1,endDate1,startDate2,endDate2): void {
      var index1=0;
      
      var index2=0;
      
      this._httpService.getUserCount().subscribe((res:any[])=>{
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
    var obj ={date:final[i].date,user_count:final[i].count};
    
    lineData.push(obj);
     
  }
  var height  = 400;
var width   = 1000;
var margin = {top: 15, right: 40, bottom: 100, left:500};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the graph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

     
var x = d3.scaleBand()
.domain(lineData.map(function(d) { return d.date; }))
.range([ 0, width ])
.padding(1)

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.style("font-weight","bold")
      .style("font-size","11px");;


// Max value observed:
const max1 = d3.max(lineData, function(d) { return +d.user_count; })

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, max1+2])
  .range([ height, 0 ])

svg.append("g")
  .call(d3.axisLeft(y))
  .style("font-weight","bold")
  .style("font-size","11px");;
  

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.user_count);  })
        .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
	.attr("d", valueline) 
	.attr("fill","none")
	.attr("stroke", "black")
	.attr("stroke-width", "3");

 

var i=0;

var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
.range(["blue","orange"]);

svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling

    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.user_count) })
    .attr("r", 7)
    .style("fill",function(d){return myColor(d.date)})
     


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

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-200)
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
      svg.append("text").attr("x", 130).attr("y", 325).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 290).attr("y", 325).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
     
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

    
 
 


      
  
      });

    }
    private createChart_bubble(startDate1,endDate1,startDate2,endDate2): void {
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
    var height  = 550;
var width   =950;
var margin = {top: 75, right: 40, bottom: 300, left:350};
width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;
// set the dimensions and margins of the sgraph

// append the svg object to the body of the page
var svg = d3.select("#div_template")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
          var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(lineData.map(function(d) { return d.date; }))
          .padding(0.9)
          
        svg.append("g")
        
        .attr("transform", "translate(0," + height + ")")
        .style("font-weight","bold")
        .style("font-size","12px")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        
        svg.append("g")
        .style("font-weight","bold")
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, range])
          .range([ height+2, 0]);
      /*  svg.append("g")
        .style("font-weight","bold")
        .style("font-size","15px")
          .call(d3.axisLeft(y))*/
          const max1 = d3.max(lineData, function(d) { return +d.count; })
  // Add a scale for bubble size
  var z1 = d3.scaleLinear()
    .domain([1, max1+2])
    .range([ 4, 50]);

    /*var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet2);*/
    var i=0;

var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
.range(["blue","orange"]);

svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-250)
      .attr("y", height + margin.top )
      .text("Date")
      .style("font-weight","bold")
      .style("font-size","20px");

  // -1- Create a tooltip div that is hidden by default:
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
        .style("border", "solid")
        .style("border-width", "10px")
        .style("border-radius", "5px")
    }
    var mousemove = function(d) {
      Tooltip
        .html("Date: " + d.date+"<br>Count: "+d.count)
        .style("left", (d3.mouse(this)[0]+500) + "px")
        .style("top", (d3.mouse(this)[1]+250) + "px")
    }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.7)
    }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(lineData)
    .enter()
    .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { return x(d.date); } )
      .attr("cy", function (d) { return y(d.count); } )
      .attr("r", function (d) { return z1(d.count); } )
      .style("fill", function (d) { return myColor(d.date); } )
      .style("opacity",0.7)
      
    // -3- Trigger the functions
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )
    
    var size = 17;
    svg.append("rect").
    attr("x", 160)
    .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "blue")
    
    svg.append("rect").
    attr("x", 340)
    .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size).style("fill", "orange")
    svg.append("text").attr("x", 190).attr("y", 225).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    svg.append("text").attr("x", 370).attr("y", 225).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")

    
    
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
   
    });
       
      }
      private createChart1_bubble(startDate1,endDate1,startDate2,endDate2): void {
        //private createChart(): void{
         /* var startDate1=this.startDate1;
          var endDate1=this.endDate;
          var startDate2=this.startDate3;
          var endDate2=this.endDate2*/
          var index1=0;
          var index2=0;
          this._httpService.getRetUserCount().subscribe((res:any[])=>{
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
      var height  = 550;
  var width   =950;
  var margin = {top: 75, right: 40, bottom: 300, left:350};
  width =     width - margin.left - margin.right;
  height =    height - margin.top - margin.bottom;
  // set the dimensions and margins of the sgraph
  
  // append the svg object to the body of the page
  var svg = d3.select("#div_template")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
            var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(lineData.map(function(d) { return d.date; }))
            .padding(0.9)
            
          svg.append("g")
          
          .attr("transform", "translate(0," + height + ")")
          .style("font-weight","bold")
          .style("font-size","12px")
          .call(d3.axisBottom(x).tickSizeOuter(0))
          
          svg.append("g")
          .style("font-weight","bold")
          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, range])
            .range([ height+2, 0]);
        /*  svg.append("g")
          .style("font-weight","bold")
          .style("font-size","15px")
            .call(d3.axisLeft(y))*/
            const max1 = d3.max(lineData, function(d) { return +d.count; })
    // Add a scale for bubble size
    var z1 = d3.scaleLinear()
      .domain([1, max1+2])
      .range([ 4, 50]);
  
      /*var myColor = d3.scaleOrdinal()
      .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
      .range(d3.schemeSet2);*/
      var i=0;
  
  var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
  .range(["blue","orange"]);
  
  svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width-250)
        .attr("y", height + margin.top )
        .text("Date")
        .style("font-weight","bold")
        .style("font-size","20px");
  
    // -1- Create a tooltip div that is hidden by default:
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
          .style("border", "solid")
          .style("border-width", "10px")
          .style("border-radius", "5px")
      }
      var mousemove = function(d) {
        Tooltip
          .html("Date: " + d.date+"<br>Count: "+d.count)
          .style("left", (d3.mouse(this)[0]+500) + "px")
          .style("top", (d3.mouse(this)[1]+250) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.7)
      }
  
    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(lineData)
      .enter()
      .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.date); } )
        .attr("cy", function (d) { return y(d.count); } )
        .attr("r", function (d) { return z1(d.count); } )
        .style("fill", function (d) { return myColor(d.date); } )
        .style("opacity",0.7)
        
      // -3- Trigger the functions
      .on("mouseover", mouseover )
      .on("mousemove", mousemove )
      .on("mouseleave", mouseleave )
      
      var size = 17;
      svg.append("rect").
      attr("x", 160)
      .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "blue")
      
      svg.append("rect").
      attr("x", 340)
      .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size).style("fill", "orange")
      svg.append("text").attr("x", 190).attr("y", 225).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      svg.append("text").attr("x", 370).attr("y", 225).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
  
      
      
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
      
      
      
     
    
        
     
          
      });
         
        }
        private createChart2_bubble(startDate1,endDate1,startDate2,endDate2): void {
          //private createChart(): void{
           /* var startDate1=this.startDate1;
            var endDate1=this.endDate;
            var startDate2=this.startDate3;
            var endDate2=this.endDate2*/
            var index1=0;
            var index2=0;
            this._httpService.getMessageCount().subscribe((res:any[])=>{
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
        var height  = 550;
    var width   =950;
    var margin = {top: 75, right: 40, bottom: 300, left:350};
    width =     width - margin.left - margin.right;
    height =    height - margin.top - margin.bottom;
    // set the dimensions and margins of the sgraph
    
    // append the svg object to the body of the page
    var svg = d3.select("#div_template")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
              var x = d3.scaleBand()
              .range([ 0, width ])
              .domain(lineData.map(function(d) { return d.date; }))
              .padding(0.9)
              
            svg.append("g")
            
            .attr("transform", "translate(0," + height + ")")
            .style("font-weight","bold")
            .style("font-size","12px")
            .call(d3.axisBottom(x).tickSizeOuter(0))
            
            svg.append("g")
            .style("font-weight","bold")
            // Add Y axis
            var y = d3.scaleLinear()
              .domain([0, range])
              .range([ height+2, 0]);
          /*  svg.append("g")
            .style("font-weight","bold")
            .style("font-size","15px")
              .call(d3.axisLeft(y))*/
              const max1 = d3.max(lineData, function(d) { return +d.count; })
      // Add a scale for bubble size
      var z1 = d3.scaleLinear()
        .domain([1, max1+2])
        .range([ 4, 60]);
    
        /*var myColor = d3.scaleOrdinal()
        .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
        .range(d3.schemeSet2);*/
        var i=0;
    
    var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
    .range(["blue","orange"]);
    
    svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", width-250)
          .attr("y", height + margin.top )
          .text("Date")
          .style("font-weight","bold")
          .style("font-size","20px");
    
      // -1- Create a tooltip div that is hidden by default:
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
            .style("border", "solid")
            .style("border-width", "10px")
            .style("border-radius", "5px")
        }
        var mousemove = function(d) {
          Tooltip
            .html("Date: " + d.date+"<br>Count: "+d.count)
            .style("left", (d3.mouse(this)[0]+500) + "px")
            .style("top", (d3.mouse(this)[1]+250) + "px")
        }
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.7)
        }
    
      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(lineData)
        .enter()
        .append("circle")
          .attr("class", "bubbles")
          .attr("cx", function (d) { return x(d.date); } )
          .attr("cy", function (d) { return y(d.count); } )
          .attr("r", function (d) { return z1(d.count); } )
          .style("fill", function (d) { return myColor(d.date); } )
          .style("opacity",0.7)
          
        // -3- Trigger the functions
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave )
        
        var size = 17;
        svg.append("rect").
        attr("x", 160)
        .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "blue")
        
        svg.append("rect").
        attr("x", 340)
        .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size).style("fill", "orange")
        svg.append("text").attr("x", 190).attr("y", 225).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
        svg.append("text").attr("x", 370).attr("y", 225).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
    
        
        
        //remove and create svg
        document.getElementById("alignCenter_b1").textContent = "";
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
        document.getElementById("pa").textContent = this.sum1;
        document.getElementById("pa1").textContent = this.sum2;
        document.getElementById("colorFillMale").style.background = "blue";
        document.getElementById("colorFillFeMale").style.background = "orange";
        document.getElementById("colorFillMale").style.border ="1px solid black";
        document.getElementById("colorFillFeMale").style.border ="1px solid black";
        
        
        
       
      
          
                
      
        
      
            
        });
           
          }
          private createChart4_bubble(startDate1,endDate1,startDate2,endDate2): void {
            //private createChart(): void{
             /* var startDate1=this.startDate1;
              var endDate1=this.endDate;
              var startDate2=this.startDate3;
              var endDate2=this.endDate2*/
              var index1=0;
              var index2=0;
              this._httpService.getUserCount().subscribe((res:any[])=>{
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
          var height  = 550;
      var width   =950;
      var margin = {top: 75, right: 40, bottom: 300, left:350};
      width =     width - margin.left - margin.right;
      height =    height - margin.top - margin.bottom;
      // set the dimensions and margins of the sgraph
      
      // append the svg object to the body of the page
      var svg = d3.select("#div_template")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
                var x = d3.scaleBand()
                .range([ 0, width ])
                .domain(lineData.map(function(d) { return d.date; }))
                .padding(0.9)
                
              svg.append("g")
              
              .attr("transform", "translate(0," + height + ")")
              .style("font-weight","bold")
              .style("font-size","12px")
              .call(d3.axisBottom(x).tickSizeOuter(0))
              
              svg.append("g")
              .style("font-weight","bold")
              // Add Y axis
              var y = d3.scaleLinear()
                .domain([0, range])
                .range([ height+2, 0]);
            /*  svg.append("g")
              .style("font-weight","bold")
              .style("font-size","15px")
                .call(d3.axisLeft(y))*/
                const max1 = d3.max(lineData, function(d) { return +d.count; })
        // Add a scale for bubble size
        var z1 = d3.scaleLinear()
          .domain([1, max1+2])
          .range([ 4, 50]);
      
          /*var myColor = d3.scaleOrdinal()
          .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
          .range(d3.schemeSet2);*/
          var i=0;
      
      var myColor = d3.scaleOrdinal().domain(lineData[i=i+1])
      .range(["blue","orange"]);
      
      svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width-250)
            .attr("y", height + margin.top )
            .text("Date")
            .style("font-weight","bold")
            .style("font-size","20px");
      
        // -1- Create a tooltip div that is hidden by default:
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
              .style("border", "solid")
              .style("border-width", "10px")
              .style("border-radius", "5px")
          }
          var mousemove = function(d) {
            Tooltip
              .html("Date: " + d.date+"<br>Count: "+d.count)
              .style("left", (d3.mouse(this)[0]+500) + "px")
              .style("top", (d3.mouse(this)[1]+250) + "px")
          }
          var mouseleave = function(d) {
            Tooltip
              .style("opacity", 0)
            d3.select(this)
              .style("stroke", "none")
              .style("opacity", 0.7)
          }
      
        // Add dots
        svg.append('g')
          .selectAll("dot")
          .data(lineData)
          .enter()
          .append("circle")
            .attr("class", "bubbles")
            .attr("cx", function (d) { return x(d.date); } )
            .attr("cy", function (d) { return y(d.count); } )
            .attr("r", function (d) { return z1(d.count); } )
            .style("fill", function (d) { return myColor(d.date); } )
            .style("opacity",0.7)
            
          // -3- Trigger the functions
          .on("mouseover", mouseover )
          .on("mousemove", mousemove )
          .on("mouseleave", mouseleave )
          
          var size = 17;
          svg.append("rect").
          attr("x", 160)
          .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("width", size)
          .attr("height", size).style("fill", "blue")
          
          svg.append("rect").
          attr("x", 340)
          .attr("y",210) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("width", size)
          .attr("height", size).style("fill", "orange")
          svg.append("text").attr("x", 190).attr("y", 225).text("Bot 1").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
          svg.append("text").attr("x", 370).attr("y", 225).text("Bot 2").style("font-size", "20px").style("font-weight","bold").attr("alignment-baseline","right")
      
          
          
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
          
          
              
          });
             
            }
          
  

    }
  

