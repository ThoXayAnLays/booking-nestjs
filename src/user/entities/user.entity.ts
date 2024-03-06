import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { BookingSlotEntity } from "src/booking-slot/entities/booking-slot.entity";
import { UserToBookingSlotEntity } from "src/user-to-booking-slot/entity/user-to-booking-slot.ts";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column()
    refreshToken: string;

    @Column()
    @IsPhoneNumber()
    contact: string;

    @Column({type: 'enum', enum: ['Patient', 'Doctor'], default: 'Patient'})
    type: string;

    @OneToMany(() => BookingSlotEntity, bookingSlot => bookingSlot.user)
    bookingSlots: BookingSlotEntity[];

    @OneToMany(() => UserToBookingSlotEntity, userToBookingSlot => userToBookingSlot.user)
    userToBookingSot: UserToBookingSlotEntity[];
}