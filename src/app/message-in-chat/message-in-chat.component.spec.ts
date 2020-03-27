import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInChatComponent } from './message-in-chat.component';

describe('MessageInChatComponent', () => {
  let component: MessageInChatComponent;
  let fixture: ComponentFixture<MessageInChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
