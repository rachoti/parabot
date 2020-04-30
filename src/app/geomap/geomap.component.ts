import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GeomapService } from './geomap.service';
import * as $ from 'jquery';
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
      
      var sum_user1=0;
      
     /* console.log(index)
      console.log("diff",date_diff_indays(this.startDate1,this.endDate)+index)*/
      for(var z=index;z<=date_diff_indays(this.startDate1,this.endDate)+index;z++){
        console.log("aaa")
        sum_user1+=yahooOnly[z].count;
        
      }
      /*console.log("coi",sum_user1)*/
      arr1.push(sum_user1)
      
    /*  console.log("datatatata",outputArray1[n],arr1[n])*/

      var loc=outputArray1[n]
      this.map.removeObjects(this.map.getObjects());
      this.search.request({ "q": loc, "at": yahooOnly[z].latitude + "," + yahooOnly[z].longitude }, {}, data => {
      for(let i = 0; i < data.results.items.length; i++) {
          this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i],arr1[n]);
      }
      
  }, error => {
      console.error(error);
  });
    

    markup = "<tr><td>"+ outputArray1[n]+ "</td><td>"+ arr1[n]+ "</td></tr>";
                 
                tableBody = $("table tbody");
                 
                tableBody.append(markup);
                 
                lineNo++; 
                c++;
                
       

}


      $("#myTable").tablesorter({ sortList: [[1,1], [0,0]] });
      var usersTable = $(".tablesorter");
      usersTable.trigger("update")
  .trigger("sorton", [usersTable.get(0).config.sortList])
  .trigger("appendCache")
  .trigger("applyWidgets");
      this.startDate=""+(new Date(res[0].date).getFullYear())+"-0"+(new Date(res[0].date).getMonth()+1)+"-"+(new Date(res[0].date).getDate()-1);
                
      this.endDate=""+(new Date(res[res.length-1].date).getFullYear())+"-0"+(new Date(res[res.length-1].date).getMonth()+1)+"-"+(new Date(res[res.length-1].date).getDate());
      console.log("end")
      

    });
    
    
    
           
    
       

 
    

  }


  public constructor(private router: Router,private _httpService:GeomapService) { 

}


    public ngOnInit() {
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
            zoom: 10,
            center: { lat: "37.7397", lng: "-121.4252"}
        }
    );
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