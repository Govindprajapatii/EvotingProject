import { TestBed } from '@angular/core/testing';

import { VoterRegistrationService } from './voter-registration.service';

describe('VoterRegistrationService', () => {
  let service: VoterRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
