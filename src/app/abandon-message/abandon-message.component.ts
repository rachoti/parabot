import { Component, OnInit } from '@angular/core';
import { AbandonmsgserviceService } from './abandonmsgservice.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-abandon-message',
  templateUrl: './abandon-message.component.html',
  styleUrls: ['./abandon-message.component.css']
})
export class AbandonMessageComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
  startDate1="";
  datePicCount=0;

 
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
  isShowDiv5 = true;
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
  dateChanger(startdate: string){
    
    
    this.startDate1=startdate;
    
    this.datePicCount+=1;

  }
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/abandon'])
    

  }
  dateChangerEnd(enddate: string){
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    var c=0;
    let lineNo = 0;
  this.endDate=enddate;
  this.startDate1;
  this.inputStartDate=this.startDate1;
  this.inputEndDate=this.endDate;
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    
    $("table tbody tr").remove();
    this._httpService.getabandonmsg().subscribe((res:any[])=>{
      var index=0;
      for(var j=0;j<res.length;j++){
    
        //console.log(new Date(this.startDate1))
        //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      console.log(index)
      console.log(this.endDate)
      console.log(res[0].date)
      for(var z=index;(new Date(res[z].date))<=(new Date(this.endDate));z++)
      {
        
        if(res[z].chat_id=='No chats')
        {
          continue;
        }
        else
        {
         markup="<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].chat_id+'<br><a href=/abanndontrynext/'+res[z].chat_id+'>(Read chats)'+"</a></td><td>"+res[z].leave_convo+"</td></tr>"  
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
        //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;
        }
        
       }  
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
 
    
  });

}
  
  
  constructor(private router: Router,private _httpService:AbandonmsgserviceService) { }

  ngOnInit() {
    
      var lineData = [];
      var markup;
      var tableBody;
      let lineNo = 0;
      var tableHead;
      let c=0;
      this._httpService.getabandonmsg().subscribe((res:any[])=>{
        console.log(res[0].date)
        
        this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
        
        this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
        this.inputStartDate= this.startDate;
        this.inputEndDate=this.endDate;
      });
      
        
      
    }

    dateChangerEndexport(enddate: string){
      let jsono = [];
    jsono = [
      {
        Date: '16-09-2018',
          Chat_id: 'hghvv',
          leave_convo: 'bhvhv',
         
          
      }
      ];
      var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    var c=0;
    let lineNo = 0;
  this.endDate=enddate;
  this.startDate1;
  this.inputStartDate=this.startDate1;
  this.inputEndDate=this.endDate;
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    
    $("table tbody tr").remove();
    this._httpService.getabandonmsg().subscribe((res:any[])=>{
      var index=0;
      for(var j=0;j<res.length;j++){
    
        //console.log(new Date(this.startDate1))
        //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(res[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      console.log(index)
      console.log(this.endDate)
      console.log(res[0].date)
      for(var z=index;(new Date(res[z].date))<=(new Date(this.endDate));z++)
      {
        
        if(res[z].chat_id=='No chats')
        {
          continue;
        }
        else
        {
         markup="<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].chat_id+'<br><a href=/abanndontrynext/'+res[z].chat_id+'>(Read chats)'+"</a></td><td>"+res[z].leave_convo+"</td></tr>"  
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
        //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;

        var x=new Date(res[z].date).getDate()
        var y=new Date(res[z].date).getMonth()+1
        var k=new Date(res[z].date).getFullYear()
        var xx=x+'-0'+y+'-'+k
        var yy=res[z].chat_id
        var zz=res[z].leave_convo
        
        let modelData = {
          Date: xx,
            Chat_id: yy,
            leave_convo: zz,

      }; 
  
      jsono.push(modelData);
        }
        
       }
       console.log("infoooo",jsono)
      
       const options = { 
         fieldSeparator: ',',
         quoteStrings: '"',
         decimalSeparator: '.',
         showLabels: true, 
         showTitle: true,
         title: 'My Awesome CSV',
         useTextFile: false,
         useBom: true,
         useKeysAsHeaders: true,
         // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
       };
      
     const csvExporter = new ExportToCsv(options);
     jsono.splice(0,1);
 
     csvExporter.generateCsv(jsono);  
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
 
    
  });
}

}