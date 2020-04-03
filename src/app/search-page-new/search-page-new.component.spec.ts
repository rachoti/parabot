import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageNewComponent } from './search-page-new.component';

describe('SearchPageNewComponent', () => {
  let component: SearchPageNewComponent;
  let fixture: ComponentFixture<SearchPageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
