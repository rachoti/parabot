import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransnextserviceService {

  constructor(private http:HttpClient) { }

    getChats(){
      return this.http.get('http://localhost:9918/');
    }
   
}

