import { IsNotEmpty, IsString } from 'class-validator';

export class EnrollUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
