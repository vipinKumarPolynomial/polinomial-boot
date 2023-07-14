import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainQuickReplyComponent } from './plain-quick-reply.component';

describe('PlainQuickReplyComponent', () => {
  let component: PlainQuickReplyComponent;
  let fixture: ComponentFixture<PlainQuickReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainQuickReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainQuickReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
