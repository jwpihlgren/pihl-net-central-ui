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
  parameters: WeatherForecastDayParameter
  hours: WeatherForecastHourParameter[]
}

export type WeatherForecastDayParameter = [
  { day: Date },
  { symbol: number },
  { minTemp: number, maxTemp: number, unit: string },
  { windDirection: number, windSpeed: number, windGust: number },
  { minPercipitation: number, maxPercipitaiton: number },
]

export interface WeatherForecastHour {
  hour: string
  parameters: WeatherForecastHourParameter[]
}

export type WeatherForecastHourParameter = [
  { hour: Date },
  { symbol: number },
  { temp: number, unit: string },
  { windDirection: number, windSpeed: number, windGust: number },
  { percipitation: number },
  { feelsLike: number },
  { humidity: number },
  { airpressure: number },
  { visibility: number }
];

export interface WeatherForecastCoordinates {
  lat: number
  lon: number
}


