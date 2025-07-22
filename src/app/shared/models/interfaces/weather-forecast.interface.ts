import { TableDefinition } from "../table-definition"

export interface WeatherForecast {
  regionName: string
  coordinates: WeatherForecastCoordinates[]
  issuedTime: Date,
  dailyHeaders: string[]
  hourlyHeaders: string[]
  days: WeatherForecastDay[]
}

export interface WeatherForecastDay {
  date: Date
  parameters: WeatherForecastDailyTable
  hours: WeatherForecastHourlyTable[]
}

//Daily forecasts
type WeatherForecastDailyTableData = {
  day: Date,
  symbol: string,
  percipitation: { min: number, max: number, unit: string },
  wind: { direction: string, speed: number, unit: string }
  temp: { min: number, max: number, unit: string }
}
export type WeatherForecastDailyTable = TableDefinition<WeatherForecastDailyTableData>

//Hourly forecasts
type WeatherForecastHourlyTableData = {
  hour: Date,
  symbol: number,
  temp: number, unit: string,
  windDirection: { windDirection: string, windSpeed: number, windGust: number },
  percipitation: number,
  feelsLike: number,
  humidity: number,
  airpressure: number,
  visibility: number
}
export type WeatherForecastHourlyTable = TableDefinition<WeatherForecastHourlyTableData>

//coordinates
export interface WeatherForecastCoordinates {
  lat: number
  lon: number
}


