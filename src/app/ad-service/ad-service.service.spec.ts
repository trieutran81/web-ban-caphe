import { TestBed } from '@angular/core/testing';

import { AdServiceService } from './ad-service.service';

describe('AdServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdServiceService = TestBed.get(AdServiceService);
    expect(service).toBeTruthy();
  });
});
