import { PaginationParamsDto } from '@app/common/PaginationParamsDto';

export class PaginationResponse<T> {
  results: Array<T>;
  total: number;
  params: PaginationParamsDto;
}
