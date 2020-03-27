import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-message-in-chat',
  templateUrl: './message-in-chat.component.html',
  styleUrls: ['./message-in-chat.component.css']
})
export class MessageInChatComponent implements OnInit {
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
