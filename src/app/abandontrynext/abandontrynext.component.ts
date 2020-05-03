import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';
import { AbandonnextService } from './Abandonnext.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-abandontrynext',
  templateUrl: './abandontrynext.component.html',
  styleUrls: ['./abandontrynext.component.css']
})
export class AbandontrynextComponent implements OnInit {
  chat_id;

  constructor(private router:ActivatedRoute,private _httpService:AbandonnextService) { 
    this.chat_id=this.router.snapshot.paramMap.get("id1");
  }

  ngOnInit() {
    var temp_chat_id;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    //console.log(this.chat_id)
    this._httpService.getChats().subscribe((res:any[])=>{
      var yahooOnly = res.filter(function (entry) {
        return entry.chat_id==temp_chat_id;

        
    });
    //console.log(yahooOnly)
    for(var z=0;z<yahooOnly.length ;z++)
    {
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text+"</td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
      
    }
    });
  }
  exportCSV()
  {
    let jsono = [];
    jsono = [
      {
        
        converser: 'hghvv',
        Conversation: 'bhvhv',
         
          
      }
      ];
    var temp_chat_id;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    //console.log(this.chat_id)
    this._httpService.getChats().subscribe((res:any[])=>{
      var yahooOnly = res.filter(function (entry) {
        return entry.chat_id==temp_chat_id;

        
    });
    //console.log(yahooOnly)
    for(var z=0;z<yahooOnly.length ;z++)
    {
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text+"</td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
    
   
    var yy=yahooOnly[z].converser
    var zz=yahooOnly[z].text
    let modelData = {
      
        converser: yy,
        Conversation: zz,

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
