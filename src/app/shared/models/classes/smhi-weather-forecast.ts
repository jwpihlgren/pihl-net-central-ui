import { WeatherForecastResponse } from "../smhi/weather-forecast-response.interface";
import { WeatherForecast } from "../weather-forecast.interface";

export class SmhiWeatherForecast implements WeatherForecast {
  forecastTime: Date;
  forecast: { dateTime: Date; forecastParameters: { name: string; unit: string; value: string; }[]; }[];

  constructor(raw: WeatherForecastResponse) {
    this.forecastTime = raw.referenceTime
    this.forecast = this.mapData(raw)
  }


  mapData(raw: WeatherForecastResponse): typeof this.forecast {
    const forecast: typeof this.forecast = []
    raw.timeSeries.forEach(t => {
      const hourly: typeof this.forecast[0] = {
        dateTime: t.validTime,
        forecastParameters: t.parameters.map(p => {
          const forecastParameter: typeof this.forecast[0]["forecastParameters"][0] = {
            name: p.name,
            unit: p.unit,
            value: p.values[0].toString()
          }
          return forecastParameter
        })
      }
      forecast.push(hourly)
    })

    return forecast
  }
}
