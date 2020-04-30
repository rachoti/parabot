import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindumComponent } from './logindum.component';

describe('LogindumComponent', () => {
  let component: LogindumComponent;
  let fixture: ComponentFixture<LogindumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogindumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogindumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
