import { HTTPValidationErrorPR } from "../schemas/httpvalidation-error";
import { PaginatedDataForecastPR } from "../schemas/paginated-data-forecast";

export type ForecastsResponse = PaginatedDataForecastPR | HTTPValidationErrorPR
