import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RecenttransService {

  constructor(private http:HttpClient) { }
  getAllWords(){
    return this.http.get('http://142.102.27.100:9983/');
  }
 /* getWords(){
    return this.http.get('http://142.102.27.100:9983/');
  }*/
}
