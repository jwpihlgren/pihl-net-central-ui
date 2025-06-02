import { Paginated } from "./paginated";

export interface PollenForecast extends Paginated {
  forecastPeriods: {
    id: string
    regionId: string
    generalDescription: string
    startDate: string
    endDate: string
    dailyForecasts: Record<string, DailyForecast>
  }[]
}


interface DailyForecast {
  id: string
  name?: string
  level: number
  time: string
}
