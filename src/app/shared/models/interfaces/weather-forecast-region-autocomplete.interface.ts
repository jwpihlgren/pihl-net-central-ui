export interface WeatherForecastRegionAutoComplete {
  numberOfResults: number
  results: WeatherForecastRegionResult[]
}


export interface WeatherForecastRegionResult {
  place: string
  coordinates: { lat: number, lon: number }
  municipality: string
  county: string
  country: string
  district: string
}
