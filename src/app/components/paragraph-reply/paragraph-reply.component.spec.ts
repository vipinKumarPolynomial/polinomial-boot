import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphReplyComponent } from './paragraph-reply.component';

describe('ParagraphReplyComponent', () => {
  let component: ParagraphReplyComponent;
  let fixture: ComponentFixture<ParagraphReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
