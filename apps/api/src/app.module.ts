import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { MenuModule } from './menu/menu.module'; // ⭐ IMPORTANT

// ⭐ IMPORTANT: import your new module
import { RestaurantModule } from './restaurant/restaurant.module';

import { OrderModule } from './order/order.module'; // ⭐

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ⭐ IMPORTANT: register Restaurant module here
    RestaurantModule,
    MenuModule,
    OrderModule,
  ],
  controllers: [HealthController],
  providers: [],

  
})
export class AppModule {}

//    TypeOrmModule.forRootAsync({
//      inject: [ConfigService],
//      useFactory: (configService: ConfigService) => ({
//        type: 'postgres',
//        url: configService.get<string>('DATABASE_URL'),
//        autoLoadEntities: true,
//        synchronize: true, // ✅ OK for dev only
//      }),
//    }),
