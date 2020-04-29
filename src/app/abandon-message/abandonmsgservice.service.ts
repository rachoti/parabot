import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbandonmsgserviceService {

  constructor(private http:HttpClient) { }
  getabandonmsg(){
    return this.http.get('http://localhost:9929/');
}
}
