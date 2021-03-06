import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {

  constructor(private http:HttpClient) { }
  getUserActivity(){
    return this.http.get('http://142.102.27.100:9991/');
      }
  getMessageActivity(){
    return this.http.get('http://142.102.27.100:9995/');
     }
  
  getTicketsDetails(){
    return this.http.get('http://142.102.27.100:9851/');
  }
  sendEmail(url, data) {
    
    return this.http.post(url, data);
  }
}
