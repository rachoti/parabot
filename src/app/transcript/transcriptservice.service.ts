import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranscriptserviceService {

  constructor(private http:HttpClient) { }
  getMessageCount(){
    return this.http.get('http://localhost:9916/');
      
}
get_transcript_7_days(){
  return this.http.get('http://localhost:9917/');
    
}
}
