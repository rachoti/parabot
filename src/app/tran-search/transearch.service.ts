import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransFilter } from './TransFilter';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TransearchService {

  constructor(private http:HttpClient) { }

  TransResults(cust:object){
  	console.log(cust);
  	return this.http.post<TransFilter>('http://142.102.27.100:8011/',cust);

  }
}
