import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http:HttpClient) { }

  getSentimentDays(){
    return this.http.get('http://localhost:9991/');
  }
  getMessageCount(){
    return this.http.get('http://localhost:9991/');
      }


  getfulldate(){
    return this.http.get('http://localhost:9991/');



     }
}
