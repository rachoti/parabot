import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from "@angular/router";
import { ExportToCsv } from 'export-to-csv';

import { GeomapService } from './geomap.service';
declare var $:any;
import 'datatables.net';
import 'tablesorter';
declare var H: any;

@Component({
  selector: 'geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  startDate="2020-01-01";
  endDate="";
  inputStartDate="";
  inputEndDate="";
  startDate1="";
  datePicCount=0;
  malePercentVal;
  femalePercentVal
  outputArray=[];
  filtArray=[];
  cityArray=[];
  outarr=[];
  latt=[];
  countarr=[];
  len;
  pages=[];
  
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
    if(this.actdata1==="+Activity"){
      this.actdata1="-Activity";
    }else{
      this.actdata1="+Activity";
    }
    
  }
  
  toggleDisplayDiv2() {
    this.isShowDiv2 = !this.isShowDiv2;
    if(this.actdata2==="+Compare"){
      this.actdata2="-Compare";
    }else{
      this.actdata2=" +Compare";
    }
    
  }

  toggleDisplayDiv3() {
    this.isShowDiv3= !this.isShowDiv3;
    if(this.actdata3==="+Conversation"){
      this.actdata3="- Conversation";
    }else{
      this.actdata3="+ Conversation";
    }
    
  }
  toggleDisplayDiv4() {
    this.isShowDiv4= !this.isShowDiv4;
    if(this.actdata4==="+Demographics"){
      this.actdata4="-Demographics";
    }else{
      this.actdata4="+Demographics";
    }
  }
  private ui: any;
  private search: any;
  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;
  private platform: any;
  private map: any;


  

  
 
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/geomap'])
    

  }
  constructor(private router: Router,private router2:ActivatedRoute,private _httpService:GeomapService,public authService: AuthService) { 
  }

  
  dateChanger(startdate: string){
    
    this.startDate1=startdate;
    
    this.datePicCount+=1;
  }
  
  dateChangerEnd(enddate: string){

    
    this.platform = new H.service.Platform({
      "app_id": "X9DcM0CBArvBPJyKGlQR",
      "app_code":"KfC_mrDlgzyuID07ptoSsQ"
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
    var lineData = [];
    
    var outputArray1=[];
    var start1= false
    var count1=0
    let arr1=[];
    var markup;
    var tableBody;
    var tableHead;
    let lineNo = 0;
    let c=0;
    var coun=[];
  this.endDate=enddate;
  this.startDate1;
  this.inputStartDate=this.startDate1;
  this.inputEndDate=this.endDate;
  var date_diff_indays = function(date1, date2)
   {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    
    this._httpService.getTimezoneCount().subscribe((res:any[])=>{
      $("table tbody tr").remove();
      for (let j = 0; j < res.length; j++) { 
        for (let k = 0; k < outputArray1.length; k++) { 
            if ( res[j].location == outputArray1[k] ) { 
                start1 = true; 
            } 
        } 
        count1++; 
        if (count1 == 1 && start1 == false) { 
            outputArray1.push(res[j].location); 
        } 
        start1 = false; 
        count1 = 0; 
      }
     /* console.log("date",outputArray1)*/


      let arr=[];
      let index=0;
        

        for(let n=0;n<outputArray1.length;n++)
       {
         var yahooOnly = res.filter(function (entry) {
           return entry.location === outputArray1[n];
          
           
       });
       
      
      index=0
     /* console.log("dataaaa",yahooOnly)
      console.log("length",yahooOnly.length)*/

      for(var j=0;j<yahooOnly.length;j++){
        
       /* console.log("startdate",new Date(this.startDate1))
        console.log("yahoodate",new Date(yahooOnly[j].date).toLocaleDateString())*/
       if((new Date(yahooOnly[j].date).toLocaleDateString())==(new Date(this.startDate1).toLocaleDateString())){
          break;
       }
        index++;
        /*console.log("index", index)*/
      }
      
      var sum_user1=[];
      var city_na=[];
     /* console.log(index)
      console.log("diff",date_diff_indays(this.startDate1,this.endDate)+index)*/
      for( var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
        console.log("aaa")
        if(yahooOnly[z].user_id!="No user"){
        sum_user1.push(yahooOnly[z].user_id);
        city_na.push(yahooOnly[z].city);
        }
      }
      /*console.log("coi",sum_user1)*/
      //arr1.push(sum_user1)
      var filterCity=city_na.filter(function(item, pos){
        return city_na.indexOf(item)== pos; 
      });
      var filteredArray = sum_user1.filter(function(item, pos){
        return sum_user1.indexOf(item)== pos; 
      });
      
      console.log( "datat",loc,filteredArray.length );
      coun.push(filteredArray.length)
      console.log("svdvdvvgh",filterCity)
      console.log("cpoune",coun);
    /*  console.log("datatatata",outputArray1[n],arr1[n])*/
      var loc=outputArray1[n]
      if(filteredArray.length!=0)
      {
      this.map.removeObjects(this.map.getObjects());
      this.search.request({ "q": loc, "at": yahooOnly[z].latitude + "," + yahooOnly[z].longitude }, {}, data => {
      for(let i = 0; i < data.results.items.length; i++) {
          this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i],coun[n]);
      }
      
  }, error => {
      console.error(error);
  });
    
  

    markup = '<tbody><tr class="parent" id="row123" title="Click to expand/collapse" style="cursor: pointer;"><td>'+ outputArray1[n]+ "</td><td>"+ filteredArray.length+ '</td></tr><tr class="child-row123" style="display:none;"><td>'+ filterCity+ "</td><td>"+filteredArray.length+"</td></tr></tbody>";
                 
                tableBody = $("table ");
                 
                tableBody.append(markup);
                 
                lineNo++; 
                c++;
  }          
       

}

      console.log("dat",outputArray1)
      this.outarr.push(outputArray1)
      console.log("datfatfa",this.outarr)
      this.countarr.push(arr1)
      this.len=outputArray1.length

      $(document).ready(function () { 
        console.log("inside") 
        $('tr.parent')  
            .css("cursor", "pointer")  
            .attr("title", "Click to expand/collapse")  
            .click(function () {  
                $(this).siblings('.child-' + this.id).toggle();  
            });  
        $('tr[@class^=child-]').hide().children('td');  
  });  


     /* $("#myTable").tablesorter({ sortList: [[1,1], [0,0]] });
      var usersTable = $(".tablesorter");
      usersTable.trigger("update")
  .trigger("sorton", [usersTable.get(0).config.sortList])
  .trigger("appendCache")
  .trigger("applyWidgets");*/
  
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
                
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
      console.log("end")
      

    });
    
    
    
           
    
       

 
    

  }

Exportcsv(){
  let jsono = [];
      jsono = [
        {
          TimeZone: 'hbh',
            Users: 'jnj',
            Message_Count: '000'
            
        }
        ];
  this._httpService.getTimezoneCount().subscribe((res:any[])=>{

    for (var i=0;i<this.len;i++){

              console.log("datadaa",this.outarr[0][i])
              console.log("datadaa",this.countarr[0][i])
              var xx=this.outarr[0][i]
              var yy=this.countarr[0][i]
              let modelData = {
                Location: xx,
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

  });




}
  


    public ngOnInit() {
      var lineData = [];
      var start1= false
      var count1=0
      let arr1=[];
      var sum_users=[];
      var markup;
      var tableBody;
      var tableHead;
      let lineNo = 0;
      let c=0;
        this.platform = new H.service.Platform({
          "app_id": "X9DcM0CBArvBPJyKGlQR",
          "app_code":"KfC_mrDlgzyuID07ptoSsQ"
        });
        this.search = new H.places.Search(this.platform.getPlacesService());

        this._httpService.getTimezoneCount().subscribe((res:any[])=>{
        
          this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
          
          this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
          this.inputStartDate= this.startDate;
          this.inputEndDate=this.endDate;
        });
       
       var outArray=[];
  var start
  var count
  this._httpService.getTimezoneCount().subscribe((res:any[])=>{
    for (let j = 0; j < res.length; j++) { 
      for (let k = 0; k < this.outputArray.length; k++) { 
          if ( res[j].location == this.outputArray[k] ) { 
              start = true; 
          } 
      } 
      count++; 
      if (count == 1 && start == false) { 
        this.outputArray.push(res[j].location); 
      } 
      start = false; 
      count = 0; 
    }
    console.log(this.outputArray)

    for (var i=0;i<this.outputArray.length;i++){
      var sum_users=[];
      var city_name=[];
      for (var l=0;l<res.length;l++){

        if(res[l].location===this.outputArray[i])
        {
          if(res[l].user_id!="No user"){
          sum_users.push(res[l].user_id)
          }
          city_name.push(res[l].city)

        }
      }
                  
    var filteredCity = city_name.filter(function(item, pos){
      return city_name.indexOf(item)== pos; 
    });
      var filteredArray = sum_users.filter(function(item, pos){
        return sum_users.indexOf(item)== pos; 
      });

      console.log( "datat",this.outputArray[i],filteredArray.length );
      this.filtArray.push(filteredArray.length)
      this.cityArray.push(filteredCity)

        markup = '<tbody><tr class="parent" id="row123" title="Click to expand/collapse" style="cursor: pointer;"><td>'+ this.outputArray[i]+ "</td><td>"+ filteredArray.length+ '</td></tr><tr class="child-row123" style="display:none;"><td>'+ filteredCity+ "</td><td>"+filteredArray.length+"</td></tr></tbody>";
                 
        //$("#myTable").addClass('parent'); 

        tableBody = $("table");
         
        tableBody.append(markup);
         
        lineNo++; 
        c++;  
    
    
    }
    console.log(this.cityArray)
    for(let i=0;i<this.outputArray.length;i++){
      var obj ={date:this.outputArray[i],count:this.filtArray[i],city:this.cityArray[i]};
      console.log(obj)
      this.pages.push(obj);
    }

    $(document).ready(function () {  
      $('tr.parent')  
          .css("cursor", "pointer")  
          .attr("title", "Click to expand/collapse")  
          .click(function () {  
              $(this).siblings('.child-' + this.id).toggle();  
              
          });  
      $('tr[@class^=child-]').hide().children('td');  

});  

   /* $("#myTable").tablesorter({ sortList: [[1,1], [0,0]] });
    var usersTable = $(".tablesorter");
    usersTable.trigger("update")
.trigger("sorton", [usersTable.get(0).config.sortList])
.trigger("appendCache")
.trigger("applyWidgets");*/
    });


 /* var outputArray=[];
  var start
  var count
  this._httpService.getTimezoneCount().subscribe((res:any[])=>{
    for (let j = 0; j < res.length; j++) { 
      for (let k = 0; k < outputArray.length; k++) { 
          if ( res[j].location == outputArray[k] ) { 
              start = true; 
          } 
      } 
      count++; 
      if (count == 1 && start == false) { 
          outputArray.push(res[j].location); 
      } 
      start = false; 
      count = 0; 
    }
    console.log(outputArray)

    for (var i=0;i<outputArray.length;i++){
      var sum_users=0;
      for (var l=0;l<res.length;l++){

        if(res[l].location===outputArray[i])
        {
          sum_users+=res[l].count
        }
        
      
      }
      let arr=[];

      arr.push(sum_users)
      console.log(arr)
      var loc=outputArray[i]

  this.map.removeObjects(this.map.getObjects());
  this.search.request({ "q": loc, "at": "37.7397" + "," + "-121.4252" }, {}, data => {
      for(let i = 0; i < data.results.items.length; i++) {
          this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i],arr[i]);
      }
      
  }, error => {
      console.error(error);
  });
     
}

});



*/ }

    public ngAfterViewInit() {
      
      let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
            zoom: 2.5,
            center: { lat: "30", lng: "150"}
        }
    )
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }
  public places(query: string) {
  

  }
  
  private dropMarker(coordinates: any, data: any, count:any) {
    console.log("users",count)
    
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "<br>" + "users : "+ count + "</p>");
    marker.addEventListener('tap', event => {
        let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
            content: event.target.getData()
        });
        this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  
  
  }
 

 



}