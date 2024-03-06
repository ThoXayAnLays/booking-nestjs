import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserToBookingSlotEntity } from "./entity/user-to-booking-slot.ts";
import { UserToBookingSlotService } from "./services/user-to-booking-slot.service.js";
import { UserToBookingSlotController } from "./controllers/user-to-booking-slot.controller.js";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserToBookingSlotEntity])
    ],
    providers: [UserToBookingSlotService],
    controllers: [UserToBookingSlotController],
    exports: [UserToBookingSlotService]
})
export class UserToBookingSlotModule {}