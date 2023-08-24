import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports:[
    JwtModule.register({
      secret : "secret",
      signOptions : {
        expiresIn : '30d'
      }

      }),
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,JwtStrategy],
})
export class AuthModule {}
