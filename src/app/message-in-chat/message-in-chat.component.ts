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
    var chat_id_list=[];
   
      for(var z=index;(new Date(yahooOnly[z].date))<=(new Date(end_date)) ;z++)
    {
      if(yahooOnly[z].chat_id=='No chats')
              continue;
      else
          chat_id_list.push(yahooOnly[z].chat_id)
    }
    console.log(chat_id_list)
    
    this._httpService.getSomeChat().subscribe((res:any[])=>{
      var chats=[];
      var line1;
      var line2;
      var line3;
      var chats_list=[];
      var chat_id_chats ;
      var chat_id_chats_list=[]
      for(let row=0;row<chat_id_list.length;row++)
      {
     chat_id_chats = res.filter(function (entry) {
        return entry.chat_id === chat_id_list[row];
      });
      chat_id_chats_list.push(chat_id_chats);
    }
    for(var row=0;row<chat_id_chats_list.length;row++)
    {
      chats=[]
      for(var row1=0;row1<chat_id_chats_list[row].length;row1++)
      {
        if(chat_id_chats_list[row][row1].text1==text)
        {
          
       // chats=chat_id_chats_list[row][row1-1].text+"\n"+chat_id_chats_list[row][row1].text+"\n"+chat_id_chats_list[row][row1+1].text;
       if(row1==0)
       {
         line1=" "
       }
       else
       {
         line1=chat_id_chats_list[row][row1-1].converser+" : "+chat_id_chats_list[row][row1-1].text;
       }
         line2=chat_id_chats_list[row][row1].converser+" : "+chat_id_chats_list[row][row1].text;
         if(row1==chat_id_chats_list[row].length-1)
         {
           line3=" "
         }
         else
              line3=chat_id_chats_list[row][row1+1].converser+" : "+chat_id_chats_list[row][row1+1].text
         chats.push(line1,line2,line3)
         chats_list.push(chats)
        }
        

      }
    }
    console.log(chats_list[0][0])
      var temp= -1; 
   for(var z=index;(new Date(yahooOnly[z].date))<=(new Date(end_date)) ;z++)
    {
      if(yahooOnly[z].chat_id=='No chats')
      {
        continue;
      }
     else{
      temp++;
      
    markup = "<tr><td>"+(new Date(yahooOnly[z].date).getDate())+"-0"+(new Date(yahooOnly[z].date).getMonth()+1)+"-"+(new Date(yahooOnly[z].date).getFullYear())+"</td><td>"+yahooOnly[z].chat_id+"</td><td>"+yahooOnly[z].count+'</td><td>'+chats_list[temp][0] +'<br><span style="background-color: #FFFF00">'+chats_list[temp][1]+'</span><br>'+chats_list[temp][2]+'<br><a href=/chatdisplayin/'+yahooOnly[z].chat_id+"/"+encodeURI(text)+'>(Read entire chat)'+"</a></td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
   
    
   /* var codeBlock = chats_list[temp][0] +'<br>'+
    chats_list[temp][1]+'<br>'+
    chats_list[temp][2] ;

// Inserting the code block to wrapper element
document.getElementById('id').innerHTML = codeBlock*/


    }

  
  }
  });
  
  });
  }
}