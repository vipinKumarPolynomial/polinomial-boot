import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionButtonComponent } from './suggestion-button.component';

describe('SuggestionButtonComponent', () => {
  let component: SuggestionButtonComponent;
  let fixture: ComponentFixture<SuggestionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
