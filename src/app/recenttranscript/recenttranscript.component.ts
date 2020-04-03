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
