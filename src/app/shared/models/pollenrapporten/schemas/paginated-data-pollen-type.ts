import { PaginationLinkPR } from "./pagination-link";
import { PaginationMetaPR } from "./pagination-meta";
import { PollenTypePR } from "./pollen-type";

export interface PaginatedDataPollenType {
  _meta: PaginationMetaPR
  _links: PaginationLinkPR[]
  items: PollenTypePR[]
}
