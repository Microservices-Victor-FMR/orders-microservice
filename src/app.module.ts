import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { envSchema } from 'env.config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      validationSchema: envSchema,
      isGlobal: true,
    }),
    OrdersModule,
  ],
})
export class AppModule {}
