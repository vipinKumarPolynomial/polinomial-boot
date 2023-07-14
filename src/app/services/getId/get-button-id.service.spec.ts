import { TestBed } from '@angular/core/testing';

import { GetButtonIdService } from './get-button-id.service';

describe('GetButtonIdService', () => {
  let service: GetButtonIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetButtonIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
