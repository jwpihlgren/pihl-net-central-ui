import { Paginated } from "./paginated";

export interface PollenForecast extends Paginated {
  forecastPeriods: {
    id: string
    regionId: string
    generalDescription: string
    startDate: string
    endDate: string
    dailyForecasts: { date: string, pollenLevels: PollenLevels[] }[]
  }[]
}


export interface PollenLevels {
  id: string
  name: string
  level: number
  time: string
}
