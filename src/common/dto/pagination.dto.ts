import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { off } from "process";

export class PaginationDto {

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;


  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}