import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeomapService {

  constructor(private http:HttpClient) { }

  getMessageCount(){
    return this.http.get('http://142.102.27.100:9999/');
      }
}
