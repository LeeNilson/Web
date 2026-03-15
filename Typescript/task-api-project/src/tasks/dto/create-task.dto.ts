import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
