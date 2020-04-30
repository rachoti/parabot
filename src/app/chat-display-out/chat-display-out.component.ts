import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ChatDisplayOutService } from './chat-display-out.service';
import * as $ from 'jquery';
import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-display-out',
  templateUrl: './chat-display-out.component.html',
  styleUrls: ['./chat-display-out.component.css']
})
export class ChatDisplayOutComponent implements OnInit {

  chat_id;
text;
  constructor(private router:ActivatedRoute,private _httpService:ChatDisplayOutService,private router2: Router) {
    this.chat_id=this.router.snapshot.paramMap.get("id1");
    this.text=this.router.snapshot.paramMap.get("id2");
    
   }
   router1(search)
   {
     
     
  this.router2.navigate(['/searchpagenew/'+search+'/message_out'])
     
 
   }
  ngOnInit() {
    var temp_chat_id;
    var temp_text;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    temp_text=this.router.snapshot.paramMap.get("id2");
    //console.log(this.chat_id)
    this._httpService.getEntireChat().subscribe((res:any[])=>{
      var yahooOnly = res.filter(function (entry) {
        return entry.chat_id==temp_chat_id;

        
    });
    //console.log(yahooOnly)
    for(var z=0;z<yahooOnly.length ;z++)
    {
      if(yahooOnly[z].text1==temp_text && yahooOnly[z].converser=='wizard')
      {
        markup = '<tr><td>'+yahooOnly[z].converser+'</td><td><span style="background-color: #FFFF00">'+yahooOnly[z].text+"</span></td></tr>"; 
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
        //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;
      }
      else
      {
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text+"</td></tr>"; 
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
  exportCSV(){
    let jsono = [];
      jsono = [
        {
          Converser: 'hbh',
            Conversation: 'jnj'
            
            
        }
        ];
    var temp_chat_id;
    var temp_text;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    temp_text=this.router.snapshot.paramMap.get("id2");
    //console.log(this.chat_id)
    this._httpService.getEntireChat().subscribe((res:any[])=>{
      var yahooOnly = res.filter(function (entry) {
        return entry.chat_id==temp_chat_id;

        
    });
    //console.log(yahooOnly)
    $("table tbody tr").remove();
    for(var z=0;z<yahooOnly.length ;z++)
    {
      if(yahooOnly[z].text1==temp_text && yahooOnly[z].converser=='user')
      {
        markup = '<tr><td>'+yahooOnly[z].converser+'</td><td><span style="background-color: #FFFF00">'+yahooOnly[z].text+"</span></td></tr>"; 
        tableBody = $("table tbody"); 
        tableHead=$("shadow")
        //tableHead.append(aa)
        tableBody.append(markup); 
        lineNo++; 
        c++;
      }
      else
      {
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text+"</td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
          var xx=yahooOnly[z].converser
          var yy=yahooOnly[z].text
          
          
          let modelData = {
            Converser: xx,
            Conversation: yy
            
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


    });
  }
}

