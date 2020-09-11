import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketscountComponent } from './ticketscount.component';

describe('TicketscountComponent', () => {
  let component: TicketscountComponent;
  let fixture: ComponentFixture<TicketscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
