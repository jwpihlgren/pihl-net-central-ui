import { Component, computed, inject } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';

@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
  pollenService = inject(Pollen)
  forecastResource
  forecast = computed(() => this.forecastResource.value())

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.pollenService.forecastByRegionId()
  }

}
