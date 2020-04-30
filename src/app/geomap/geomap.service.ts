import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeomapService {
  constructor(private http:HttpClient) {}

  getTimezoneCount(){
    return this.http.get('http://localhost:9900/');

      }
}
