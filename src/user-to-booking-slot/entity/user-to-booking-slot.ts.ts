import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { BookingSlotEntity } from "src/booking-slot/entities/booking-slot.entity";

@Entity('making-appointments')
export class UserToBookingSlotEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    request_time: Date;

    @Column({type: 'enum', enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'})
    status: string;

    @ManyToOne(() => UserEntity, user => user.userToBookingSot)
    user: UserEntity;

    @ManyToOne(() => BookingSlotEntity, bookingSlot => bookingSlot.userToBookingSlot)
    bookingSlot: BookingSlotEntity;
}