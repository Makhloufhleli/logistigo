import { IBaseRepository } from '@app/shared/base.repository.interface';
import { IBaseService } from '@app/shared/base.service.interface';
import { PaginationParamsDto } from '@app/shared/dto/common.pagination-params.dto';
import { PaginationResponseDto } from '@app/shared/dto/common.pagination-response.dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BaseService<T> implements IBaseService<T> {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  constructor(protected readonly repository: IBaseRepository<T>) {}

  async paginate(params: PaginationParamsDto): Promise<PaginationResponseDto<T>> {
    try {
      return await this.repository.paginate(params);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
