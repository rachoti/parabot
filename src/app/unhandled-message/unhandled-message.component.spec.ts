import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhandledMessageComponent } from './unhandled-message.component';

describe('UnhandledMessageComponent', () => {
  let component: UnhandledMessageComponent;
  let fixture: ComponentFixture<UnhandledMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnhandledMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnhandledMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
