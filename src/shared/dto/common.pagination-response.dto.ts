export class PaginationResponseDto<T> {
  results: Array<T>;
  total: number;
  totalPerPage: number;
  nextPage: number | null;
  previousPage: number | null;
  lastPage: number | null;
}
