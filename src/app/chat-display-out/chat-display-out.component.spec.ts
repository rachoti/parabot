import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDisplayOutComponent } from './chat-display-out.component';

describe('ChatDisplayOutComponent', () => {
  let component: ChatDisplayOutComponent;
  let fixture: ComponentFixture<ChatDisplayOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDisplayOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDisplayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
