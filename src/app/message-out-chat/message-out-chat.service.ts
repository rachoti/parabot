import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageOutChatService {

  constructor(private http:HttpClient) { }

  getMessageChatoutCount(){
    return this.http.get('http://localhost:9904/');
  }
  getSomeChatout()
{
  return this.http.get('http://localhost:9905/');
}
}
