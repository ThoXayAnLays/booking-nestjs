import { Controller, Get, Post, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Public } from "../../auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { FilterUserDto } from "../dto";
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UserController{
    constructor(private userService: UserService){}

    @Public()
    @Roles('Doctor')
    @ApiQuery({ name: 'item_per_page'})
    @ApiQuery({ name: 'search'})
    @Get()
    async getAllUsers(@Query() query: FilterUserDto): Promise<UserEntity[]>{
        try {
            return await this.userService.getAllUsers(query);
        } catch (error) {
            return error;
        }
    }

    @Public()
    @Get(':id')
    async getUserById(@Req() req:any): Promise<UserEntity>{
        try {
            return await this.userService.getUserById(req.user);
        } catch (error) {
            return error;
        }
    }
}