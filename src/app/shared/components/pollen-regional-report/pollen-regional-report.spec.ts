import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollenRegionalReport } from './pollen-regional-report';

describe('PollenRegionalReport', () => {
  let component: PollenRegionalReport;
  let fixture: ComponentFixture<PollenRegionalReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollenRegionalReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollenRegionalReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
