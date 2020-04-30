import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandontrynextComponent } from './abandontrynext.component';

describe('AbandontrynextComponent', () => {
  let component: AbandontrynextComponent;
  let fixture: ComponentFixture<AbandontrynextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandontrynextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandontrynextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
