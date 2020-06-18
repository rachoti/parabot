/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import * as $ from 'jquery';
import { AuthService } from '../auth.service';
import { RecenttransService } from './recenttrans.service';
import * as cloud from 'd3-cloud';
@Component({
  selector: 'app-recenttranscript',
  templateUrl: './recenttranscript.component.html',
  styleUrls: ['./recenttranscript.component.css']
})
export class RecenttranscriptComponent implements OnInit {
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
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
    
    //$('#my_dataviz').remove();
    this.startDate1=startdate;
    this.datePicCount+=1;
  }
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/recentTrans'])
    

  }
  dateChangerEnd(enddate: string){
console.log("in")
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
  this.endDate=enddate;
  this.startDate1;
  this.inputStartDate=this.startDate1;
  this.inputEndDate=this.endDate;
  var myWords = [];
    var avarage=0;
    var AllCount=0;
    var start = false;
    var count = 0; 
    var sum=[];
    var outputArray=[];
    var data=[];
    var sortable = [];

  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    this._httpService.getAllWords().subscribe((res:any[])=>{
      for (let j = 0; j < res.length; j++) { 
        for (let k = 0; k < outputArray.length; k++) { 
            if ( res[j].word == outputArray[k] ) { 
                start = true; 
            } 
        } 
        count++; 
        if (count == 1 && start == false) { 
            outputArray.push(res[j].word); 
        } 
        start = false; 
        count = 0; 
      }
      let arr=[];
    let index=0;
    
    
    
  

    for(let i=0;i<outputArray.length;i++)
   {

     var yahooOnly = res.filter(function (entry) {

       return entry.word === outputArray[i];


   });
   index=0
      for(var j=0;j<yahooOnly.length;j++){
        
       // console.log(new Date(this.startDate1))
       // console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
   
   var sum_user1=0;
   var wrd
   for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
    wrd= yahooOnly[z].word
    sum_user1+=yahooOnly[z].count;
    
  }
   
  sum.push({
          
    newword:wrd,
    count:sum_user1
  });
  

}
 /* for (var s in sum) {
    sortable.push([s, sum[s]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});*/

/*sum.sort(function (a, b) {
  return b.count - a.count;
});
 

   // sum.sort(function(a, b){return b - a});


  
  

  console.log("newdatas", data)
  console.log("summm", sum)
      for(var i=0;i<100;i++){
        myWords.push({
          
          word:sum[i].newword,
          size:sum[i].count
        });
        AllCount=AllCount+sum[i].count;
      }
     // console.log("data",myWords )
      avarage=AllCount/outputArray.length;
   // myWords=[{word: "Running", size: "1200"}, {word: "Surfing", size: "2000"}, {word: "Climbing", size: "1200"}, {word: "Kiting", size: "3000"}, {word: "Sailing", size: "2120"}, {word: "Snowboarding", size: "2534"} ]
    
    var margin = {top: 5, right: 240, bottom: 400, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
var layout = cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size/(avarage*4); })      // font size of words
  .on("end", draw);
layout.start();


function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .style("fill", "rgb("+getRandomInt(200)+","+getRandomInt(200)+","+getRandomInt(200)+ ")");
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log();

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

function handleMouseOver(d, i) {  // Add interactivity
  
 div.transition()
               .duration(50)
               .style("opacity", 1);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          let num = (d.text+" : "+(parseInt(d.size)*(avarage*4)*1.00084).toFixed(0)).toString();
          //(parseInt(d.size)*(avarage*4)*1.00084).toFixed(0)).toString()
  div.html(num)
     .style("left", (d3.event.pageX + 10) + "px")
     .style("top", (d3.event.pageY - 15) + "px");
}

function handleMouseOut(d, i) {
  div.transition()
               .duration('50')
               .style("opacity", 0);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
}

this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());



});
  


  }



  constructor(private router: Router,private _httpService:RecenttransService,public authService: AuthService) { }

  ngOnInit() {
    var myWords = [];
    var avarage=0;
    var AllCount=0;
    var start = false;
    var count = 0; 
    var sum=[];
    var outputArray=[];
    this._httpService.getAllWords().subscribe((res:any[])=>{
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
      this.inputStartDate= this.startDate;
      this.inputEndDate=this.endDate;
      
    });   
   /* this._httpService.getWords().subscribe((res:any[])=>{
      
  
      for(var i=0;i<100;i++){
        myWords.push({
          
          word:res[i].word,
          size:res[i].count
        });
        
        AllCount=AllCount+res[i].count;
      }
      avarage=AllCount/res.length;
   // myWords=[{word: "Running", size: "1200"}, {word: "Surfing", size: "2000"}, {word: "Climbing", size: "1200"}, {word: "Kiting", size: "3000"}, {word: "Sailing", size: "2120"}, {word: "Snowboarding", size: "2534"} ]
    
    var margin = {top: 5, right: 240, bottom: 400, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
var layout = cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size/(avarage*2); })      // font size of words
  .on("end", draw);
layout.start();


function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .style("fill", "rgb("+getRandomInt(200)+","+getRandomInt(200)+","+getRandomInt(200)+ ")");
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log();

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

function handleMouseOver(d, i) {  // Add interactivity
  
 div.transition()
               .duration(50)
               .style("opacity", 1);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          let num = (d.text+" : "+(parseInt(d.size)*(avarage*2)*1.00084).toFixed(0)).toString();
  div.html(num)
     .style("left", (d3.event.pageX + 10) + "px")
     .style("top", (d3.event.pageY - 15) + "px");
}

function handleMouseOut(d, i) {
  div.transition()
               .duration('50')
               .style("opacity", 0);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
}

});*/
 /* }
  

}
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { RecenttransService } from './recenttrans.service';
import * as cloud from 'd3-cloud';
@Component({
  selector: 'app-recenttranscript',
  templateUrl: './recenttranscript.component.html',
  styleUrls: ['./recenttranscript.component.css']
})
export class RecenttranscriptComponent implements OnInit {

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
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/recentTrans'])
    

  }
  constructor(private router: Router,private _httpService:RecenttransService,public authService: AuthService) { }

  ngOnInit() {
    var myWords = [];
    var avarage=0;
    var AllCount=0;
    this._httpService.getAllWords().subscribe((res:any[])=>{
      for(var i=0;i<100;i++){
        myWords.push({
          word:res[i].word,
          size:res[i].count
        });
        
        AllCount=AllCount+res[i].count;
      }
    
      avarage=AllCount/res.length;
   // myWords=[{word: "Running", size: "1200"}, {word: "Surfing", size: "2000"}, {word: "Climbing", size: "1200"}, {word: "Kiting", size: "3000"}, {word: "Sailing", size: "2120"}, {word: "Snowboarding", size: "2534"} ]
    
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
var layout = cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size/(avarage*2); })      // font size of words
  .on("end", draw);
layout.start();


function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .style("fill", "rgb("+getRandomInt(200)+","+getRandomInt(200)+","+getRandomInt(200)+ ")");
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log();

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

function handleMouseOver(d, i) {  // Add interactivity
  
 div.transition()
               .duration(50)
               .style("opacity", 1);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          let num = (d.text+" : "+(parseInt(d.size)*(avarage*2)*1.00084).toFixed(0)).toString();
  div.html(num)
     .style("left", (d3.event.pageX + 10) + "px")
     .style("top", (d3.event.pageY - 15) + "px");
}

function handleMouseOut(d, i) {
  div.transition()
               .duration('50')
               .style("opacity", 0);

  d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
}

});
  }
  

}
