import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentinextService {

  constructor(private http:HttpClient) { }

  getChatid(){
    return this.http.get('http://142.102.27.100:9964/');
      }
    
  getChat(){
        return this.http.get('http://142.102.27.100:9974/');
          }
}
