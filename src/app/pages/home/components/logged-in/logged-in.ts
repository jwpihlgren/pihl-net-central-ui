import { Component, computed, inject } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';

@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
  pollenService = inject(Pollen)
  hassTempSensorService = inject(HassTempSensorService)
  forecastResource
  hassTemperatureResource
  forecast = computed(() => this.forecastResource.value())
  hassTemperature = computed(() => this.hassTemperatureResource.value())

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.hassTemperatureResource = this.hassTempSensorService.temperature
    this.pollenService.forecastByRegionId()
  }

}
