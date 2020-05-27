import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageInChatService {

  constructor(private http:HttpClient) { }
  getMessageChatCount(){
    return this.http.get('http://142.102.27.100:9901/');
      
}
getSomeChat()
{
  return this.http.get('http://142.102.27.100:9902/');
}
}
