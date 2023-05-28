import { PaginationParamsDto } from '@app/shared/dto/common.pagination-params.dto';
import { PaginationResponseDto } from '@app/shared/dto/common.pagination-response.dto';

export const BASE_REPOSITORY = Symbol('BASE_REPOSITORY');
export interface IBaseRepository<T> {
  paginate(params: PaginationParamsDto): Promise<PaginationResponseDto<T>>;
}
