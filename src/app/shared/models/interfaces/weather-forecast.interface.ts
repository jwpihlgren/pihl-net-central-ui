export interface WeatherForecast {
  regionName: string
  coordinates: WeatherForecastCoordinates[]
  createdDate: Date,
  referenceDate: Date
  days: WeatherForecastDay[]
}

export interface WeatherForecastDay {
  date: Date
  daily: DailyWeather
  hourly: HourlyWeather[]
}


export interface WeatherForecastCoordinates {
  lat: number
  lon: number
}

export interface DailyWeather {
  date: Date
  weatherSymbol: number
  temperatureMin: number
  temperatureMax: number
  windFromDirectionAsNumber: number
  windFromDirectionAsCompassHeading: string
  windSpeed: number
  windGust: number
  percipitationMin: number
  percipitationMax: number
  percipitationProbability: number
}


export interface HourlyWeather {
  time: Date
  weatherSymbol: number,
  temperature: number,
  percipitationMin: number
  percipitationMax: number
  percipitationProbability: number
  percipitationPredominantType: number
  windFromDirectionAsNumber: number
  windFromDirectionAsCompassHeading: string
  windSpeed: number
  windGust: number
  temperatureFeelsLike: number
  relativeHumidity: number
  airPressure: number
  visibility: number

}
