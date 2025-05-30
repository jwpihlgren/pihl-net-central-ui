import { PaginationLinkPR } from "./pagination-link";
import { PaginationMetaPR } from "./pagination-meta";
import { PollenLevelDefinitionPR } from "./pollen-level-definition";

export interface PaginatedDataPollenLevelDefinition {
  _meta: PaginationMetaPR
  _links: PaginationLinkPR[]
  items: PollenLevelDefinitionPR[]
}
