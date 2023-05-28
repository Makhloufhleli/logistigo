import { PaginationParamsDto } from '@app/shared/dto/common.pagination-params.dto';
import { PaginationResponseDto } from '@app/shared/dto/common.pagination-response.dto';
export const BASE_SERVICE = Symbol('BASE_SERVICE');
export interface IBaseService<T> {
  paginate(params: PaginationParamsDto): Promise<PaginationResponseDto<T>>;
}
