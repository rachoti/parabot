import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentichatdispService {

  constructor(private http:HttpClient) { }
  
  getChat(){
    return this.http.get('http://142.102.27.100:9974/');
      }
}
