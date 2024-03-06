import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { UserToBookingSlotEntity } from "../../user-to-booking-slot/entity/user-to-booking-slot.ts"

@Entity('booking-slots')
export class BookingSlotEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;

    @Column({default: false})
    isBooked: boolean;

    @ManyToOne(() => UserEntity, user => user.bookingSlots)
    user: UserEntity;

    @OneToMany(() => UserToBookingSlotEntity, userToBookingSlot => userToBookingSlot.bookingSlot)
    userToBookingSlot: UserToBookingSlotEntity[];
}