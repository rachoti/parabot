import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderviewComponent } from './genderview.component';

describe('GenderviewComponent', () => {
  let component: GenderviewComponent;
  let fixture: ComponentFixture<GenderviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
