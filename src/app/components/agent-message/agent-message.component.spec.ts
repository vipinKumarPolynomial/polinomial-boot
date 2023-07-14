import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMessageComponent } from './agent-message.component';

describe('AgentMessageComponent', () => {
  let component: AgentMessageComponent;
  let fixture: ComponentFixture<AgentMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
