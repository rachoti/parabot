import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Router } from '@angular/router';
import { TimezoneService } from './timezone.service';
import * as $ from 'jquery';
import { ExportToCsv } from 'export-to-csv';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.css']
}) 
export class TimezoneComponent implements OnInit {
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
    
    
 this.router.navigate(['/searchpagenew/'+search+'/timezone'])
    

  }
  
  dateChangerEnd(enddate: string){
    let jsono = [];
      jsono = [
        {
          TimeZone: 'hbh',
            Users: 'jnj',
            Message_Count: '000'
            
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
      
     
      this._httpService.getTimezoneCount().subscribe((res:any[])=>{
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
                if ( res[j].timezone == outputArray[k] ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false) { 
                outputArray.push(res[j].timezone); 
            } 
            start = false; 
            count = 0; 
          }
       
      
     
        
        let arr=[];
        let index=0;
        
        
        
      

        for(let i=0;i<outputArray.length;i++)
       {
         var yahooOnly = res.filter(function (entry) {
           return entry.timezone === outputArray[i];

           
       });
       
      
      index=0
      for(var j=0;j<yahooOnly.length;j++){
        
        console.log(new Date(this.startDate1))
        console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      
      var sum_user1=0;
      var sum_msg1=0;
      console.log(index)
      for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
        console.log("aaa")
        sum_user1+=yahooOnly[z].count;
        sum_msg1+=yahooOnly[z].incoming_msg_count;
        
      }
      console.log(sum_user1)
      console.log(sum_msg1)
      aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
      markup = "<tr><td>"+ outputArray[i]+ "</td><td>"+ sum_user1+ "</td><td>"+ sum_msg1+ "</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
               
               

            
            
    }
    //console.log(index)
      
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
      
    });
  
    

    }






  constructor(private router: Router,private _httpService:TimezoneService) { }
     ngOnInit() {
      let jsono = [];
      jsono = [
        {
          TimeZone: 'hbh',
            Users: 'jnj',
            Message_Count: '000'
            
        }
        ];
      var lineData = [];
      var markup;
      var tableBody;
      let lineNo = 0;
      this._httpService.getTimezoneCount().subscribe((res:any[])=>{
        
        this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
        this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
        this.inputStartDate= this.startDate;
        this.inputEndDate=this.endDate;
         
        
      });    
    
          
        
  
    this._httpService.getTimezoneCount().subscribe((res:any[])=>{
      let c=0;

      for(let i=res.length-1;i>=0;i--){
        var outputArray = []; 
        var count = 0; 
        var start = false; 
        var lookup = {};
        var result = [];
        
        for (let j = 0; j < res.length; j++) { 
            for (let k = 0; k < outputArray.length; k++) { 
                if ( res[j].timezone == outputArray[k] ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false) { 
                outputArray.push(res[j].timezone); 
            } 
            start = false; 
            count = 0; 
          }
       
      }
      console.log(outputArray)

      $(document).ready(function () {
         
         for(let i=outputArray.length-1;i>=0;i--)
         {
          
          var yahooOnly = res.filter(function (entry) {
            return entry.timezone === outputArray[i];
            
        }
        );
        var sum_users=0;
        for(let j=yahooOnly.length-1;j>=0;j--)
        {
          sum_users+=yahooOnly[j].count

        }
        var sum_msg=0;
        for(let j=yahooOnly.length-1;j>=0;j--)
        {
          sum_msg+=yahooOnly[j].incoming_msg_count

        }
        
        
                
                markup = "<tr><td>"+ outputArray[i]+ "</td><td>"+ sum_users+ "</td><td>"+ sum_msg+ "</td></tr>";
                 
                tableBody = $("table tbody");
                 
                tableBody.append(markup);
                 
                lineNo++; 
                c++;

                var xx=outputArray[i]
                var yy=sum_users
                var zz=sum_msg
                
                let modelData = {
                TimeZone: xx,
                  Users: yy,
                  Message_Count: zz
            }; 

            jsono.push(modelData);
            

            
                
         }  
         
         
        });  
        
        
        
     }  
    );

    }
     

    

    dateChangerEndexport(enddate: string){
      let jsono = [];
      jsono = [
        {
          TimeZone: 'hbh',
            Users: 'jnj',
            Message_Count: '000'
            
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
      
     
      this._httpService.getTimezoneCount().subscribe((res:any[])=>{
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
                if ( res[j].timezone == outputArray[k] ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false) { 
                outputArray.push(res[j].timezone); 
            } 
            start = false; 
            count = 0; 
          }
       
      
     
        
        let arr=[];
        let index=0;
        
        
        
      

        for(let i=0;i<outputArray.length;i++)
       {
         var yahooOnly = res.filter(function (entry) {
           return entry.timezone === outputArray[i];

           
       });
       
      
      index=0
      for(var j=0;j<yahooOnly.length;j++){
        
        console.log(new Date(this.startDate1))
        console.log(new Date(yahooOnly[j].date).toLocaleDateString())
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
      }
      
      var sum_user1=0;
      var sum_msg1=0;
      console.log(index)
      for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
        console.log("aaa")
        sum_user1+=yahooOnly[z].count;
        sum_msg1+=yahooOnly[z].incoming_msg_count;
        
      }
      console.log(sum_user1)
      console.log(sum_msg1)
      aa="<i><small>"+this.startDate1+"-"+this.endDate+"</small></i>"
      markup = "<tr><td>"+ outputArray[i]+ "</td><td>"+ sum_user1+ "</td><td>"+ sum_msg1+ "</td></tr>"; 
      tableBody = $("table tbody"); 
      tableHead=$("shadow")
      tableHead.append(aa)
      tableBody.append(markup); 
      lineNo++; 
      c++;
                var xx=outputArray[i]
                var yy=sum_user1
                var zz=sum_msg1
                
                let modelData = {
                TimeZone: xx,
                  Users: yy,
                  Message_Count: zz
            }; 

            jsono.push(modelData);
            
    }
    //console.log(index)
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
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
        
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
   
      
    });
  
    

    }


    
    /*  const options = { 
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
    /*hii.splice(0,1);

    csvExporter.generateCsv(hii);
    
                  
                  
      
           
    
  }*/
  }

