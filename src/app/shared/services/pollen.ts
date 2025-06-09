import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ResourceRef, signal } from '@angular/core';
import { EMPTY, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment.development';
import { ForecastsParamsPR } from '../models/pollenrapporten/endpoints/forecasts-params';
import { PaginatedDataForecastPR } from '../models/pollenrapporten/schemas/paginated-data-forecast';
import { PRPollenForecast } from '../models/classes/pr-pollen-forecast';
import { PaginatedDataPollenType } from '../models/pollenrapporten/schemas/paginated-data-pollen-type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Storage } from './storage';
import { PollenForecast } from '../models/interfaces/pollen-forecast';
import { PaginatedDataRegion } from '../models/pollenrapporten/schemas/paginated-data-region';

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
        return forkJoin({
          pollenTypes: this.requestPollenTypes(),
          pollenRegions: this.requestPollenRegions()
        }).pipe(
          switchMap(combined => {
            const storedForecast = this.storage.getSessionItem<PollenForecast>(environment.storage.pollenForecastPrefix)
            if (storedForecast) {
              return of(storedForecast)
            }
            return this.http.get<PaginatedDataForecastPR>(url.buildWithQueryParams()).pipe(
              map(data => {
                const forecast: PollenForecast = new PRPollenForecast(data, combined.pollenTypes, combined.pollenRegions)
                this.storage.setSessionItemWithTTL<PollenForecast>(
                  `${environment.storage.pollenForecastPrefix}`,
                  environment.storage.pollenForecastTTLInMs,
                  forecast)
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

  forecastByRegionId(id: string = "2a2a2a2a-2a2a-4a2a-aa2a-2a2a2a303a38") {
    this.regionId.set(id)
  }

  private requestPollenRegions(): Observable<PaginatedDataRegion> {
    const storedPollenRegions = this.storage.getSessionItem<PaginatedDataRegion>(environment.storage.pollenRegionPrefix)
    if(storedPollenRegions) return of (storedPollenRegions)
    return this.http.get<PaginatedDataRegion>(UrlBuilder.create(
      environment.pollenrapporten.url,
      environment.pollenrapporten.endpoints.regions
    ).build()).pipe(
        map(data => {
          this.storage.setSessionItem<PaginatedDataRegion>(environment.storage.pollenRegionPrefix, data)
          return data
        })
      )
  }



}

