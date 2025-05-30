import { TestBed } from '@angular/core/testing';

import { Pollen } from './pollen';

describe('Pollen', () => {
  let service: Pollen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pollen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
