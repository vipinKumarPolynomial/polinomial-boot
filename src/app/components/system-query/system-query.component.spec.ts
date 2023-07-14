import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemQueryComponent } from './system-query.component';

describe('SystemQueryComponent', () => {
  let component: SystemQueryComponent;
  let fixture: ComponentFixture<SystemQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
