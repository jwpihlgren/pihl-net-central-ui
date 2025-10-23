import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeBarChart } from './range-bar-chart';

describe('RangeBarChart', () => {
  let component: RangeBarChart;
  let fixture: ComponentFixture<RangeBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeBarChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeBarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
