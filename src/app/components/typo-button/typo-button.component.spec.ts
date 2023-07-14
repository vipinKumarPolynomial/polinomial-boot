import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypoButtonComponent } from './typo-button.component';

describe('TypoButtonComponent', () => {
  let component: TypoButtonComponent;
  let fixture: ComponentFixture<TypoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
