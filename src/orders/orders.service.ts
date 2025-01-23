import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { console } from 'inspector';


@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService,@Inject('NATS_SERVICE') private readonly client:ClientProxy) {}


  async create(createOrderDto: CreateOrderDto) {
    
    const newOrder = await this.prisma.order.create({ data: createOrderDto });
    return newOrder;
  }


  async findAll(limit: number, cursor: string) {
    const register = await this.prisma.order.count();

    const queryOptions: any = {
      take: limit,
      where: { status: { not: 'CANCELLED' } },
      orderBy: { createdAt: 'desc' },
    };

    if (cursor) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1;
    }
    const findAll = await this.prisma.order.findMany(queryOptions);

    const nextCursor =
      findAll.length > 0 ? findAll[findAll.length - 1].id : null;

    return {
      data: findAll,
      nextCursor,
      total: register,
    };
  }

  async findOneById(id: string) {
    const findOneById = await this.prisma.order.findUnique({ where: { id: id } });
    if (!findOneById) {
      throw new RpcException({ message: `Order not found ${id}`,statusCode: HttpStatus.NOT_FOUND,microservice: 'Orders',});
    }
   
    return findOneById;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOneById(id);

    const updateOrder = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });

    return { message: 'Order updated successfully', data: updateOrder };
  }

  async removeOrder(id: string) {
    const findDelete = await this.findOneById(id);

    if (findDelete.status === 'CANCELLED') {
      throw new RpcException({
        message: 'Esta orden ya fue cancelada',
        statusCode: HttpStatus.GONE,
        microservice: 'Orders',
      });
    }
    const removeOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
    return { message: 'Order cancelled successfully', data: removeOrder };
  }
}
