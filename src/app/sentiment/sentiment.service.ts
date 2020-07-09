import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http:HttpClient) { }
  getSentimentDays(){
    return this.http.get('http://142.102.27.100:9946/');
  }
  getMessageCount(){
    return this.http.get('http://142.102.27.100:9946/');
      }
  getChatid(){
        return this.http.get('http://142.102.27.100:9964/');
          }


  getfulldate(){
    return this.http.get('http://142.102.27.100:9946//');



     }
}
