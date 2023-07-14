import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundQuickReplyComponent } from './round-quick-reply.component';

describe('RoundQuickReplyComponent', () => {
  let component: RoundQuickReplyComponent;
  let fixture: ComponentFixture<RoundQuickReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundQuickReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundQuickReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
