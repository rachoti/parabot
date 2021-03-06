import { Component, OnInit } from '@angular/core';
import d3_save_pdf from 'd3-save-pdf';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import { SentimentService } from './sentiment.service';
import { Alert } from 'selenium-webdriver';

declare var $:any;
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
  sss;

  malePercentVal;
  femalePercentVal
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
    
    
 this.router.navigate(['/searchpagenew/'+search+'/sentiment'])
    

  }
  constructor(private router: Router,private _httpService:SentimentService,public authService: AuthService) { }
  
  ngOnInit() {
    var lineData = [];
    
    var outputArray1=[];
    var start1= false
    var count1=0
    let arr1=[];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;

    var xData=[];
    var nData=[];
    this._httpService.getMessageCount().subscribe((res:any[])=>{
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
    

   
          
   
    for(let i=res.length-3;i>=(res.length-9);i--){

      console.log((new Date(res[i].date).toLocaleDateString()));
      var r=res[i].date
           
      var obj ={date:new Date(r),user_count:res[i].positive};
      var obj1={date:new Date(r),user_count:res[i].negative};

      nData.push(obj1);
      xData.push(obj);
   

}
console.log(xData)
var height  = 400;
var width   = 800;
var hEach   = 40;
var margin = {top: 15, right: 40, bottom: 20, left: 30};

width =     width - margin.left - margin.right;
height =    height - margin.top - margin.bottom;

 this.sss = d3.select('svg')
  .attr("width",  width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().range([0, width]);
  
x.domain(d3.extent(xData, function(d) { return d.date; }));


var y = d3.scaleLinear().range([height, 0]);


y.domain([d3.min(xData, function(d) { return d.user_count; }) - 5, 50]);

var valueline = d3.line()
        .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.user_count);  })
        .curve(d3.curveMonotoneX);

  this.sss.append("path")
    .data([xData]) 
    .attr("class", "line")  
  .attr("d", valueline) 
  .attr("fill","none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", "3");

//  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%d-%b-%y")).tickValues(xData.map(d=>d.date));

this.sss.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_woy);

        //d3_save_pdf.embedRasterImages(svg.node());

//  Add the Y Axis
//  svg.append("g").call(d3.axisLeft(y));

