import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LivemessageService {

  constructor(private http:HttpClient) { }

  getLiveActivity(){
    return this.http.get('http://142.102.27.100:9990/');
  }
}
