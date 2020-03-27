import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-message-out-chat',
  templateUrl: './message-out-chat.component.html',
  styleUrls: ['./message-out-chat.component.css']
})
export class MessageOutChatComponent implements OnInit {

  aa;
  bb;
  cc;
    constructor(private router:ActivatedRoute) { }
  
    ngOnInit() {
      
     this.aa=this.router.snapshot.paramMap.get("id1");
     this.bb=this.router.snapshot.paramMap.get("id2");
   this.cc=this.router.snapshot.paramMap.get("id3");
   console.log(this.aa)
      
    }
  
  
  }
