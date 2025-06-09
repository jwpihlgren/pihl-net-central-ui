import { Component, computed, input, signal } from '@angular/core';
import { PollenForecast } from '../../models/interfaces/pollen-forecast';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pollen-regional-report',
  imports: [NgClass],
  templateUrl: './pollen-regional-report.html',
  styleUrl: './pollen-regional-report.css'
})
export class PollenRegionalReport {
  forecast = input.required<PollenForecast>()
  toggleButtonText = computed(() => this.showLongDescription() ? "visa mindre" : "visa mer")
  showLongDescription = signal(false)
  descriptionMaxLength = 80
  selectedIndex = signal(0)
  currentDailyForecast = computed(() => {
    let forecasts = this.forecast()
    forecasts.forecastPeriods[0].dailyForecasts = forecasts.forecastPeriods[0].dailyForecasts.filter(f => new Date(f.date).getDate() >= new Date().getDate())
    console.log(forecasts.forecastPeriods[0])
    return forecasts.forecastPeriods[0].dailyForecasts[this.selectedIndex()]
  })

  select(index: number) {
    this.selectedIndex.set(index)
  }

  toggleLongDescription(): void {
    this.showLongDescription.set(!this.showLongDescription())
  }


}
