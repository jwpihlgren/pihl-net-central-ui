import { httpResource, HttpResourceOptions, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';
import { PaginatedDataForecastPR } from '../models/pollenrapporten/schemas/paginated-data-forecast';

@Injectable({
  providedIn: 'root'
})
export class Pollen {


  forecast?: HttpResourceRef<PaginatedDataForecastPR | undefined>
  regionId = signal<string | undefined>(undefined)

  constructor() {
  }

  private requestForecast() {

    if (!this.regionId()) return undefined
    type OptionalParams = ForecastsParamsPR
    type RequiredParams = Required<Pick<ForecastsParamsPR, "region_id">>
    const url = UrlBuilder.createWithRequired<OptionalParams, RequiredParams>(
      environment.pollenrapporten.url,
      environment.pollenrapporten.endpoints.forecast,
      { region_id: this.regionId()! })
    url.addParam("current", true)

    const request: HttpResourceRequest = {
      url: url.build(),
      method: "GET",
      params: url.getParamsAsRecord(),
      reportProgress: true,
      transferCache: true,
    }
    const requestOptions: HttpResourceOptions<PaginatedDataForecastPR, unknown> = {
      parse: this.forecastParser,
    }
    return httpResource(() => request, requestOptions)
  }

  private forecastParser(data: unknown): PaginatedDataForecastPR {
    const d = data as PaginatedDataForecastPR

    const daily = d.items.map(item => {
      const grouped = Object.groupBy(item.levelSeries, (level) => {

        return level.time
      })
      return grouped
    })
    console.log(daily)
    return data as PaginatedDataForecastPR
  }

  forecastByRegionId(regionId: string = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38", options?: ForecastsParamsPR) {
    this.regionId.set(regionId)
    if (!this.forecast) {
      this.forecast = this.requestForecast()
    }
  }

  regions(): Observable<any> {
    return of([])
  }

  regionByName(name: string) {
    return this.regions().pipe(
      map(data => {
        const regionMatch = (data as any[]).find(region => name === region.name)
        return regionMatch
      })
    )
  }

}

