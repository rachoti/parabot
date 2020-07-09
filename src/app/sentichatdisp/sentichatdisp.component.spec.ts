import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentichatdispComponent } from './sentichatdisp.component';

describe('SentichatdispComponent', () => {
  let component: SentichatdispComponent;
  let fixture: ComponentFixture<SentichatdispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentichatdispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentichatdispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
