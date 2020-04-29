import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonMessageComponent } from './abandon-message.component';

describe('AbandonMessageComponent', () => {
  let component: AbandonMessageComponent;
  let fixture: ComponentFixture<AbandonMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
