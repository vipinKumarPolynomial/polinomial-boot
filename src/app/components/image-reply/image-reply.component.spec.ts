import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReplyComponent } from './image-reply.component';

describe('ImageReplyComponent', () => {
  let component: ImageReplyComponent;
  let fixture: ComponentFixture<ImageReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
