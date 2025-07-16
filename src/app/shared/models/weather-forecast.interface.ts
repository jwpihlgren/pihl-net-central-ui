export interface WeatherForecast {
  forecastTime: Date
  forecast: {
    dateTime: Date
    forecastParameters: {
      name: string
      unit: string
      value: string
    }[]
  }[]
}
