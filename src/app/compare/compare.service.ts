import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor(private http:HttpClient) { }
  getNewUserCount(){
    return this.http.get('http://142.102.27.100:9908/');
      
}
getRetUserCount(){
  return this.http.get('http://142.102.27.100:9907/');
    
}
getMessageCount(){
  return this.http.get('http://142.102.27.100:9909/');
    
}
getUserCount(){
  return this.http.get('http://142.102.27.100:9912/');
    
}
getGenderCount(){
  return this.http.get('http://142.102.27.100:9910/');
    
}


}
