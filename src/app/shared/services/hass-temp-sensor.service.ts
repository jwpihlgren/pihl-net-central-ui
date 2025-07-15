import { inject, Injectable } from '@angular/core';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HassTempSensorService {
  protected http = inject(HttpClient)
  constructor() { }
  private forecastResource() {
    return rxResource<any, unknown>({
      stream: () => {
        type OptionalParams = any
        const url = UrlBuilder.create<OptionalParams>(
          environment.vercel.uri,
          environment.vercel.endpoints.sensors)

        return this.http.get<any>(url.buildWithQueryParams()).pipe(
          map(data => {
            return data
          }))
      }
    }
    )
  }
}
