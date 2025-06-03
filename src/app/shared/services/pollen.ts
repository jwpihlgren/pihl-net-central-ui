import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ResourceRef, signal } from '@angular/core';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';
import { PaginatedDataForecastPR } from '../models/pollenrapporten/schemas/paginated-data-forecast';
import { PRPollenForecast } from '../models/classes/pr-pollen-forecast';
import { PaginatedDataPollenType } from '../models/pollenrapporten/schemas/paginated-data-pollen-type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Storage } from './storage';
import { PollenForecast } from '../models/interfaces/pollen-forecast';

@Injectable({
  providedIn: 'root'
})
export class Pollen {


  protected http: HttpClient = inject(HttpClient)
  protected storage: Storage = inject(Storage)
  forecast: ResourceRef<PollenForecast | undefined> = this.forecastResource()
  regionId = signal<string | undefined>(undefined)

  constructor() {
  }

  private forecastResource() {
    return rxResource<PollenForecast, unknown>({
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
        return this.requestPollenTypes().pipe(
          switchMap(pollenType => {
            type StoredPollenForecast = { ttl: number, date: string, forecast: PollenForecast }
            const storedForecast = this.storage.getSessionItem<StoredPollenForecast>(environment.storage.pollenForecastPrefix)
            if (storedForecast) {
              const endDate = Date.parse(storedForecast.date) + storedForecast.ttl
              const now = Date.parse(new Date().toISOString())
              if (endDate > now) {
                return of(storedForecast.forecast)
              }
            }
            return this.http.get<PaginatedDataForecastPR>(url.buildWithQueryParams()).pipe(
              map(data => {
                const forecast: PollenForecast = new PRPollenForecast(data, pollenType)
                const ttlInMs = 1000 * 60 * 60 * 2
                const forecastToStore = { ttl: ttlInMs, date: new Date().toISOString(), forecast: forecast }
                this.storage.setSessionItem<StoredPollenForecast>(`${environment.storage.pollenForecastPrefix}`, forecastToStore)
                return forecast
              })
            )
          })
        )
      }
    })
  }

  private requestPollenTypes(): Observable<PaginatedDataPollenType> {
    const storedPollenTypes = this.storage.getSessionItem<PaginatedDataPollenType>(environment.storage.pollenTypePrefix)
    if (storedPollenTypes) return of(storedPollenTypes)
    return this.http.get<PaginatedDataPollenType>(UrlBuilder.create(
      environment.pollenrapporten.url,
      environment.pollenrapporten.endpoints.pollenType)
      .build()).pipe(
        map(data => {
          this.storage.setSessionItem<PaginatedDataPollenType>(environment.storage.pollenTypePrefix, data)
          return data
        })
      )
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

