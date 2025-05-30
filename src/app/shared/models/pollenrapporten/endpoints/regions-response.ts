import { HTTPValidationErrorPR } from "../schemas/httpvalidation-error";
import { PaginatedDataRegion } from "../schemas/paginated-data-region";

export type RegionsResponse = PaginatedDataRegion | HTTPValidationErrorPR
