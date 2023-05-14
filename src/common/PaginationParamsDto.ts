import { PaginationOrder } from '@app/enums/PaginationOrder';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationParamsDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page!: number;

  @ApiProperty({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(10)
  @IsInt()
  itemsPerPage!: number;

  @ApiPropertyOptional({ enum: PaginationOrder, default: PaginationOrder.ASC })
  @IsEnum(PaginationOrder)
  @IsOptional()
  order!: PaginationOrder;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderBy!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keyword!: string;
}
