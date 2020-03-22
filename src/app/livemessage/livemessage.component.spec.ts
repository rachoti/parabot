import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivemessageComponent } from './livemessage.component';

describe('LivemessageComponent', () => {
  let component: LivemessageComponent;
  let fixture: ComponentFixture<LivemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
