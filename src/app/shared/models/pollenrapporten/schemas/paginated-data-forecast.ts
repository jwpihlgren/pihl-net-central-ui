import { ForecastPR } from "./forecast";
import { PaginationLinkPR } from "./pagination-link";
import { PaginationMetaPR } from "./pagination-meta";

export interface PaginatedDataForecastPR {
  _meta: PaginationMetaPR
  _links: PaginationLinkPR[],
  items: ForecastPR[]
}
