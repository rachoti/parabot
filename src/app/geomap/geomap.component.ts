import { AfterViewInit,Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GeomapService } from './geomap.service';
import * as L from 'leaflet';

declare var ol: any;
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent implements OnInit {
  private map;
  markers = [
    {
      "name": "Hubli",
      "url": "https://en.wikipedia.org/wiki/Hubli",
      "lat": 15.3173,
      "lng": 75.7139
    },
    {
      "name": "Anguilla",
      "url": "https://en.wikipedia.org/wiki/Anguilla",
      "lat": 18.220554,
      "lng": -63.068615
    },
    {
      "name": "Japan",
      "url": "https://en.wikipedia.org/wiki/Japan",
      "lat": 36.204824,
      "lng": 138.252924
    }
 ];
  isShowDiv1 = true;  
  isShowDiv2 = true; 
  isShowDiv3 = true; 
  isShowDiv4 = true;
  actdata1="+ Activity";
  actdata2="+ Compare";
  actdata3="+ Conversation";
  actdata4="+ Demographics";
  thData="New";
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
  router1(search)
  {
    
    
 this.router.navigate(['/searchpagenew/'+search+'/geomap'])
    

  }
  constructor(private router: Router,private _httpService:GeomapService,public authService: AuthService) { 
    
  }

  ngOnInit() {
  var map = L.map( 'map', {
      center: [20.0, 5.0],
      minZoom: 2,
      zoom: 2
  });
  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  for ( var i=0; i < this.markers.length; ++i ) 
  {
    L.marker( [this.markers[i].lat, this.markers[i].lng] )
        .bindPopup( '<a href="' + this.markers[i].url + '" target="_blank">' + this.markers[i].name + '</a>' )
        .addTo( map );
  }
}
  
  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
