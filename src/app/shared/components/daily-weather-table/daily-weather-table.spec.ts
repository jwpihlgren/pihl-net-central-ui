import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherTable } from './daily-weather-table';

describe('DailyWeatherTable', () => {
  let component: DailyWeatherTable;
  let fixture: ComponentFixture<DailyWeatherTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyWeatherTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyWeatherTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
