import { Component, OnInit } from '@angular/core';
import { TranscriptserviceService } from './transcriptservice.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.css']
})
export class TranscriptComponent implements OnInit {
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
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/transcript'])
    

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
    this._httpService.getMessageCount().subscribe((res:any[])=>{
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
         markup="<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].chat_id+"</td><td>"+res[z].user_id+"</td></tr>"  
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
        //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;
        }
        /*if(res[z].chat_id=='No chats')
        {
          continue;
        }
       else{
        
        markup = "<tr><td>"+new Date(res[z].date)+ "</td<td>"+ res[z].chat_id+ "</td><td>"+ res[z].user_id+ "</td></tr>"; 
  
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      //tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;*/
       }  
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
      
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
 
    
  });

}
  
  
  constructor(private router: Router,private _httpService:TranscriptserviceService) { }

  ngOnInit() {
    
      var lineData = [];
      var markup;
      var tableBody;
      let lineNo = 0;
      var tableHead;
      let c=0;
      this._httpService.getMessageCount().subscribe((res:any[])=>{
        console.log(res[0].date)
        
        this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
        
        this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
        this.inputStartDate= this.startDate;
        this.inputEndDate=this.endDate;
      });
      this._httpService.get_transcript_7_days().subscribe((res:any[])=>{
        let c=0;
        
   
      
        for(var z=0;z<res.length;z++)
        {
          
          
          if(res[z].chat_id=='No chats')
          {
            continue;
          }
          else
          {
           markup="<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].chat_id+"</td><td>"+res[z].user_id+"</td></tr>"  
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

    dateChangerEndexport(enddate: string){
      let jsono = [];
      jsono = [
        {
          Chat_ID: 'hbh',
          User_ID: 'jnj'
            
            
        }
        ];
      var lineData = [];
      var markup;
      var tableBody;
      var tableHead;
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
      
     
     this._httpService.getMessageCount().subscribe((res:any[])=>{
        let c=0;
        var outputArray = []; 
          
      
        var count = 0; 
         var aa; 
        
        var start = false; 
        var lookup = {};
         
        var result = [];
        
       
        $("table tbody tr").remove();
        
        for (let j = 0; j < res.length; j++) { 
            for (let k = 0; k < outputArray.length; k++) { 
                if ( res[j].chat_id == outputArray[k] ) { 
                    start = true; 
                } 
            } 
            /*count++; 
            if (count == 1 && start == false && res[j].chat_id!=0) { 
                outputArray.push(res[j].chat_id); 
            } 
            start = false; 
            count = 0; */
          }
       
      
     
        
        let arr=[];
        let index=0;
        
        
        
      
  
       for(let i=0;i<outputArray.length;i++)
       {
         var yahooOnly = res.filter(function (entry) {
           return entry.chat_id === outputArray[i];
  
           
       });
       
      //console.log(yahooOnly)
     index=0
      for(var j=0;j<yahooOnly.length;j++){
        
        console.log(new Date(this.startDate1))
        console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      
      var sum_user1=0;
      var sum_msg1=0;
    
      for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
       
        sum_user1+=yahooOnly[z].count;
        sum_msg1+=yahooOnly[z].incoming_msg_count;
        
      }
      console.log(sum_user1)
      console.log(sum_msg1)
      aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
      markup = "<tr><td>"+ outputArray[i]+ "</td><td>"+ sum_user1+ "</td><td>"+ sum_msg1+ "</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
                var xx=outputArray[i]
                var yy=sum_user1
                var zz=sum_msg1
                
                let modelData = {
                transcript: xx,
                  Chat_ID: yy,
                  User_ID: zz
            }; 

            jsono.push(modelData);
            
    }
    //console.log(index)
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
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
      
    });
  
    

    }
        
        
      
      
      /*aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
      markup = "<tr><td><a href="+"/messageinchat/"+encodeURI(outputArray[i])+"/"+this.inputStartDate+"/"+this.inputEndDate+">"+outputArray[i]+ "</a></td><td>"+ sum_user1+ "</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
      */

      /*var xx=outputArray[i]
      var yy=sum_user1
      
      
      let modelData = {
      TimeZone: xx,
        Users: yy,
        
  }; 

  jsono.push(modelData);

       }
       console.log("infoooo",jsono)
      
        const options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true, 
          showTitle: true,
          title: 'Report',
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
          // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };
       
      const csvExporter = new ExportToCsv(options);
      jsono.splice(0,1);
  
      csvExporter.generateCsv(jsono);
    //console.log(index)
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
      
    });
    }
    

  }
  */
}