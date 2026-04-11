import { AfterViewInit, Component, computed, input, signal } from '@angular/core';
import { PollenForecast } from '../../models/interfaces/pollen-forecast';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-pollen-regional-report',
  imports: [NgClass, DatePipe],
  templateUrl: './pollen-regional-report.html',
  styleUrl: './pollen-regional-report.css'
})
export class PollenRegionalReport implements AfterViewInit {
  forecast = input.required<PollenForecast>()
  description = signal("")
  toggleButtonText = computed(() => this.showLongDescription() ? "visa mindre" : "visa mer")
  showLongDescription = signal(false)
  descriptionMaxLength = 100
  selectedIndex = signal(0)

  select(index: number) {
    this.selectedIndex.set(index)
  }

  toggleLongDescription(): void {
    this.showLongDescription.set(!this.showLongDescription())
    this.description.set(this.getDescription(this.forecast().forecastPeriods[0].generalDescription))
  }

  getDescription(description: string): string {
    if (description.length > this.descriptionMaxLength && !this.showLongDescription())
      return description
        .substring(0, this.descriptionMaxLength - 3)
        .concat("...")
    return description
  }

  ngAfterViewInit(): void {
    this.description.set(this.getDescription(this.forecast().forecastPeriods[0].generalDescription))
  }

}
