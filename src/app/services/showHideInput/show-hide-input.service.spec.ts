import { TestBed } from '@angular/core/testing';

import { ShowHideInputService } from './show-hide-input.service';

describe('ShowHideInputService', () => {
  let service: ShowHideInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowHideInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
