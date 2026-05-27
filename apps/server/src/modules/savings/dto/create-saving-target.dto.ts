import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateSavingTargetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(1)
  target_amount!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  current_amount?: number;

  @IsString()
  @IsOptional()
  deadline?: string;
}
