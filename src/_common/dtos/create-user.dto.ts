import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @Matches(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[가-힣]/)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(80)
  @Min(19)
  age: number;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export { CreateUserDto };
