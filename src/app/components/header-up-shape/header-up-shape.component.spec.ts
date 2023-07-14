/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUpShapeComponent } from './header-up-shape.component';

describe('HeaderUpShapeComponent', () => {
  let component: HeaderUpShapeComponent;
  let fixture: ComponentFixture<HeaderUpShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUpShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUpShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
