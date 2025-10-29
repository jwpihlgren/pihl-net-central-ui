import { TableDefinition } from "../table-definition"

export interface WeatherForecast {
  regionName: string
  coordinates: WeatherForecastCoordinates[]
  issuedTime: Date,
  days: WeatherForecastDay[]
}

export interface WeatherForecastDay {
  date: Date
  parameters: WeatherForecastDailyTable
  hours: WeatherForecastHourlyTable[]
}

type WeatherForecastDailyTableData = {
  day: Date,
  symbol: number,
  percipitation: { min: number, max: number, unit: string },
  wind: { direction: string, speed: number, gust: number, unit: string }
  temp: { min: number, max: number, unit: string }
}

export type WeatherForecastDailyTable = TableDefinition<WeatherForecastDailyTableData>

type WeatherForecastHourlyTableData = {
  hour: Date,
  symbol: number,
  temp: { value: number, unit: string },
  wind: { direction: string, speed: number, gust: number, unit: string },
  percipitation: { value: number, unit: string },
  feelsLike: { value: number, unit: string },
  humidity: { value: number, unit: string },
  airpressure: { value: number, unit: string },
  visibility: { value: number, unit: string }
}

export type WeatherForecastHourlyTable = TableDefinition<WeatherForecastHourlyTableData>



export interface WeatherForecastCoordinates {
  lat: number
  lon: number
}
