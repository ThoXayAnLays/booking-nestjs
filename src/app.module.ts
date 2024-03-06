import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UserEntity } from './user/entities/user.entity';
import { BookingSlotEntity } from './booking-slot/entities/booking-slot.entity';
import { UserToBookingSlotEntity } from './user-to-booking-slot/entity/user-to-booking-slot.ts';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { BookingSlotModule } from './booking-slot/booking-slot.module';
import { UserToBookingSlotModule } from './user-to-booking-slot/user-to-booking-slot.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookingSlotModule,
    UserToBookingSlotModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, BookingSlotEntity, UserToBookingSlotEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5674,
      username: 'user',
      password: 'postgres',
      database: 'postgres',
      entities: [UserEntity, BookingSlotEntity, UserToBookingSlotEntity],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
