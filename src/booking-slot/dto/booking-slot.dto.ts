import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class CreateBookingSlotDto {
    @ApiProperty()
    @IsDateString()
    start_time: Date;

    @ApiProperty()
    @IsDateString()
    end_time: Date;

    @ApiProperty()
    @IsNotEmpty({ message:"User is required" })
    user: string;
}

export class UpdateBookingSlotDto {
    @ApiProperty()
    @IsDateString()
    start_time: Date;

    @ApiProperty()
    @IsDateString()
    end_time: Date;
    
    @ApiProperty()
    @IsBoolean()
    isBooked: boolean;

    @ApiProperty()
    @IsNotEmpty({ message:"User is required" })
    user: string;
}