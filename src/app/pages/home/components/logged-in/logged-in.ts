import { Component, computed, inject } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';
import { WeatherService } from '../../../../shared/services/weather.service';

@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
  pollenService = inject(Pollen)
  hassTempSensorService = inject(HassTempSensorService)
  weatherService = inject(WeatherService)
  forecastResource
  hassTemperatureResource
  forecast = computed(() => this.forecastResource.value())
  hassTemperature = computed(() => this.hassTemperatureResource.value())
  weatherForecastResource = this.weatherService.forecastByCoordinates({lat: 58, lon: 16})

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.hassTemperatureResource = this.hassTempSensorService.temperature
    this.pollenService.forecastByRegionId()
  }

}
