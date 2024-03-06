import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('AT_SECRET'),
                signOptions: {
                expiresIn: configService.get('EXPIRESIN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule{}