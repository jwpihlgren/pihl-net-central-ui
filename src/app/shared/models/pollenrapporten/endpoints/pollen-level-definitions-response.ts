import { HTTPValidationErrorPR } from "../schemas/httpvalidation-error";
import { PaginatedDataPollenLevelDefinition } from "../schemas/paginated-data-pollen-level-definition";

export type PollenLevelDefinitionsResponse = PaginatedDataPollenLevelDefinition | HTTPValidationErrorPR
