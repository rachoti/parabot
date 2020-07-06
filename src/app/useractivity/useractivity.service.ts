import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UseravtivityService {

  constructor(private http:HttpClient) { }
  getUserActivity(){
    return this.http.get('http://142.102.27.100:9993/');
      }
    getRetUserCount(){
        return this.http.get('http://142.102.27.100:9907/');
          
      }
      getUserCount(){
        return this.http.get('http://142.102.27.100:9912/');
          
      }
}
