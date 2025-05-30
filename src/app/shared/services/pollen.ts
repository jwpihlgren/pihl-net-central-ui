import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';

@Injectable({
  providedIn: 'root'
})
export class Pollen {

  regionId = signal<string | undefined>(undefined)
  forecast = httpResource<any>(() => {
    if (!this.regionId()) return

    type Optional = ForecastsParamsPR
    type Required = Pick<ForecastsParamsPR, "region_id">
    return UrlBuilder.createWithRequired<Optional, Required>(
      environment.pollenrapporten.url,
      environment.pollenrapporten.endpoints.forecast.path,
      { region_id: this.regionId() })
      .addParam("current", true)
      .build()
  })

  constructor() {
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