this.sss.selectAll(".dot")
    .data(xData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.user_count) })
    .attr("r", 5);  


    this.sss.selectAll(".text")
    .data(xData)
    .enter()
    .append("text") // Uses the enter().append() method
    .attr("class", "label") // Assign a class for styling
    .attr("x", function(d, i) { return x(d.date) })
    .attr("y", function(d) { return y(d.user_count) })
    .attr("dy", "-5")
    .text(function(d) {return d.user_count; });
    this.sss.append('text')                                     
      .attr('x', 10)              
      .attr('y', -5)             




      
  console.log(nData)
  var height  = 400;
  var width   = 800;
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
    
  x.domain(d3.extent(nData, function(d) { return d.date; }));
  
  
  var y = d3.scaleLinear().range([height, 0]);
  
  
  y.domain([d3.min(nData, function(d) { return d.user_count; }) - 5, 50]);
  
  var valueline = d3.line()
          .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.user_count);  })
          .curve(d3.curveMonotoneX);
  
  svg.append("path")
      .data([nData]) 
      .attr("class", "line")  
    .attr("d", valueline) 
    .attr("fill","none")
    .attr("stroke", "red")
    .attr("stroke-width", "3");
  
  //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
  var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%d-%b-%y")).tickValues(nData.map(d=>d.date));
  
  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis_woy);
  
          //d3_save_pdf.embedRasterImages(svg.node());
  
  //  Add the Y Axis
  //  svg.append("g").call(d3.axisLeft(y));
  
  svg.selectAll(".dot")
      .data(nData)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d) { return x(d.date) })
      .attr("cy", function(d) { return y(d.user_count) })
      .attr("r", 5);  
  
  
  svg.selectAll(".text")
      .data(nData)
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


        for ( var j=0;j<xData.length;j++){
        
          if(xData[j].user_count==0 && nData[j].user_count==0)
          {
            //var date=(new Date(xData[j].date).getDate())+"-0"+(new Date(xData[j].date).getMonth()+1)+"-"+(new Date(xData[j].date).getFullYear())
            markup="<tr><td>"+(new Date(xData[j].date).getDate())+"-0"+(new Date(xData[j].date).getMonth()+1)+"-"+(new Date(xData[j].date).getFullYear())+"</td><td>"+xData[j].user_count+"</td><td>"+nData[j].user_count+"</td><td></td></tr>"  
            tableBody = $("table tbody"); 
            tableHead=$("shadow")
           //tableHead.append(aa)
            tableBody.append(markup); 
            lineNo++; 
            c++;
          }
          else
          {

        var date=(new Date(xData[j].date).getDate())+"-0"+(new Date(xData[j].date).getMonth()+1)+"-"+(new Date(xData[j].date).getFullYear())
        markup="<tr><td>"+(new Date(xData[j].date).getDate())+"-0"+(new Date(xData[j].date).getMonth()+1)+"-"+(new Date(xData[j].date).getFullYear())+"</td><td>"+xData[j].user_count+"</td><td>"+nData[j].user_count+'</td><td><a href=/sentinext/'+date+'>View Chat_Id</a></td></tr>'  
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
       //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;
        }
      }

  });   

  

  }
  

        dateChanger(startdate: string){
          this.startDate1=startdate;
          this.datePicCount+=1;
          console.log("changeeeeeeeeeeeeeee")
        $('#sss').remove();
        
          
        }

        dateChangerEnd(enddate: string)
        {
           // $('svg').append('svg');
           

          var chat=[];
          var lineData = [];
          var markup;
          var mp;
          var mp1;
          var tableBody;
          var ty;
          var ty1;
          var tableHead;
          var c=0;
          let lineNo = 0;
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



      
      
    this._httpService.getMessageCount().subscribe((res:any[])=>{
    

      
      let arr=[];
      let index=0;
      for(var i=0;i<res.length-1;i++){
        if((new Date(res[i].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
        }
        index++;
        
      }
      index=index+1;
      var negData = [];
      var lineData = [];
      var xData = [];
      var nData= [];
      var count=0
      var sum=date_diff_indays(this.startDate1,this.endDate)
      index=index-1
      for(var i=index;i<date_diff_indays(this.startDate1,this.endDate)+index+1;i++){
        
         

            var r=res[i].date
           
              var obj ={date:new Date(r),user_count:res[i].positive};
              var obj1 ={date:new Date(r),user_count:res[i].negative};
              
              xData.push(obj);
              nData.push(obj1);
      count=count+1;
    }
    console.log(xData)

    if (count>7){
      console.log("len",xData.length)
    for(var j=xData.length-1;j>=(xData.length-7);j--){
    var s=xData[j]
    lineData.push(s);
    }
    for(var j=nData.length-1;j>=(nData.length-7);j--){
      var s=nData[j]
      negData.push(s);
      }
  }
    if (count<7){
      console.log("len",xData.length)
    for(var k=0;k<=xData.length-1;k++){
    var l=xData[k]
    lineData.push(l);
    }
    for(var k=0;k<=nData.length-1;k++){
      var l=nData[k]
      negData.push(l);
      }
    
    
} 


          var height  = 400;
          var width   = 800;
          var hEach   = 40;
          var margin = {top: 15, right: 40, bottom: 20, left: 30};
    
          width =     width - margin.left - margin.right;
          height =    height - margin.top - margin.bottom;
          
          var sss = d3.select('svg')
            .attr("width",  width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
          var x = d3.scaleTime().range([0, width]);
            
          x.domain(d3.extent(lineData, function(d) { return d.date; }));
          
          
          var y = d3.scaleLinear().range([height, 0]);
          
          
          y.domain([d3.min(lineData, function(d) { return d.user_count; }) - 5, 50]);
          
          var valueline = d3.line()
                  .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.user_count);  })
                  .curve(d3.curveMonotoneX);
          
          sss.append("path")
              .data([lineData]) 
              .attr("class", "line")  
            .attr("d", valueline) 
            .attr("fill","none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", "3");
          
          //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
          var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%d-%b-%y")).tickValues(lineData.map(d=>d.date));
          
          sss.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis_woy);

                  //d3_save_pdf.embedRasterImages(svg.node());
          
          //  Add the Y Axis
          //  svg.append("g").call(d3.axisLeft(y));
          
          sss.selectAll(".dot")
              .data(lineData)
              .enter()
              .append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d) { return x(d.date) })
              .attr("cy", function(d) { return y(d.user_count) })
              .attr("r", 5);  
          
          
          sss.selectAll(".text")
              .data(lineData)
              .enter()
              .append("text") // Uses the enter().append() method
              .attr("class", "label") // Assign a class for styling
              .attr("x", function(d, i) { return x(d.date) })
              .attr("y", function(d) { return y(d.user_count) })
              .attr("dy", "-5")
              .text(function(d) {return d.user_count; });
                sss.append('text')                                     
                .attr('x', 10)              
                .attr('y', -5)  
                
                
        
 

          var height  = 400;
          var width   = 800;
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
            
          x.domain(d3.extent(negData, function(d) { return d.date; }));
          
          
          var y = d3.scaleLinear().range([height, 0]);
          
          
          y.domain([d3.min(negData, function(d) { return d.user_count; }) - 5, 50]);
          
          var valueline = d3.line()
                  .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.user_count);  })
                  .curve(d3.curveMonotoneX);
          
          svg.append("path")
              .data([negData]) 
              .attr("class", "line")  
            .attr("d", valueline) 
            .attr("fill","none")
            .attr("stroke", "red")
            .attr("stroke-width", "3");
          
          //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
          var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%d-%b-%y")).tickValues(negData.map(d=>d.date));
          
          svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis_woy);

                  //d3_save_pdf.embedRasterImages(svg.node());
          
          //  Add the Y Axis
          //  svg.append("g").call(d3.axisLeft(y));
          
          svg.selectAll(".dot")
              .data(negData)
              .enter()
              .append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d) { return x(d.date) })
              .attr("cy", function(d) { return y(d.user_count) })
              .attr("r", 5);  
          
          
          svg.selectAll(".text")
              .data(negData)
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

                
                ty = $("#graph"); 
                mp=$("#sss")
                //mp1=$("#svg")
                ty.append(mp);
                //ty.append(mp1);
           

                this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
                this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
                ;  
                var config = {
                  filename: 'customFileName',
                }
                console.log(res.length)

                $("table tbody tr").remove();
                this._httpService.getChatid().subscribe((ser:any[])=>{

               // d3_save_pdf.save(d3.select('svg').node(), config);  
               // $( "div" ).remove( ".shadow" );    
               
               // $(".shadow").append();
               
               
               
                for (j=0;j<lineData.length;j++){
                  chat=[];
                 var date=(new Date(lineData[j].date).getDate())+"-0"+(new Date(lineData[j].date).getMonth()+1)+"-"+(new Date(lineData[j].date).getFullYear())
                  console.log(date)
                  for (k=0;k<ser.length;k++){
                    console.log(ser[k].date)

                    if(date==ser[k].date && ser[k].predict_output==1)
                    {
                      
                      var a=ser[k].date
                      chat.push(ser[k].chat_id)
                    }
                      
                  }
                  console.log(a,chat)
                  console.log("-----------------------------------------------------")

                  
                  if(lineData[j].user_count==0 && negData[j].user_count==0)
                  {
                    //var date=(new Date(xData[j].date).getDate())+"-0"+(new Date(xData[j].date).getMonth()+1)+"-"+(new Date(xData[j].date).getFullYear())
                    markup="<tr><td>"+(new Date(lineData[j].date).getDate())+"-0"+(new Date(lineData[j].date).getMonth()+1)+"-"+(new Date(lineData[j].date).getFullYear())+"</td><td>"+lineData[j].user_count+"</td><td>"+negData[j].user_count+"</td><td></td></tr>"  
                    tableBody = $("table tbody"); 
                    tableHead=$("shadow")
                  //tableHead.append(aa)
                    tableBody.append(markup); 
                    lineNo++; 
                    c++;
                  }
                  else
                  {
                          //markup="<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].chat_id+'<br><a href=/transnext/'+res[z].chat_id+'>(Read chats)'+"</a></td><td>"+res[z].user_id+"</td></tr>"  

                  //markup="<tr><td>"+(new Date(lineData[j].date).getDate())+"-0"+(new Date(lineData[j].date).getMonth()+1)+"-"+(new Date(lineData[j].date).getFullYear())+"</td><td>"+lineData[j].user_count+"</td><td>"+negData[j].user_count+"</td></tr>"  


                  markup="<tr><td>"+(new Date(lineData[j].date).getDate())+"-0"+(new Date(lineData[j].date).getMonth()+1)+"-"+(new Date(lineData[j].date).getFullYear())+"</td><td>"+lineData[j].user_count+"</td><td>"+negData[j].user_count+'</td><td><a href=/sentinext/'+date+'>View Chat_Id</a></td></tr>'  
                  tableBody = $("table tbody"); 
                  tableHead=$("shadow")
                 //tableHead.append(aa)
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
          }

                }
                 
          
               
                
               
              });
              

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
