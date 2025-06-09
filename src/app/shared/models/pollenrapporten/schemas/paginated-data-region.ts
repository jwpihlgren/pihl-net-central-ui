import { PaginationLinkPR } from "./pagination-link";
import { PaginationMetaPR } from "./pagination-meta";
import { RegionPR } from "./region";

export interface PaginatedDataRegion {
  _meta: PaginationMetaPR
  _links: PaginationLinkPR[]
  items: RegionPR[]

}
