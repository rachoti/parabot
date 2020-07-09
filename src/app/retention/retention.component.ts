import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from "d3";
import { AuthService } from '../auth.service';
import {RetentionService} from './retention.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.css']
})
export class RetentionComponent implements OnInit {

  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
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
  type1;
  type2;

  existing(type)
  {
    var lineData = [];
    var markup;
    var tableBody;
    let lineNo = 0;
    this.type2
    console.log(this.type2)
   this.type1=type;
   console.log(type)
   if(type=='exist'   )
   {
    this.thData="Existing";
    this._httpService.getExistingDayCount().subscribe((res:any[])=>{
      lineData=[]
     console.log("exist")
      let c=0;
      $("table tbody tr").remove();
      lineNo=0;
    
      for(let i=res.length-1;i>=0;i--){
        var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
        lineData.push(obj);
    
        
                
                 
               
                $(".exdays").css("background-color"," rgb(109, 109, 109)"); 
                $(".exdays").css("color","white");
                $(".exweeks").css("background-color","white"); 
                $(".exweeks").css("color","gray");
                $(".exmonths").css("background-color","white"); 
                $(".exmonths").css("color","gray");
                markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
                tableBody = $("table tbody"); 
                tableBody.append(markup); 
                lineNo++; 
                c++;
    
        
      }
      
    });
   }
   else if(type=='new')
   {
    this.thData="New";
     lineData=[]
    this._httpService.getNewDayCount().subscribe((res:any[])=>{
      let c=0;
     console.log("new")
        $("table tbody tr").remove();
        lineNo=0;
     
			for(let i=res.length-1;i>=0;i--){
				var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
        lineData.push(obj);
        
               
                 
                $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
                $(".newdays").css("color","white");
                $(".newweeks").css("background-color","white"); 
                $(".newweeks").css("color","gray");
                $(".newmonths").css("background-color","white"); 
                $(".newmonths").css("color","gray");
                markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
                tableBody = $("table tbody"); 
                tableBody.append(markup); 
                lineNo++; 
                c++;


              
            
            $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
            $(".newdays").css("color","white");
            $(".newweeks").css("background-color","white"); 
            $(".newweeks").css("color","gray");
            $(".newmonths").css("background-color","white"); 
            $(".newmonths").css("color","gray");
            markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
            tableBody = $("table tbody"); 
            tableBody.append(markup); 
            lineNo++; 
            c++;
   
        
      }
      
    });

   }
   
  
   }
  
