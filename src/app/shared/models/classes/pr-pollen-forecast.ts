import { PollenLevels, PollenForecast } from "../interfaces/pollen-forecast";
import { PaginatedDataForecastPR } from "../pollenrapporten/schemas/paginated-data-forecast";
import { PaginatedDataPollenType } from "../pollenrapporten/schemas/paginated-data-pollen-type";

export class PRPollenForecast implements PollenForecast {
  pageSize?: number | undefined;
  totalPages: number;
  currentPage: number;
  totalResults: number;
  forecastPeriods


  constructor(raw: PaginatedDataForecastPR, pollenIdMap: PaginatedDataPollenType | undefined) {
    this.pageSize = raw._meta.limit
    this.totalPages = this.calculateTotalPages(raw._meta.totalRecords, raw._meta.limit)
    this.currentPage = this.calculateCurrentPage(raw._meta.offset, raw._meta.limit)
    this.totalResults = raw._meta.totalRecords
    this.forecastPeriods = this.mapData(raw, pollenIdMap)
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

  private mapData(raw: PaginatedDataForecastPR, pollenMap: PaginatedDataPollenType | undefined): PollenForecast["forecastPeriods"] {
    type ForecastPeriod = PollenForecast["forecastPeriods"][0]
    const forecastPeriods: ForecastPeriod[] = raw.items.map(i => {
      const dailyLevels: PollenLevels[] = i.levelSeries.map(l => {
        return {
          level: l.level,
          time: l.time,
          id: l.pollenId ?? "",
          name: pollenMap?.items.find(elem => elem.id === l.pollenId)?.name ?? ""
        }
      })

      const dailyForecasts: Partial<Record<string, PollenLevels[]>> = Object.groupBy(dailyLevels, ({ time }) => time)
      console.log(dailyForecasts)

      const period: ForecastPeriod = {
        id: i.id || "",
        regionId: i.regionid || "",
        startDate: i.startDate,
        endDate: i.endDate,
        generalDescription: i.text,
        dailyForecasts: Object.entries(dailyForecasts)
        .map(([k,v]) => {
          return {date: k, pollenLevels: v!.sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)}
        })
      }
      return period
    })
    return forecastPeriods
  }
}
