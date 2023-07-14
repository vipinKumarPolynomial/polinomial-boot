import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualReplyComponent } from './visual-reply.component';

describe('VisualReplyComponent', () => {
  let component: VisualReplyComponent;
  let fixture: ComponentFixture<VisualReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