  days(type)
  {
    var lineData = [];
    var markup;
    var tableBody;
    let lineNo = 0;
    this.type1;
    this.type2=type
    if(type=='newweek' && this.type1==null)
    {
      lineData = [];
      this._httpService.getNewWeekCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
        lineNo=0;
      
        for(let i=res.length-1;i>=0;i--){
          
            
               
              
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newmonths").css("background-color","white"); 
              $(".newmonths").css("color","gray");
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newweeks").css("background-color"," rgb(109, 109, 109)"); 
              $(".newweeks").css("color","white");
                  markup = "<tr><td>"+ new Date(res[i].start_date).toLocaleDateString()+ " -- "+new Date(res[i].end_date).toLocaleDateString()+"</td><td>"+ res[i].count+ "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
        }
        
      });

    }
    else if(type=='newmonth' && this.type1==null)
    {
      this.thData="New";
      this._httpService.getNewMonthCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
                lineNo=0;
        for(let i=res.length-1;i>=0;i--){
          var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
          lineData.push(obj);
          $(".newdays").css("background-color","white"); 
          $(".newdays").css("color","gray");
          $(".newweeks").css("background-color","white"); 
              $(".newweeks").css("color","gray");
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newmonths").css("background-color"," rgb(109, 109, 109)"); 
              $(".newmonths").css("color","white");
                  markup = "<tr><td>"+ res[i].Month+ "</td><td>"+ res[i].count + "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
          
        }
        
      });
    }
    if(type=='exday' && this.type1=='exist' )
    {
      this.thData="Existing";
      lineData = [];
      console.log(this.type1+" "+type)
     this._httpService.getExistingDayCount().subscribe((res:any[])=>{
       console.log("exiday")
       let c=0;
       $("table tbody tr").remove();
       lineNo=0;
     
       for(let i=res.length-1;i>=0;i--){
         var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
         lineData.push(obj);
              $(".exdays").css("background-color"," rgb(109, 109, 109)"); 
                 $(".exdays").css("color","white");
                 $(".exweeks").css("background-color","white"); 
                 $(".exweeks").css("color","gray");
                 $(".exmonths").css("background-color","white"); 
                 $(".exmonths").css("color","gray");
                 markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
                 tableBody = $("table tbody"); 
                 tableBody.append(markup); 
                 lineNo++; 
                 c++;
     
         
       }
       
     });
   }
     else if(type=='newday' && this.type1=='new')
     {
      this.thData="New";
      lineData = [];
      this._httpService.getNewDayCount().subscribe((res:any[])=>{
        let c=0;
       console.log("new")
          $("table tbody tr").remove();
          lineNo=0;
       
        for(let i=res.length-1;i>=0;i--){
          var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
          lineData.push(obj);
          
                 
                   
                  $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
                  $(".newdays").css("color","white");
                  $(".newweeks").css("background-color","white"); 
                  $(".newweeks").css("color","gray");
                  $(".newmonths").css("background-color","white"); 
                  $(".newmonths").css("color","gray");
                  markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
  
  
                
              
              $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
              $(".newdays").css("color","white");
              $(".newweeks").css("background-color","white"); 
              $(".newweeks").css("color","gray");
              $(".newmonths").css("background-color","white"); 
              $(".newmonths").css("color","gray");
              markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
              tableBody = $("table tbody"); 
              tableBody.append(markup); 
              lineNo++; 
              c++;
     
          
        }
        
      });
     }
     if(type=='exxweek' && this.type1=='exist')
    {
      this.thData="Existing";
      lineData = [];
      console.log(this.type1+" "+type)
      this._httpService.getExistingWeekCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
                lineNo=0;
              
        for(let i=res.length-1;i>=0;i--){
         
            
                
              $(".exdays").css("background-color","white"); 
              $(".exdays").css("color","gray");
              $(".exmonths").css("background-color","white"); 
              $(".exmonths").css("color","gray");
              $(".exdays").css("background-color","white"); 
              $(".exdays").css("color","gray");
              $(".exweeks").css("background-color"," rgb(109, 109, 109)"); 
              $(".exweeks").css("color","white");
                  markup = "<tr><td>"+ new Date(res[i].start_date).toLocaleDateString()+ " -- "+new Date(res[i].end_date).toLocaleDateString()+"</td><td>"+ res[i].count+ "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
           
        }
        
      });
     
   }
     else if(type=='newweek' && this.type1=='new')
     {
      this.thData="New";
      lineData = [];
      this._httpService.getNewWeekCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
        lineNo=0;
      
        for(let i=res.length-1;i>=0;i--){
          
            
               
              
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newmonths").css("background-color","white"); 
              $(".newmonths").css("color","gray");
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newweeks").css("background-color"," rgb(109, 109, 109)"); 
              $(".newweeks").css("color","white");
                  markup = "<tr><td>"+ new Date(res[i].start_date).toLocaleDateString()+ " -- "+new Date(res[i].end_date).toLocaleDateString()+"</td><td>"+ res[i].count+ "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
        }
        
      });

    
      
     }
     if(type=='exmonth' && this.type1=='exist')
     {
      this.thData="Existing";
      this._httpService.getExistingMonthCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
                lineNo=0;
        for(let i=res.length-1;i>=0;i--){
          var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
          lineData.push(obj);
          
              
              $(".exdays").css("background-color","white"); 
              $(".exdays").css("color","gray");
              $(".exweeks").css("background-color","white"); 
              $(".exweeks").css("color","gray");
              $(".exdays").css("background-color","white"); 
              $(".exdays").css("color","gray");
              $(".exmonths").css("background-color"," rgb(109, 109, 109)"); 
              $(".exmonths").css("color","white");
                  markup = "<tr><td>"+ res[i].Month+ "</td><td>"+ res[i].count + "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
           
        }
        
      });
     }
     if(type=='newmonth' && this.type1=='new')
     {
      this.thData="New";
      this._httpService.getNewMonthCount().subscribe((res:any[])=>{
        let c=0;
        $("table tbody tr").remove();
                lineNo=0;
        for(let i=res.length-1;i>=0;i--){
          var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
          lineData.push(obj);
          $(".newdays").css("background-color","white"); 
          $(".newdays").css("color","gray");
          $(".newweeks").css("background-color","white"); 
              $(".newweeks").css("color","gray");
              $(".newdays").css("background-color","white"); 
              $(".newdays").css("color","gray");
              $(".newmonths").css("background-color"," rgb(109, 109, 109)"); 
              $(".newmonths").css("color","white");
                  markup = "<tr><td>"+ res[i].Month+ "</td><td>"+ res[i].count + "</td></tr>"; 
                  tableBody = $("table tbody"); 
                  tableBody.append(markup); 
                  lineNo++; 
                  c++;
          
        }
        
      });
     }
     
  }
  constructor(private router: Router,private _httpService:RetentionService,public authService: AuthService) { }

  ngOnInit() {  
    var lineData = [];
    var markup;
    var tableBody;
    let lineNo = 0;

    
    $(document).ready(function () {

      $(".newDiv").show();
        $(".exDiv").hide();
        $(".newuser").css("background-color"," rgb(109, 109, 109)"); 
        $(".newuser").css("color","white");
        $(".existing").css("background-color","white"); 
        $(".existing").css("color","gray");
        

      $(".exDiv").hide();
      $(".existing").click(function () {
        $(".exDiv").show();
        $(".newDiv").hide();
        $(".existing").css("background-color"," rgb(109, 109, 109)"); 
        $(".existing").css("color","white");
        $(".newuser").css("background-color","white"); 
        $(".newuser").css("color","gray");
      });

      $(".newuser").click(function () {
        $(".newDiv").show();
        $(".exDiv").hide();
        $(".newuser").css("background-color"," rgb(109, 109, 109)"); 
        $(".newuser").css("color","white");
        $(".existing").css("background-color","white"); 
        $(".existing").css("color","gray");
      });
      
        
     
    });


    this._httpService.getNewDayCount().subscribe((res:any[])=>{
      let c=0;
			for(let i=res.length-1;i>=0;i--){
				var obj ={date:new Date(res[i].Date),user_count:res[i].count_users};
        lineData.push(obj);
        $(document).ready(function () {    
                if(lineNo!=0 && c==0){
                  $("table tbody tr").remove();
                  lineNo=0;
                }
                $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
                $(".newdays").css("color","white");
                $(".newweeks").css("background-color","white"); 
                $(".newweeks").css("color","gray");
                $(".newmonths").css("background-color","white"); 
                $(".newmonths").css("color","gray");
                markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
                tableBody = $("table tbody"); 
                tableBody.append(markup); 
                lineNo++; 
                c++;


              
            if(lineNo!=0 && c==0){
              $("table tbody tr").remove();
              lineNo=0;
            }
            $(".newdays").css("background-color"," rgb(109, 109, 109)"); 
            $(".newdays").css("color","white");
            $(".newweeks").css("background-color","white"); 
            $(".newweeks").css("color","gray");
            $(".newmonths").css("background-color","white"); 
            $(".newmonths").css("color","gray");
            markup = "<tr><td>"+ res[i].Date+ "</td><td>"+ res[i].count_users + "</td></tr>"; 
            tableBody = $("table tbody"); 
            tableBody.append(markup); 
            lineNo++; 
            c++;
   
        });
      }
      
    });
    

    

   



///////////////////////////////  existing user /////////////////////////////////////////








}
router1(search)
{
  
  
this.router.navigate(['/searchpagenew/'+search+'/retention'])
  

}
    logout(): void {
      console.log("Logout");
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    changeName(val){
      if(val==1){
       
      }else{
        this.thData="Existing";
      }  
  }

}


