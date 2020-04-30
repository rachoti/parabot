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
