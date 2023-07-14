import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailCardComponent } from './property-detail-card.component';

describe('PropertyDetailCardComponent', () => {
  let component: PropertyDetailCardComponent;
  let fixture: ComponentFixture<PropertyDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
