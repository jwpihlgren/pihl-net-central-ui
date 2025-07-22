import { Injectable } from '@angular/core';
import { SMHIWeatherForecastResponse } from '../models/smhi/weather-forecast-response.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SmhiWeatherForecast } from '../models/classes/smhi-weather-forecast';
import { WeatherForecast } from '../models/weather-forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  forecastByCoordinates(params: { lat: number, lon: number }) {
    const latLon = `lon/${params.lon}/lat/${params.lat}`
    return httpResource<WeatherForecast>(() => `${environment.smhi.url}${environment.smhi.endpoints.weatherForecastPoint}/${latLon}/data.json`,
      { parse: (data) => this.parseData(data as SMHIWeatherForecastResponse) }
    )
  }

  private parseData(data: SMHIWeatherForecastResponse): WeatherForecast {
    console.log(data)
    const parsed = new SmhiWeatherForecast(data)
    console.log(parsed)
    return parsed
  }



  constructor() { }
}


//https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/58/lat/16/data.json
//https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16/lat/58/data.json
