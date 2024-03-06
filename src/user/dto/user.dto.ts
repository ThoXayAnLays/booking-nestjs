import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto{
    @IsNotEmpty({ message: 'Username is required' })
    @ApiProperty()
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty()
    password: string;
}

export class LoginUserDto{
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty()
    password: string;
}