import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsEnum(['INCOME', 'EXPENSE'])
  type!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  date?: string;
}
