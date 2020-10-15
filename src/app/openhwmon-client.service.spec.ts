import { TestBed } from '@angular/core/testing';

import { OpenhwmonClientService } from './openhwmon-client.service';

describe('OpenhwmonClientService', () => {
  let service: OpenhwmonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenhwmonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
