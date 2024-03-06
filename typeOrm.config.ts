import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { BookingSlotEntity } from 'src/booking-slot/entities/booking-slot.entity';
import { UserToBookingSlotEntity } from 'src/user-to-booking-slot/entity/user-to-booking-slot.ts';

config();
const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5674,
    username: 'user',
    password: 'postgres',
    database: 'postgres',
    logger: 'advanced-console',
    logging: 'all',
    synchronize: true,
    migrations: ['migrations/**'],
    entities: [UserEntity, BookingSlotEntity, UserToBookingSlotEntity]
})