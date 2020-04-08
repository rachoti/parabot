import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransnextComponent } from './transnext.component';

describe('TransnextComponent', () => {
  let component: TransnextComponent;
  let fixture: ComponentFixture<TransnextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransnextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransnextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
