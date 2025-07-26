import { computed, Injectable, signal } from '@angular/core';
import { SMHIWeatherForecastResponse } from '../models/smhi/weather-forecast-response.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SmhiWeatherForecast } from '../models/classes/smhi-weather-forecast';
import { WeatherForecast } from '../models/weather-forecast.interface';
import { WeatherForecastRegionAutoComplete } from '../models/interfaces/weather-forecast-region-autocomplete.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _forecastRegionSearchAutocompleteQuery = signal<string>("")
  private _forecastRegionSearchAutocompleteResult = computed(() => {
    if (this._forecastRegionSearchAutocompleteQuery() === "") return undefined
    return this.requestForecastRegionAutocomplete(this._forecastRegionSearchAutocompleteQuery())
  })

  forecastRegionSearchAutocomplete(query: string) {
    this._forecastRegionSearchAutocompleteQuery.set(query)
    return this._forecastRegionSearchAutocompleteResult
  }

  forecastRegionByName(name: string) {
    console.log(`Forecast for ${name}`)
  }


  private requestForecastRegionAutocomplete(name: string) {
    const url = `${environment.wpt_a_smhi.url}${environment.wpt_a_smhi.endpoints.regionAutocomplete}${name}`
    return httpResource<WeatherForecastRegionAutoComplete>(() => {
      return {
        url: url,
        cache: "force-cache",
      }
    })
  }

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
