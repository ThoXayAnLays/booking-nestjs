import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateUserToBookingSlotDto {
    @ApiProperty()
    @IsDate()
    request_time: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'User is required' })
    user: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Booking Slot is required' })
    bookingSlot: string;
}

export class UpdateUserToBookingSlotDto {
    @ApiProperty()
    @IsDate()
    request_time: Date;

    @ApiProperty({description: 'Pending, Approved, Rejected'})
    status: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'User is required' })
    user: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Booking Slot is required' })
    bookingSlot: string;
}