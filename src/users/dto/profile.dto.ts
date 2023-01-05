import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompleteProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  country?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address?: string;
}
