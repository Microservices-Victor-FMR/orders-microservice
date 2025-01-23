import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdOrderDto{
  @IsNotEmpty()
  @IsUUID()
  id: string
}
