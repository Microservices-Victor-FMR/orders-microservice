import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma.module';
import { NatsModule } from 'src/transports/nats.module';


@Module({
  imports: [PrismaModule,NatsModule],
  controllers: [OrdersController],
  providers: [OrdersService,],
 
})
export class OrdersModule {}
