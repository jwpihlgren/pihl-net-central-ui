import { Component, computed, effect, inject } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';
import { WeatherService } from '../../../../shared/services/weather.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport, DatePipe, DecimalPipe],
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
  weatherForecastResource = this.weatherService.forecastByCoordinates({ lat: 58, lon: 16 })
  f = effect(() => {
    console.log(this.weatherForecastResource.value())
  })

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.hassTemperatureResource = this.hassTempSensorService.temperature
    this.pollenService.forecastByRegionId()

  }

}
