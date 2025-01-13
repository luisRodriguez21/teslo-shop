import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray, IsIn, IsInt, IsNumber, IsOptional,
  IsPositive, IsString, MinLength
} from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    default: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    default: 0,
    nullable: true,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    default: 'Product description',
    nullable: true,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    default: 'product-slug',
    nullable: true,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    default: 0,
    nullable: true,
    minimum: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    default: ['product', 'category'],
    nullable: false,
    minLength: 1,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    default: 'men',
    nullable: false,
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    default: ['tag1', 'tag2'],
    nullable: true,
    minLength: 1,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];


  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}

