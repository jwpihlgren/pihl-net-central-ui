import { httpResource } from "@angular/common/http"
import { Injectable, signal } from "@angular/core"
import { environment } from "../../../../environments/environment.development"
import { WeatherForecast, WeatherAdapter, Coordinates } from "@app/features/weather"
import { SMHIWeatherForecastResponse } from "./smhi-weather.interface"
import { SmhiWeatherForecast } from "@app/shared/models/classes/smhi-weather-forecast"

@Injectable()
export class SMHIWeatherAdapter implements WeatherAdapter {

  private point = signal<Coordinates | undefined>(undefined)

  resource = httpResource<WeatherForecast>(() => {
    const point = this.point()
    if (!point) return undefined
    let url = `${environment.smhi.url}`
    url.concat(environment.smhi.endpoints.weatherForecastPoint)
    url.concat(`lon/${point.lon}/lat/${point.lat}/data.json`)
    return `${environment.smhi.url}${environment.smhi.endpoints.weatherForecastPoint}`
  }, {
    parse: (response: SMHIWeatherForecastResponse): WeatherForecast => {
      const [lat, lon] = response.geometry.coordinates[0]
      const forecast: WeatherForecast = {
        coordinates: { lat: lat, lon: lon },
        createdDate: response.createdTime,
        referenceDate: response.referenceTime,
        data: response.timeSeries.map(t => ({
          time: t.time,
          airTemperature: t.data.air_temperature,
          weatherSymbol: t.data.symbol_code.toString(),
          airPressure: t.data.air_pressure_at_mean_sea_level,
          precipitation: {
            frozenPart: t.data.precipitation_frozen_part,
            max: t.data.precipitation_amount_max,
            min: t.data.precipitation_amount_min,
            probability: t.data.probability_of_precipitation,
            probabilityFrozen: t.data.probability_of_frozen_precipitation,
            type: t.data.predominant_precipitation_type_at_surface
          },
          relativeHumidity: t.data.relative_humidity,
          visibility: t.data.visibility_in_air,
          wind: {
            fromDirection: t.data.wind_from_direction,
            gustSpeed: t.data.wind_speed_of_gust,
            speed: t.data.wind_speed
          }
        }))

      }

      return forecast
    }
  })

  setPoint(point: Coordinates): void {
    this.point.set(point)
  }
}
