import { Body, Post, Controller, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { LoginUserDto, RegisterUserDto } from "src/user/dto";
import { Public } from '../decorators/public.decorator';


@ApiTags('Auth')
@Controller('api/auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    @ApiResponse({ status: 200, description: 'Register successfully!' })
    @ApiResponse({ status: 401, description: 'Register fail!' })
    @Public()
    async register(@Body() registerUserDto: RegisterUserDto): Promise<any>{
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Login successfully!' })
    @ApiResponse({ status: 401, description: 'Login fail!' })
    @UsePipes(ValidationPipe)
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authService.login(loginUserDto);
    }

    @Post('refresh')
    @Public()
    @ApiResponse({status:201, description:'Get Refresh Token successfully!'})
    @ApiResponse({status:401, description:'Get Refresh Token fail!'})
    async refresh(@Body() body) {
        return await this.authService.refresh(body.refresh_token);
    }

    @Post('logout')
    @Public()
    @ApiResponse({status:200, description:'Logout successfully!'})
    @ApiResponse({status:401, description:'Logout fail!'})
    async logout(@Req() req: any) {
        await this.authService.logout(req.user);
        return {
            statusCode: 200,
        };
    }
}