import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';

@Module({
  controllers: [],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
