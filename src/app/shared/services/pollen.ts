import { httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';
import { PaginatedDataForecastPR } from '../models/pollenrapporten/schemas/paginated-data-forecast';

@Injectable({
  providedIn: 'root'
})
export class Pollen {

  private _forecast: HttpResourceRef<PaginatedDataForecastPR | undefined>

  regionId = signal<string | undefined>(undefined)

  constructor() {
    this._forecast = this.initForecast()
  }


  get forecast() {
    return computed(() => this._forecast!)
  }

  private initForecast(): HttpResourceRef<PaginatedDataForecastPR | undefined> {
    return httpResource<PaginatedDataForecastPR>(() => {
      if (!this.regionId()) return

      type OptionalParams = ForecastsParamsPR
      type RequiredParams = Required<Pick<ForecastsParamsPR, "region_id">>
      return UrlBuilder.createWithRequired<OptionalParams, RequiredParams>(
        environment.pollenrapporten.url,
        environment.pollenrapporten.endpoints.forecast.path,
        { region_id: this.regionId()! })
        .addParam("current", true)
        .build()
    })

  }

  forecastByRegionId(regionId: string = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38", options?: Partial<ForecastByIdOptions>) {

    const config: ForecastByIdOptions = {
      ...options
    }

    this.regionId.set(regionId)

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

interface ForecastByIdOptions {
  pollenId?: string
  current?: boolean
  offset?: number
  limit?: number
  startDate?: string
  endDate?: string
}
