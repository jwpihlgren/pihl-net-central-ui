import { HttpResourceRef } from "@angular/common/http"

export interface WeatherForecast {
  region?: string
  coordinates: Coordinates
  createdDate: Date
  referenceDate: Date
  data: WeatherTimestamp[]
}

export interface WeatherTimestamp {
  time: Date
  airPressure: number
  airTemperature: number
  precipitation: {
    max: number
    min: number
    frozenPart: number
    probability: number
    probabilityFrozen: number
    type: number
  }
  relativeHumidity: number
  visibility: number
  wind: {
    fromDirection: number
    speed: number
    gustSpeed: number
  }
  weatherSymbol: string
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface SummaryMultipleDayForecast {
  region?: string
  dates: SummaryDayForecast[]
}

export interface SummaryDayForecast {
  date: Date
  minTemp: number
  maxTemp: number
  weatherSymbol: string
}

export interface DetailedMultipleDayForecast {
  region?: string
  dates: DetailedDayForecast[]
}

export interface DetailedDayForecast {
  date: Date
  weatherSymbol: number
  temperatureMin: number
  temperatureMax: number
  windFromDirectionAsNumber: number
  windFromDirectionAsCompassHeading: string
  windSpeed: number
  windGust: number
  precipitationMin: number
  precipitationMax: number
  precipitationProbability: number
  hourly: DetailedHourForecast[]
}

export interface DetailedHourForecast {
  time: Date
  weatherSymbol: number,
  temperature: number,
  precipitationMin: number
  precipitationMax: number
  precipitationProbability: number
  precipitationPredominantType: number
  windFromDirectionAsNumber: number
  windFromDirectionAsCompassHeading: string
  windSpeed: number
  windGust: number
  temperatureFeelsLike: number
  relativeHumidity: number
  airPressure: number
  visibility: number
}

export interface WeatherAdapter {
  resource: HttpResourceRef<WeatherForecast | undefined>
  setPoint(point: Coordinates): void
}
