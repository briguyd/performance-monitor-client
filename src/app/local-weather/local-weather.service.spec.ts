import { TestBed } from '@angular/core/testing';

import { LocalWeatherService } from './local-weather.service';

describe('LocalWeatherService', () => {
  let service: LocalWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
