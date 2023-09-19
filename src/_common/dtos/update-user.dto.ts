import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export { UpdateUserDto };
