import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleEdgedButtonComponent } from './rectangle-edged-button.component';

describe('RectangleEdgedButtonComponent', () => {
  let component: RectangleEdgedButtonComponent;
  let fixture: ComponentFixture<RectangleEdgedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectangleEdgedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleEdgedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
