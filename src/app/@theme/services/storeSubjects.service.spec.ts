import { TestBed } from '@angular/core/testing';

import { StoreSubjectsService } from './storeSubjects.service';

describe('StoreSubjectsService', () => {
  let service: StoreSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
