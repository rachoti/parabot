import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranSearchComponent } from './tran-search.component';

describe('TranSearchComponent', () => {
  let component: TranSearchComponent;
  let fixture: ComponentFixture<TranSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
