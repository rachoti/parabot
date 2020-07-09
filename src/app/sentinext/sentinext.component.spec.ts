import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentinextComponent } from './sentinext.component';

describe('SentinextComponent', () => {
  let component: SentinextComponent;
  let fixture: ComponentFixture<SentinextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentinextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentinextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
