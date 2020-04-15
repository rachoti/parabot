import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TransnextserviceService } from './transnextservice.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-transnext',
  templateUrl: './transnext.component.html',
  styleUrls: ['./transnext.component.css']
})
export class TransnextComponent implements OnInit {
  chat_id;

  constructor(private router:ActivatedRoute,private _httpService:TransnextserviceService) { 
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
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text1+"</td></tr>"; 
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