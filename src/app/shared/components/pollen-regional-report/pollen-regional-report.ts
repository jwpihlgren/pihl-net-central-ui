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

  select(index: number) {
    this.selectedIndex.set(index)
  }

  toggleLongDescription(): void {
    this.showLongDescription.set(!this.showLongDescription())
  }


}
