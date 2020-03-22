import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagecountComponent } from './messagecount.component';

describe('MessagecountComponent', () => {
  let component: MessagecountComponent;
  let fixture: ComponentFixture<MessagecountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagecountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
