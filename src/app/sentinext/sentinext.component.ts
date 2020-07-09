import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SentinextService } from './sentinext.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-sentinext',
  templateUrl: './sentinext.component.html',
  styleUrls: ['./sentinext.component.css']
})
export class SentinextComponent implements OnInit {
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
  constructor(private router:ActivatedRoute,private _httpService:SentinextService) {

    this.chat_id=this.router.snapshot.paramMap.get("id1");

   }

  ngOnInit() {
    var chatpos=[];
    var chatneg=[];
    var date;
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    var d;
    date=this.router.snapshot.paramMap.get("id1");

    this._httpService.getChatid().subscribe((res:any[])=>{
     // var yahooOnly = res.filter(function (entry) {
       // return entry.chat_id==temp_chat_id;
       for ( var k=0;k<res.length;k++){
        console.log(res[k].date)

        if(date==res[k].date && res[k].Sentiment==1)
        {
          
          var a=res[k].date
          chatpos.push(res[k].chat_id)
        }
        if(date==res[k].date && res[k].Sentiment==0)
        {
          
          var b=res[k].date
          chatneg.push(res[k].chat_id)
        }
          
      }
      console.log(a,chatpos)
      console.log(b,chatneg)
      var len=chatpos.length + chatneg.length
      if(chatpos.length>chatneg.length)
      { 
      for (var j=0;j<chatpos.length;j++){
        if (j >= chatneg.length)
        {
           d=" ";
        }
        else 
        {
          d=chatneg[j];
        }
       // markup="<tr><td>"+res[z].chat_id+'<br><a href=/transnext/'+res[z].chat_id+'>(Read chats)'+"</a></td><td>"+res[z].user_id+"</td></tr>"  
      // markup = "<tr><td><a href="+"/messageinchat/"+encodeURI(outputArray[i])+"/"+this.inputStartDate+"/"+this.inputEndDate+">"+ outputArray[i]+ "</a></td><td>"+sum_msg + "</td></tr>"; 
       //markup = "<tr><td>"+chatpos[j]+"</td><td>"+d+"</td></tr>"; 

      markup = "<tr><td><a href="+"/sentichatdisp/"+encodeURI(chatpos[j])+"/"+d+">"+ chatpos[j]+ "</a></td><td><a href="+"/sentichatdisp/"+encodeURI(d)+"/"+chatpos[j]+">"+ d + "</a></td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      //tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
        
    }
  }
 else
      { 
      for (var j=0;j<chatneg.length;j++){
        if (j >= chatpos.length)
        {
           d=" ";
        }
        else 
        {
          d=chatpos[j];
        }

      markup = '<tr><td>'+d+"</td><td>"+chatneg[j]+"</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      //tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
        
    }
  }
        
    });

    this._httpService.getChat().subscribe((ser:any[])=>{
      for ( var x=0;x<ser.length;x++){

      if("2bbb1315-3518-4d31-bb20-8b523f736aad"==ser[x].chat_id){

        console.log(ser[x].converser,ser[x].text)
      }

      }
    });


  }

}
