import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenttranscriptComponent } from './recenttranscript.component';

describe('RecenttranscriptComponent', () => {
  let component: RecenttranscriptComponent;
  let fixture: ComponentFixture<RecenttranscriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecenttranscriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecenttranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
