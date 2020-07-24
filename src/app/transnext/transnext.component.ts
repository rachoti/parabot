import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TransnextserviceService } from './transnextservice.service';
import * as $ from 'jquery';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-transnext',
  templateUrl: './transnext.component.html',
  styleUrls: ['./transnext.component.css']
})
export class TransnextComponent implements OnInit {
  chat_id;
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  isShowDiv5 = true;
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
  constructor(private router:ActivatedRoute,private _httpService:TransnextserviceService) { 
    this.chat_id=this.router.snapshot.paramMap.get("id1");
  }

  ngOnInit() {
    let myObject = { Converser:"value1", Conversation: "67676877"};
let output = {};
    var temp_chat_id;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    let app;
 
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    function mask(value: string) {
      let maskedvalue="";
      /*var arr = value.split("@");
      // process text before @
       var letter1 = arr[0][0] + "*".repeat(arr[0].length - 2) + arr[0].slice(-1);
      // process text after @
       var letter2 = arr[1][0] + "*".repeat(arr[1].length - 2) + arr[1].slice(-1);
      return letter1 + "@" + letter2; */
      for (let i=0;i<value.length;i++) {
        maskedvalue+="*";
      } 
      return maskedvalue;
    }
   
    //console.log(this.chat_id)
    this._httpService.getChats().subscribe((res:any[])=>{
      var yahooOnly = res.filter(function (entry) {
        return entry.chat_id==temp_chat_id;

        
    });
    //console.log(yahooOnly)
    for(var z=0;z<yahooOnly.length ;z++)
    {

      //var b=mask(yahooOnly[z].text1)
      markup = '<tr><td>'+yahooOnly[z].converser+"</td><td>"+yahooOnly[z].text1+"</td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    //tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
      
    }
    });
    Object.keys(myObject).forEach(key => {
      output[key]= mask(myObject[key]);
});
console.log(output);

  }

  ExportCSV(){
    let jsono = [];
    jsono = [
      {
        Converser: '16-09-2018',
        Conversation: 'hghvv',

          
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

    $("table tbody tr").remove();

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
    var yy=yahooOnly[z].converser
    var zz=yahooOnly[z].text1
    let modelData = {
      
        Converser: yy,
        Conversation: zz
        
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