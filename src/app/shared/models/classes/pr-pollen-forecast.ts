import { PollenForecast } from "../interfaces/pollen-forecast";
import { PaginatedDataForecastPR } from "../pollenrapporten/schemas/paginated-data-forecast";

export class PRPollenForecast implements PollenForecast {
  pageSize?: number | undefined;
  totalPages: number;
  currentPage: number;
  totalResults: number;
  forecastPeriods


  constructor(raw: PaginatedDataForecastPR, pollenIdMap: Record<string, string>) {
    this.pageSize = raw._meta.limit
    this.totalPages = this.calculateCurrentPage(raw._meta.totalRecords, raw._meta.limit)
    this.currentPage = this.calculateCurrentPage(raw._meta.offset, raw._meta.limit)
    this.totalResults = raw._meta.totalRecords
    this.forecastPeriods = this.mapData(raw)
  }


  private calculateTotalPages(totalRecords: number, limit: number): number {
    if (totalRecords === 0) { return 0 }
    if (limit === 0) { return 0 }
    return Math.ceil(totalRecords / limit)
  }

  private calculateCurrentPage(offset: number, limit: number): number {
    if (offset === 0) { return 0 }
    if (limit === 0) { return 0 }
    return Math.floor(offset / limit)
  }

  private mapData(raw: PaginatedDataForecastPR, map: Record<string, string>): PollenForecast["forecastPeriods"] {
    const forecastPeriods: PollenForecast["forecastPeriods"] = raw.items.map(i => {
      const mappedLevelSeries = i.levelSeries.map(series => {
        const mappedSeries = {id: series.pollenId, name: map[series.pollenId ?? ""], level: series.level, time: series.time }
        return mappedSeries
      })
      const dailyForecasts = Object.groupBy(mappedLevelSeries, (ii) => ii.time)
      const period: PollenForecast["forecastPeriods"][0] =  {
        id: i.id || "",
        regionId: i.regionid || "",
        startDate: i.startDate,
        endDate: i.endDate,
        generalDescription: i.text,
        dailyForecasts: dailyForecasts || {} as PollenForecast["forecastPeriods"][0].dailyForecasts
      }
      return period
    })
    return forecastPeriods
  }
}
