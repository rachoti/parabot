import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketscountService {

  constructor(private http:HttpClient) {

   }
   getResolvedDetails(){
    return this.http.get('http://142.102.27.100:9852/');
      }
      getPendingDetails(){
        return this.http.get('http://142.102.27.100:9853/');
          }
    
    getAssignedDetails(){
      return this.http.get('http://142.102.27.100:9854/');
        }
      }

