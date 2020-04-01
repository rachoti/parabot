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
    { name: 'Mr. Nice', country: 'India' },
    {  name: 'Narco' , country: 'USA'},
    { name: 'Bombasto' , country: 'UK'},
    {  name: 'Celeritas' , country: 'Canada' },
    {  name: 'Magneta' , country: 'Russia'},
    { name: 'RubberMan' , country: 'China'},
    { name: 'Dynama' , country: 'Germany'},
    { name: 'Dr IQ' , country: 'Hong Kong'},
    {  name: 'Magma' , country: 'South Africa'},
    {  name: 'Tornado' , country: 'Sri Lanka'}
  ];
 
search;


  constructor(private router2:ActivatedRoute,private router: Router) { 
    this.search=this.router2.snapshot.paramMap.get("id1");
    
  }

  ngOnInit() {
    
   
    
  }
  
  router1(search)
  {
    
    if(search=='')
{
  this.router.navigate(['/dashboard'])
}    
else
 this.router.navigate(['/searchpagenew/'+search])
    

  }

 
}
