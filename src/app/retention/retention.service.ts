import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RetentionService {

  constructor(private http:HttpClient) { }
  getNewDayCount(){
    return this.http.get('http://142.102.27.100:9993/');
      }
  getNewWeekCount(){
    return this.http.get('http://142.102.27.100:9984/');
  }
  getNewMonthCount(){
    return this.http.get('http://142.102.27.100:9985/');
  }


  getExistingDayCount(){
    return this.http.get('http://142.102.27.100:9990/');
      }
  getExistingWeekCount(){
    return this.http.get('http://142.102.27.100:9986/');
  }
  getExistingMonthCount(){
    return this.http.get('http://142.102.27.100:9987/');
  }
}