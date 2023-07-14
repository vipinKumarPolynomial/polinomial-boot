import { TestBed } from '@angular/core/testing';

import { GetApiResponseService } from './get-api-response.service';

describe('GetApiResponseService', () => {
  let service: GetApiResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApiResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
