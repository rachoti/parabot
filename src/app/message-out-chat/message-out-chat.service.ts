import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageOutChatService {

  constructor(private http:HttpClient) { }

  getMessageChatoutCount(){
    return this.http.get('http://142.102.27.100:9904/');
  }
  getSomeChatout()
{
  return this.http.get('http://142.102.27.100:9905/');
}
}
