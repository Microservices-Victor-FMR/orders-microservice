import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationOrderDto } from 'src/common/dto/pagination.dto';
import { FindOneByIdOrderDto } from './dto/findOneById-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
 async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    const result = await this.ordersService.create(createOrderDto)
    return result;
  }

  @MessagePattern('findAllOrders')
  async findAllOrders(@Payload() paginationOrderDto:PaginationOrderDto) {
    const result=await this.ordersService.findAll(paginationOrderDto.limit, paginationOrderDto.cursor);
    return result
  }

  @MessagePattern('FindOneOrder')
 async findOneByIdOrder(@Payload() param:FindOneByIdOrderDto) {
   
    const result = await this.ordersService.findOneById(param.id)
    return result
  }

  @MessagePattern('updateOrder')
  async updateOrder(@Payload() payload:{param:FindOneByIdOrderDto,updateOrderDto:UpdateOrderDto}) {
    const {param, updateOrderDto} = payload

  
    const result = await this.ordersService.updateOrder(param.id, updateOrderDto);
    return result  
  }

  @MessagePattern('removeOrder')
 async removeOrder(@Payload() payload: {param : FindOneByIdOrderDto}) {
    const {param} = payload

    const result = await this.ordersService.removeOrder(param.id);
    return result
  }
}
