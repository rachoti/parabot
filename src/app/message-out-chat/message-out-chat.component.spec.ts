import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOutChatComponent } from './message-out-chat.component';

describe('MessageOutChatComponent', () => {
  let component: MessageOutChatComponent;
  let fixture: ComponentFixture<MessageOutChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageOutChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageOutChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
