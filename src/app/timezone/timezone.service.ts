import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor(private http:HttpClient) {}
    getTimezoneCount(){
      return this.http.get('http://142.102.27.100:8858/');

        }
   
}
