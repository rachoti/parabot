import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDisplayInComponent } from './chat-display-in.component';

describe('ChatDisplayInComponent', () => {
  let component: ChatDisplayInComponent;
  let fixture: ComponentFixture<ChatDisplayInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDisplayInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDisplayInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
