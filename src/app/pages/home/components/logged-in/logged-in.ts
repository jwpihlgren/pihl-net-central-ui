import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';
import { WeatherService } from '../../../../shared/services/weather.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { ChartOptions, RangeBarChart } from '../../../../shared/components/range-bar-chart/range-bar-chart';
import { WeatherForecast } from '../../../../shared/models/weather-forecast.interface';


@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport, DatePipe, DecimalPipe, NgClass, RangeBarChart],
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
  weatherForecastAsData(forecast: WeatherForecast): Partial<ChartOptions> {
    return {
      series: [
        {
          name: "Temperature",
          data: forecast.days.map(d => ({
            x: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            y: [d.parameters.rows.temp.min, d.parameters.rows.temp.max]
          }))
        }
      ]
    }

  }
}

export const iconPaths: Record<number, string> = {
  // 1–7: sky conditions
  1: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", // ☀ clear
  2: "M12 5a4 4 0 1 1 0 8h-2a3 3 0 0 0 0 6h7a4 4 0 0 0 0-8 4 4 0 0 1-5-6z", // 🌤 nearly clear
  3: "M10 6a3 3 0 1 1 0 6h-2a3 3 0 1 0 0 6h8a3 3 0 0 0 0-6 3 3 0 0 1-6-6z", // ⛅ variable
  4: "M8 8h8a3 3 0 0 1 0 6H8a3 3 0 1 1 0-6z", // 🌥 halfclear
  5: "M6 10h12a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6z", // ☁ cloudy
  6: "M4 11h16a4 4 0 0 1 0 8H4a4 4 0 1 1 0-8z", // 🌫 overcast
  7: "M5 13h14M6 15h12M5 17h14", // fog (horizontal lines)

  // 8–10: rain showers
  8: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM9 17l-1 2M13 17l-1 2", // 🌦 light rain showers
  9: "M8 8a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM9 16l-1 3M13 16l-1 3M17 16l-1 3", // 🌧 moderate
  10: "M8 8a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM8 16l-1 4M12 16l-1 4M16 16l-1 4M10 16l-1 4", // 🌧 heavy

  // 11: thunderstorm
  11: "M8 8a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM11 15l-2 4h2l-1 4 4-5h-2l1-3z", // ⚡

  // 12–14: sleet showers
  12: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM9 17l-1 2M13 17l-1 2M11 18h2", // 🌨 light
  13: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM8 17l-1 2M12 17l-1 2M16 17l-1 2M10 18h2", // moderate
  14: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM7 17l-1 3M11 17l-1 3M15 17l-1 3M9 18h3M13 18h3", // heavy

  // 15–17: snow showers
  15: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM10 17l1 2M12 17l1 2M11 18l-1 1", // ❄ light
  16: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM9 17l1 2M11 17l1 2M13 17l1 2M11 18l-1 1", // moderate
  17: "M8 9a4 4 0 1 1 8 0h1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6zM8 17l1 3M10 17l1 3M12 17l1 3M14 17l1 3", // heavy

  // 18–20: rain
  18: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM10 17l-1 2M13 17l-1 2", // 🌧 light rain
  19: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM9 16l-1 3M12 16l-1 3M15 16l-1 3", // moderate rain
  20: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM8 16l-1 4M11 16l-1 4M14 16l-1 4M17 16l-1 4", // heavy rain

  // 21: thunder
  21: "M10 8l2 3h-2l2 4-4-4h2z", // ⚡ simplified bolt

  // 22–24: sleet
  22: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM10 17l-1 2M12 17l-1 2M11 18h2", // light sleet
  23: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM9 17l-1 2M11 17l-1 2M13 17l-1 2M11 18h2", // moderate sleet
  24: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM8 17l-1 3M10 17l-1 3M12 17l-1 3M14 17l-1 3", // heavy sleet

  // 25–27: snow
  25: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM10 17l1 2M12 17l1 2M11 18l-1 1", // light snow
  26: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM9 17l1 2M11 17l1 2M13 17l1 2M11 18l-1 1", // moderate snow
  27: "M8 8h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8zM8 17l1 3M10 17l1 3M12 17l1 3M14 17l1 3", // heavy snow
};

