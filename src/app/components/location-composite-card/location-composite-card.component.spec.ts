import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCompositeCardComponent } from './location-composite-card.component';

describe('LocationCompositeCardComponent', () => {
  let component: LocationCompositeCardComponent;
  let fixture: ComponentFixture<LocationCompositeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCompositeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCompositeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
