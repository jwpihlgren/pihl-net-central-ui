import { PaginationLinkPR } from "./pagination-link"
import { PaginationMetaPR } from "./pagination-meta"
import { PollenCountPR } from "./pollen-count"

export interface PaginatedDataPollenCount {
  _meta: PaginationMetaPR
  _links: PaginationLinkPR[]
  items: PollenCountPR[]


}
