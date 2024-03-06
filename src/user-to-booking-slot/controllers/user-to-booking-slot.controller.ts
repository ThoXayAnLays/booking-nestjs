import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserToBookingSlotService } from "../services/user-to-booking-slot.service";
import { Public } from "src/auth/decorators/public.decorator";
import { CreateUserToBookingSlotDto, UpdateUserToBookingSlotDto, FilterUserToBookingSlotDto } from "../dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserToBookingSlotEntity } from "../entity/user-to-booking-slot.ts";

@ApiTags('UserToBookingSlots')
@Controller('api/user-to-booking-slot')
export class UserToBookingSlotController {
    constructor(private readonly userToBookingSlotService: UserToBookingSlotService) { }

    @Public()
    @ApiQuery({ name: 'page'})
    @ApiQuery({ name: 'item_per_page'})
    @ApiQuery({ name: 'search'})
    @Get()
    async getAll(@Query() query: FilterUserToBookingSlotDto): Promise<any> {
        return this.userToBookingSlotService.getAll(query);
    }

    @Public()
    @Get(':id')
    async getById(@Param('id') id: string): Promise<any> {
        return this.userToBookingSlotService.getById(id);
    }

    @Public()
    @Roles('Patient')
    @Post()
    async create(@Body() data: Partial<CreateUserToBookingSlotDto>): Promise<UserToBookingSlotEntity>{
        return this.userToBookingSlotService.create(data);
    }

    @Public()
    @Roles('Doctor')
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<UpdateUserToBookingSlotDto>): Promise<UserToBookingSlotEntity>{
        return this.userToBookingSlotService.update(id, data);
    }

    @Public()
    @Roles('Doctor')
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>{
        return await this.userToBookingSlotService.delete(id);
    }
}