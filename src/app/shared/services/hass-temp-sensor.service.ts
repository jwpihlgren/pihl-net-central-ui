import { inject, Injectable, ResourceRef } from '@angular/core';
import { UrlBuilder } from '../utils/url-builder';
import { environment } from '../../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HassTempSensorService {
  protected http = inject(HttpClient)

  temperature: ResourceRef<number | undefined> = this.temperatureResource()

  constructor() { }


  private temperatureResource() {
    return rxResource<number, IHassTempSensorResponse[]>({
      stream: () => {
        type OptionalParams = {}
        const url = UrlBuilder.create<OptionalParams>(
          environment.vercel.uri,
          environment.vercel.endpoints.sensors)

        return this.http.get<IHassTempSensorResponse>(url.buildWithQueryParams()).pipe(
          map(data => {
            const sumTemperatures = data.sensors.reduce((acc, cur) => {
              return acc += cur.temperature
            }, 0)
            return sumTemperatures / data.sensors.length
          }),
          catchError((err) => {
            alert(err instanceof Error ? err.message : "Unhandled error, see log for more details")
            console.log(err)
            return EMPTY
          })
        )
      }
    }
    )
  }
}


interface IHassTempSensorResponse {
  sensors: {
    _id: string
    id: string
    __v: number,
    createdAt: Date,
    temperature: number
    updatedAt: Date
  }[]
}

