import { TestBed } from '@angular/core/testing';

import { HassTempSensorService } from './hass-temp-sensor.service';

describe('HassTempSensorService', () => {
  let service: HassTempSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HassTempSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
