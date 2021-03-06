import { Component, OnInit } from '@angular/core';
import { MessageOutService } from './message-out.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-message-out',
  templateUrl: './message-out.component.html',
  styleUrls: ['./message-out.component.css']
})
export class MessageOutComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2017-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
  startDate1="";
  datePicCount=0;
  malePercentVal;
  femalePercentVal
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
  d1;
  d2;
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
  dateChanger(startdate: string){
    
    
    this.startDate1=startdate;
    
    this.datePicCount+=1;

  }
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/message_out'])
    

  }
  
  dateChangerEnd(enddate: string){
    var lineData = [];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
  this.endDate=enddate;
  this.startDate1;
  this.inputStartDate=this.startDate1;
  this.inputEndDate=this.endDate;
  var date_diff_indays = function(date1, date2) {
    
    let dt1 = new Date(date1);
    
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    
   
    this._httpService.getMessageCount().subscribe((res:any[])=>{
      let c=0;
      var outputArray = []; 
        
    
      var count = 0; 
       var aa; 
      
      var start = false; 
      var lookup = {};
       
      var result = [];
      
     
      $("table tbody tr").remove();
      
      for (let j = 0; j < res.length; j++) { 
          for (let k = 0; k < outputArray.length; k++) { 
              if ( res[j].text == outputArray[k] ) { 
                  start = true; 
              } 
          } 
          count++; 
          if (count == 1 && start == false && res[j].text!=0) { 
              outputArray.push(res[j].text); 
          } 
          start = false; 
          count = 0; 
        }
     
    
   
      
      let arr=[];
      let index=0;
      
      
      
    

     for(let i=0;i<outputArray.length;i++)
     {
       var yahooOnly = res.filter(function (entry) {
         return entry.text === outputArray[i];

         
     });
     
    //console.log(yahooOnly)
   index=0
    for(var j=0;j<yahooOnly.length;j++){
      
      //console.log(new Date(this.startDate1))
      //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
     if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
        break;
     }
      index++;
    }
    
    var sum_user1=0;
    var sum_msg1=0;
  
    for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
     
      sum_user1+=yahooOnly[z].count;
      
      
    }
    
    aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
    markup = "<tr><td><a href="+"/messageoutchat/"+encodeURI(outputArray[i])+"/"+this.inputStartDate+"/"+this.inputEndDate+">"+outputArray[i]+ "</a></td><td>"+ sum_user1+ "</td></tr>"; 
    tableBody = $("table tbody"); 
    tableHead=$("shadow")
    tableHead.append(aa)
    tableBody.append(markup); 
    lineNo++; 
    c++;
     }
  //console.log(index)
    this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
      
    this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());
 
    
  });

}
  
  
  constructor(private router: Router,private _httpService:MessageOutService) { }

  ngOnInit() {
    
      var lineData = [];
      var markup;
      var tableBody;
      let lineNo = 0;
      let c=0;
      this._httpService.getMessageCount().subscribe((res:any[])=>{
        
         this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-0"+(new Date(res[0].date).getDate());
          console.log(this.startDate)
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-0"+(new Date(res[res.length-1].date).getDate());
        this.inputStartDate= this.startDate;
        this.inputEndDate=this.endDate;
       for (let i=0;i<res.length;i++)
       {
        var outputArray = []; 
          
      
        var count = 0; 
          
      
        var start = false; 
        var lookup = {};
         
        var result = [];
        for (let j = 0; j < res.length; j++) { 
          for (let k = 0; k < outputArray.length; k++) { 
              if ( res[j].text == outputArray[k] ) { 
                  start = true; 
              } 
          } 
          count++; 
          if (count == 1 && start == false && res[j].text!=0) { 
              outputArray.push(res[j].text); 
          } 
          start = false; 
          count = 0; 
        }}
        
       for (let i=0;i<outputArray.length;i++)
       {
        var yahooOnly = res.filter(function (entry) {
          return entry.text === outputArray[i];
          
      }
      );
     
      var sum_msg=0;
      for(let j=yahooOnly.length-1;j>=0;j--)
      {
        sum_msg+=yahooOnly[j].count

      }
        markup = "<tr><td><a href="+"/messageoutchat/"+encodeURI(outputArray[i])+"/"+this.inputStartDate+"/"+this.inputEndDate+">"+ outputArray[i]+ "</a></td><td>"+sum_msg + "</td></tr>"; 
        tableBody = $("table tbody"); 
        tableBody.append(markup); 
        lineNo++; 
        c++;
       }
       
      });  
    
    }


    dateChangerEndexport(enddate: string){
      let jsono = [];
      jsono = [
        {
          Message: 'hbh',
            Count: 'jnj'
            
            
        }
        ];
      var lineData = [];
      var markup;
      var tableBody;
      var tableHead;
      let lineNo = 0;
    this.endDate=enddate;
    this.startDate1;
    this.inputStartDate=this.startDate1;
    this.inputEndDate=this.endDate;
    var date_diff_indays = function(date1, date2) {
      
      let dt1 = new Date(date1);
      
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }
      
     
      this._httpService.getMessageCount().subscribe((res:any[])=>{
        let c=0;
        var outputArray = []; 
          
      
        var count = 0; 
         var aa; 
        
        var start = false; 
        var lookup = {};
         
        var result = [];
        
       
        $("table tbody tr").remove();
        
        for (let j = 0; j < res.length; j++) { 
            for (let k = 0; k < outputArray.length; k++) { 
                if ( res[j].text == outputArray[k] ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false && res[j].text!=0) { 
                outputArray.push(res[j].text); 
            } 
            start = false; 
            count = 0; 
          }
       
      
     
        
        let arr=[];
        let index=0;
        
        
        
      
  
       for(let i=0;i<outputArray.length;i++)
       {
         var yahooOnly = res.filter(function (entry) {
           return entry.text === outputArray[i];
  
           
       });
       
      //console.log(yahooOnly)
     index=0
      for(var j=0;j<yahooOnly.length;j++){
        
        //console.log(new Date(this.startDate1))
        //console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      
      var sum_user1=0;
      var sum_msg1=0;
    
      for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
       
        sum_user1+=yahooOnly[z].count;
        
        
      }
      
      aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
      markup = "<tr><td><a href="+"/messageoutchat/"+encodeURI(outputArray[i])+"/"+this.inputStartDate+"/"+this.inputEndDate+">"+outputArray[i]+ "</a></td><td>"+ sum_user1+ "</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
      var xx=outputArray[i]
      var yy=sum_user1
      
      
      let modelData = {
      TimeZone: xx,
        Users: yy,
        
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
    //console.log(index)
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate());
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
      
    });


    }

}

  



