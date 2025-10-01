import { Component, computed, effect, inject, signal } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';
import { WeatherService } from '../../../../shared/services/weather.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport, DatePipe, DecimalPipe, NgClass],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
  pollenService = inject(Pollen)
  hassTempSensorService = inject(HassTempSensorService)
  weatherService = inject(WeatherService)
  forecastResource
  hassTemperatureResource
  hassTemperature = computed(() => this.hassTemperatureResource.value())
  weatherForecastResource = this.weatherService.forecastByCoordinates({ lat: 57.716666, lon: 11.966666 })
  f = effect(() => {
    console.log(this.forecastResource.value())
    console.log(this.weatherForecastResource.value())
  })


  openDetailsRow = signal<number | undefined>(undefined)

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.hassTemperatureResource = this.hassTempSensorService.temperature
    this.pollenService.forecastByRegionId()

  }

  toggleDetailsRow(event: Event) {
    const element = event.currentTarget as HTMLElement
    let rowId: number | undefined = parseInt(element.getAttribute("data-master-row-id") || "")
    if (isNaN(rowId)) rowId = undefined
    if (rowId === this.openDetailsRow()) rowId = undefined
    this.openDetailsRow.set(rowId)
  }

}
