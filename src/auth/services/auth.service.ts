import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from "src/user/dto";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async register(userDto: RegisterUserDto){
        try {
            const user = await this.userService.create(userDto);
            const token = await this._createToken(user);
            await this.userRepository.save({
                username: user.username,
                email: user.email,
                contact: user.contact,
                password: user.password,
                refreshToken: token.refreshToken,
            })
            return{
                email: user.email,
                ...token,
            }
        } catch (error) {
            return error;
        }
    }

    async login(loginUserDto: LoginUserDto){
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this._createToken(user);
        return {
            email: user.email,
            ...token,
        }
    }

    async handleVerifyToken(token){
        try{
            const payload = this.jwtService.verify(token);
            return payload['email'];
        }catch(e){
            throw new HttpException(
                {
                    key:'',
                    data: {},
                    statusCode: HttpStatus.UNAUTHORIZED,
                },
                HttpStatus.UNAUTHORIZED,
            )
        }
    }

    async validateUser(email){
        const user = await this.userService.findByEmail(email);
        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private async _createToken(
        { email },
        isSecondFactorAuthenticated = false,
        refresh = true
    ){
        const accessToken = this.jwtService.sign({
            email,
            isSecondFactorAuthenticated 
        });

        if(refresh){
            const refreshToken = this.jwtService.sign(
                { email },
                {
                    secret: process.env.RT_SECRET,
                    expiresIn: process.env.EXPIRESIN_REFRESH,
                }
            );
            await this.userService.update(
                { email: email },
                {
                    refreshToken: refreshToken
                }
            )
            return{
                expiresIn: process.env.EXPIRESIN,
                accessToken,
                refreshToken,
                expiresInRefresh: process.env.EXPIRESIN_REFRESH,
            }
        } else {
            return{
                expiresIn: process.env.EXPIRESIN,
                accessToken,
            }
        }
    }

    async refresh(refresh_token){
        try{
            const payload = await this.jwtService.verify(refresh_token, {
                secret: process.env.RT_SECRET,
            });
            const user = await this.userService.getUserByRefresh(
                refresh_token,
                payload.email
            );
            const token = await this._createToken(user, true, false);
            return{
                email: user.email,
                ...token,
            }
        } catch(e){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    async logout(userId: string){
        return this.userService.update(
            { id: userId},
            { refreshToken: null }
        )
    }
}