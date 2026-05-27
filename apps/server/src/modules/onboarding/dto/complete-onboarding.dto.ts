import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  MaxLength,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CompleteOnboardingDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  @MaxLength(100, { message: 'Full name must be at most 100 characters' })
  full_name!: string;

  @ApiProperty({
    description: 'Unique username (lowercase, alphanumeric, underscore)',
    example: 'john_doe',
    pattern: '^[a-z0-9_]{3,30}$',
  })
  @IsString()
  @Matches(/^[a-z0-9_]{3,30}$/, {
    message:
      'Username must be 3-30 characters, lowercase alphanumeric and underscores only',
  })
  username!: string;

  @ApiProperty({
    description: 'User age (minimum 13)',
    example: 25,
    minimum: 13,
    maximum: 120,
  })
  @IsInt({ message: 'Age must be an integer' })
  @Min(13, { message: 'You must be at least 13 years old' })
  @Max(120, { message: 'Age must be at most 120' })
  age!: number;

  @ApiPropertyOptional({
    description: 'Reason for using the platform',
    example: 'I want to manage my finances better',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Reason must be at most 500 characters' })
  reason_using?: string;
}
