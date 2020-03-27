import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageInChatService {

  constructor(private http:HttpClient) { }
  getMessageChatCount(){
    return this.http.get('http://localhost:9901/');
      
}
}
