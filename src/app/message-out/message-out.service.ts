import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessageOutService {

  constructor(private http:HttpClient) { }

    getMessageCount(){
      return this.http.get('http://localhost:9905/');
        
  }
}
