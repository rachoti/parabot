import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from "@angular/router";
import { MessageInChatService } from './message-in-chat.service';

@Component({
  selector: 'app-message-in-chat',
  templateUrl: './message-in-chat.component.html',
  styleUrls: ['./message-in-chat.component.css']
})
export class MessageInChatComponent implements OnInit {
temp_start;
temp_end;



  constructor(private router:ActivatedRoute,private _httpService:MessageInChatService) { 
    this.temp_start=this.router.snapshot.paramMap.get("id2");
    this.temp_end=this.router.snapshot.paramMap.get("id3");
  }

  ngOnInit() {
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    var diff;
    var text;
    var start_date;
    var end_date;
    var date_diff_indays = function(date1, date2) {
    
      let dt1 = new Date(date1);
      
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }
    
   text=this.router.snapshot.paramMap.get("id1");
   start_date=this.router.snapshot.paramMap.get("id2");
   end_date=this.router.snapshot.paramMap.get("id3");
   console.log(start_date)
   console.log(end_date)
 this._httpService.getMessageChatCount().subscribe((res:any[])=>{
    var diff=date_diff_indays(start_date,end_date);
    //console.log(diff)
   
       var yahooOnly = res.filter(function (entry) {
         return entry.text1 === text;

         
     });
     var index=0;
     //console.log(yahooOnly[0].date)
     for(var j=0;j<yahooOnly.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(start_date).toLocaleDateString())){
        break;
     }
      index++;
    }
   console.log(new Date(yahooOnly[0].date).toLocaleDateString())
   console.log(new Date(end_date).toLocaleDateString())
    for(var z=index;(new Date(yahooOnly[z].date))<=(new Date(end_date)) ;z++)
    {
      if(yahooOnly[z].chat_id=='No chats')
      {
        continue;
      }
     else{
    markup = "<tr><td>"+(new Date(yahooOnly[z].date).getDate())+"-0"+(new Date(yahooOnly[z].date).getMonth()+1)+"-"+(new Date(yahooOnly[z].date).getFullYear())+"</td><td>"+yahooOnly[z].user_id+"</td><td>"+yahooOnly[z].chat_id+"</td><td>"+yahooOnly[z].count+"</td><td><a href=/chatdisplayin>"+"Read entire chat"+"</a></td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
    }}
  });
  }
}