import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor(private http:HttpClient) { }
  getNewUserCount(){
    return this.http.get('http://localhost:9908/');
      
}
getRetUserCount(){
  return this.http.get('http://localhost:9907/');
    
}
getMessageCount(){
  return this.http.get('http://localhost:9909/');
    
}
}
