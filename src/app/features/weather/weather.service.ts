import { computed, inject, Injectable, } from '@angular/core';
import { Coordinates, SummaryDayForecast, SummaryMultipleDayForecast, WeatherForecast } from './weather.interface';
import { WEATHER_ADAPTER_TOKEN } from './weather.token';

@Injectable()
export class WeatherService {

  private adapter = inject(WEATHER_ADAPTER_TOKEN)

  private forecast = computed(() => {
    if (!this.adapter.resource.value()) return undefined
    return this.adapter.resource.value()
  })

  isLoading = this.adapter.resource.isLoading
  hasValue = computed(() => this.adapter.resource.hasValue())
  error = this.adapter.resource.error


  summaryMultipleDayForecast = computed(() => {
    const forecast = this.forecast()
    if (!forecast) return undefined
    return this.toSummaryForecast(forecast)
  })

  // detailedMultipleDayForecast = computed(() => {
  //   const forecast = this.forecast
  //   return toDetailedForecast(forecast)
  // })

  update() {
    this.adapter.resource.reload()
  }

  setPoint(point: Coordinates) {
    this.adapter.setPoint(point)
  }


  private toSummaryForecast(forecast: WeatherForecast): SummaryMultipleDayForecast {
    const dates = forecast.data.reduce((acc, cur) => {
      const d = new Date(cur.time)
      const date: string = new Date(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`).toDateString()
      const temp = cur.airTemperature
      if (!acc[date]) {
        acc[date] =
        {
          date: new Date(date),
          minTemp: temp,
          maxTemp: temp,
          weatherSymbol: cur.weatherSymbol
        }
        return acc
      }

      const currentMin = acc[date].minTemp
      const currentMax = acc[date].maxTemp

      acc[date].minTemp = Math.min(currentMin, cur.airTemperature)
      acc[date].maxTemp = Math.max(currentMax, cur.airTemperature)
      return acc
    }, {} as Record<string, SummaryDayForecast>)

    return { dates: Object.values(dates) }
  }
}


