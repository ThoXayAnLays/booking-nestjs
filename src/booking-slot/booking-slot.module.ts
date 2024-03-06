import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingSlotEntity } from "./entities/booking-slot.entity";
import { BookingSlotService } from "./serivces/booking-slot.service";
import { BookingSlotController } from "./controllers/booking-slot.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([BookingSlotEntity])
    ],
    providers: [BookingSlotService],
    controllers: [BookingSlotController],
    exports: [BookingSlotService]
})
export class BookingSlotModule {}