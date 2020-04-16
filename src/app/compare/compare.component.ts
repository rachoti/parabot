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
console.log(fin)
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = fin;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.date));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.count)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.count));
    });
  }

}

