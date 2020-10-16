import { TestBed } from '@angular/core/testing';

import { NuServiceService } from './nu-service.service';

describe('NuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuServiceService = TestBed.get(NuServiceService);
    expect(service).toBeTruthy();
  });
});
