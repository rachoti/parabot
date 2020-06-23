import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-page-new',
  templateUrl: './search-page-new.component.html',
  styleUrls: ['./search-page-new.component.css']
})
export class SearchPageNewComponent implements OnInit {
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
   actdata1="+Activity";
  actdata2="+Compare";
  actdata3="+Conversation";
  actdata4="+Demographics";
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
  pages = [
    { page: 'Message Count', link: 'messagecount' },
    {  page: 'Retention' , link: 'retension'},
    { page: 'TimeZone' , link: 'timezone'},
    {  page: 'Message In' , link: 'message_in' },
    {  page: 'Message Out' , link: 'message_out'},
    { page: 'Sentiment' , link: 'sentiment'},
    { page: 'Word Cloud' , link: 'recentTrans'},
    { page: 'Gender' , link: 'genderview'},
    {  page: 'GeoMap' , link: 'geomap'},
    {  page: 'User Activity' , link: 'useractivity'},
    {  page: 'Live Message Graph' , link: 'liveMessage'},
    {  page: 'Dashboard' , link: 'dashboard'},
   
  ];
 
search;
route;

  constructor(private router2:ActivatedRoute,private router: Router) { 
    this.search=this.router2.snapshot.paramMap.get("id1");
    this.route=this.router2.snapshot.paramMap.get("id2")
  }

  ngOnInit() {
    
   
    
  }
  
  router1(search)
  {
    
    if(search=='')
{
  
  this.router.navigate(['/'+this.route])
}    
else

 this.router.navigate(['/searchpagenew/'+search])
    

  }

 
}
