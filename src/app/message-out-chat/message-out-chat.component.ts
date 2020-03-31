import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MessageOutChatService } from './message-out-chat.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-message-out-chat',
  templateUrl: './message-out-chat.component.html',
  styleUrls: ['./message-out-chat.component.css']
})
export class MessageOutChatComponent implements OnInit {
text;
    constructor(private router:ActivatedRoute,private _httpService:MessageOutChatService) { }
  
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
   this._httpService.getMessageChatCount().subscribe((res:any[])=>{
      var diff=date_diff_indays(start_date,end_date);
      //console.log(diff)
     
         var yahooOnly = res.filter(function (entry) {
           return entry.text1 === text;
  
           
       });
       var index=0;
       console.log("vasghfdhfag",yahooOnly[0].date)
       console.log(yahooOnly.length)
       for(var j=0;j<yahooOnly.length;j++){
        
        //console.log(new Date(this.startDate1))
        //console.log(new Date(yahooOnly[j].date).toLocaleDateString())

       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(start_date).toLocaleDateString())){
          break;
       }
        index++;
      }
     
      for(var z=index;z<=date_diff_indays(start_date,end_date)+index;z++)
      {
      
      markup = "<tr><td>"+(new Date(res[z].date).getDate())+"-0"+(new Date(res[z].date).getMonth()+1)+"-"+(new Date(res[z].date).getFullYear())+"</td><td>"+res[z].wizard_id+"</td><td>"+res[z].chat_id+"</td><td>"+res[z].count+"</td><td><a href=#>"+"Read entire chat"+"</a></td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      //tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
      }
    });
    }
  }