import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderItemsService {

  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
       
     const newOrderItem = await this.prisma.order_items.create({
      data: {
        order_id: createOrderItemDto.order_id,
        product_id: createOrderItemDto.product_id,
        quantity: createOrderItemDto.quantity,
        price: createOrderItemDto.price
      }
    })


    return newOrderItem;


  }

  findAll() {
    return `This action returns all orderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
