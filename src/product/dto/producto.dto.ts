import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductoDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
}
