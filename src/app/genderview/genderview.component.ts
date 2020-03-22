import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GenderviewService } from './genderview.service';
@Component({
  selector: 'app-genderview',
  templateUrl: './genderview.component.html',
  styleUrls: ['./genderview.component.css']
})
export class GenderviewComponent implements OnInit {

  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2017-01-01";
  endDate="";
  startDate1="";
  datePicCount=0;
  malePercentVal;
  femalePercentVal
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
  d1;
  d2;
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
    this.startDate1=startdate;
    this.datePicCount+=1;
  }
  
  dateChangerEnd(enddate: string){
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
      const pieChart = (selector, data) => {
        const size = 500;
        const fourth = size / 2.5;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.female_count, 0);
        const container = d3.select(selector);
        
        const chart = container.append('svg')
          .style('width', '50%')
          .attr('viewBox', `0 0 ${size} ${size}`)
          //.style('border','2px solid black')
          .style('height','400px')
          .style('position','absolute')
          .style('left','270px')
          .style('top','50px');
          
        const plotArea = chart.append('g')
          .attr('transform', `translate(${half}, ${half})`);
          
            
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.label))
          .range(d3.schemeCategory10);
      
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
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut)
        
      };


      let arr=[];
      let index=0;
      for(var i=0;i<res.length-1;i++){
        if((new Date(res[i].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
        }
        index++;
      }
      var totalMen=0;
      var totalWoman=0;
      for(var i=index;i<date_diff_indays(this.startDate1,this.endDate)+1;i++){
        totalMen+= res[i].male_count;
        totalWoman+= res[i].female_count;
        this.d1=totalMen;
        this.d2=totalWoman;
      }
      let t=(totalMen+totalWoman);
      this.malePercentVal=((totalMen/t)*100).toFixed(2);
      this.femalePercentVal=((totalWoman/t)*100).toFixed(2);
      pieChart('#chart', [{label:"Female",female_count:totalWoman},
                          {label:"Male",female_count:totalMen}
                        ]);

    });


    function handleMouseOver(d, i) { 
      div.transition()
                    .duration(50)
                    .style("opacity", 1);
     
       d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');
               let num = (d.data.label+": "+d.data.female_count);
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

  }


  constructor(private router: Router,private _httpService:GenderviewService,public authService: AuthService) { 
    
  }

  ngOnInit() {
          this._httpService.getMessageCount().subscribe((res:any[])=>{
          this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
          this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
          for(let i=0;i<res.length;i++){
            console.log((new Date(res[i].date).toLocaleDateString()));
          }  
          
        });   
        
  }
  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
