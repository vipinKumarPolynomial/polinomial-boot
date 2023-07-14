import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCorosalComponent } from './ticket-corosal.component';

describe('TicketCorosalComponent', () => {
  let component: TicketCorosalComponent;
  let fixture: ComponentFixture<TicketCorosalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCorosalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCorosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
