import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID (UUID)' })
  id!: string;

  @ApiProperty({ description: 'User email address' })
  email!: string;

  @ApiPropertyOptional({ description: 'Username (unique)' })
  username?: string | null;

  @ApiPropertyOptional({ description: 'Full name' })
  full_name?: string | null;

  @ApiPropertyOptional({ description: 'Avatar URL from Insforge Storage' })
  avatar_url?: string | null;

  @ApiPropertyOptional({ description: 'User age' })
  age?: number | null;

  @ApiProperty({ description: 'Whether onboarding is complete' })
  onboarding_complete!: boolean;

  @ApiProperty({ description: 'Current onboarding step' })
  onboarding_step!: string;

  @ApiProperty({ description: 'Account creation timestamp' })
  created_at!: Date;
}
