import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconQuickReplyComponent } from './icon-quick-reply.component';

describe('IconQuickReplyComponent', () => {
  let component: IconQuickReplyComponent;
  let fixture: ComponentFixture<IconQuickReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconQuickReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconQuickReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
