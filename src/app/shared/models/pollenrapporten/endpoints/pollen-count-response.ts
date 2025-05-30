import { HTTPValidationErrorPR } from "../schemas/httpvalidation-error";
import { PaginatedDataPollenCount } from "../schemas/paginated-data-pollen-count";

export type PollenCountResponse = PaginatedDataPollenCount | HTTPValidationErrorPR
