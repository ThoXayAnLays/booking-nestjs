import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserEntity } from "src/user/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "src/user/user.module";

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
        UserModule,
    ],
    controllers: [AuthController,],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [AuthService, JwtModule]
})
export class AuthModule{}