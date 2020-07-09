import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentichatdispService } from './sentichatdisp.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sentichatdisp',
  templateUrl: './sentichatdisp.component.html',
  styleUrls: ['./sentichatdisp.component.css']
})
export class SentichatdispComponent implements OnInit {
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
  constructor(private router:ActivatedRoute,private _httpService:SentichatdispService,private router2: Router) { 
    this.chat_id=this.router.snapshot.paramMap.get("id1");
    
   }
   router1(search)
   {
     
     
  this.router2.navigate(['/searchpagenew/'+search+'/message_in'])
     
 
   }

  ngOnInit() {
    var temp_chat_id;
    var temp_text;
    var chat=[];
    var converser=[];
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    var f=0;
    temp_chat_id=this.router.snapshot.paramMap.get("id1");
    this._httpService.getChat().subscribe((res:any[])=>{

      for(var z=0;z<res.length ;z++){
       f=0;
         if(temp_chat_id==res[z].chat_id){

         var a=(res[z].text)
         var b=(res[z].converser)
         markup = '<tr><td>'+b+'</td><td>'+a+"</span></td></tr>"; 
         tableBody = $("table tbody"); 
         tableHead=$("shadow")
         //tableHead.append(aa)
         tableBody.append(markup); 
         lineNo++; 
         c++;
         
         }
         
         
        }
      
      
      

     
      
        

      





      /*for(var z=0;z<res.length ;z++)
      {
        if(res[z].chat_id==temp_chat_id && res[z].converser=='user')
        {
          markup = '<tr><td>'+res[z].converser+'</td><td><span style="background-color: #FFFF00">'+res[z].text+"</span></td></tr>"; 
          tableBody = $("table tbody"); 
          tableHead=$("shadow")
          //tableHead.append(aa)
          tableBody.append(markup); 
          lineNo++; 
          c++;
        }
        else
        {
        markup = '<tr><td>'+res[z].converser+"</td><td>"+res[z].text+"</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      //tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
        }
      }*/
    });
    }

}
