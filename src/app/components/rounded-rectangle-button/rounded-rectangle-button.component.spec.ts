import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedRectangleButtonComponent } from './rounded-rectangle-button.component';

describe('RoundedRectangleButtonComponent', () => {
  let component: RoundedRectangleButtonComponent;
  let fixture: ComponentFixture<RoundedRectangleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundedRectangleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundedRectangleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
