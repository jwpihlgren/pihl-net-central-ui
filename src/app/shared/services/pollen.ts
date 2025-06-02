import { HttpClient, httpResource, HttpResourceOptions, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { computed, inject, Injectable, ResourceRef, signal } from '@angular/core';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';
import { PaginatedDataForecastPR } from '../models/pollenrapporten/schemas/paginated-data-forecast';
import { PRPollenForecast } from '../models/classes/pr-pollen-forecast';
import { PaginatedDataPollenType } from '../models/pollenrapporten/schemas/paginated-data-pollen-type';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class Pollen {


  protected http: HttpClient = inject(HttpClient)
  forecast: ResourceRef<PRPollenForecast | undefined> = this.requestForecast()
  regionId = signal<string | undefined>(undefined)

  constructor() {
  }

  private requestForecast() {
    return rxResource<PRPollenForecast, unknown>({
      stream: () => {
        const regionId = this.regionId()
        if (regionId === undefined) return EMPTY
        type OptionalParams = ForecastsParamsPR
        type RequiredParams = Required<Pick<ForecastsParamsPR, "region_id">>
        const url = UrlBuilder.createWithRequired<OptionalParams, RequiredParams>(
          environment.pollenrapporten.url,
          environment.pollenrapporten.endpoints.forecast,
          { region_id: regionId })
          .addParam("current", true)
        return this.http.get<PaginatedDataPollenType>(UrlBuilder.create(
          environment.pollenrapporten.url,
          environment.pollenrapporten.endpoints.pollenType)
          .build())
          .pipe(
            switchMap(pollenType => this.http.get<PaginatedDataForecastPR>(url.buildWithQueryParams()).pipe(
              map(data => {
                  return new PRPollenForecast(data, pollenType)
              })
            )
          ))
      }
    })
  }

  forecastByRegionId(regionId: string = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38", options?: ForecastsParamsPR) {
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

