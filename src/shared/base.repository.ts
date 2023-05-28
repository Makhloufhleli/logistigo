import { IBaseRepository } from '@app/shared/base.repository.interface';
import { PaginationParamsDto } from '@app/shared/dto/common.pagination-params.dto';
import { PaginationResponseDto } from '@app/shared/dto/common.pagination-response.dto';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class BaseRepository<T> extends Repository<T> implements IBaseRepository<T> {
  protected readonly logger: Logger = new Logger(this.constructor.name);
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }
  async paginate(params: PaginationParamsDto): Promise<PaginationResponseDto<T>> {
    try {
      const [results, total] = await this.createQueryBuilder('entity')
        .orderBy(params.orderBy ? `entity.${params.orderBy}` : 'id', params.order)
        .skip((params.page - 1) * params.itemsPerPage)
        .take(params.itemsPerPage)
        .getManyAndCount();
      const lastPage = Math.ceil(total / params.itemsPerPage);
      const nextPage = params.page + 1 > lastPage ? null : params.page + 1;
      const previousPage = params.page - 1 < 1 ? null : params.page - 1;
      return {
        results,
        total,
        totalPerPage: results.length,
        nextPage,
        previousPage,
        lastPage,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
