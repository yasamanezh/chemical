import {HttpException, Injectable} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';

import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(
        private readonly UserService: UserService,
        private readonly JwtService: JwtService) {
    }

    async register(registerDto: RegisterDto) {

        const user = await this.UserService.findByEmail(registerDto.email)

        registerDto.password = await bcrypt.hash(registerDto.password, 10)

        if (user)
            throw  new HttpException('user found!', 400);

        return await this.UserService.create(registerDto);

    }


    async login(loginDto: LoginDto) {
        const user = await this.UserService.findByEmail(loginDto.email)

        if (!user)
            throw  new HttpException('user not found!', 404);

        const passwordMatch = await bcrypt.compare(loginDto.password, user.password)

        if (!passwordMatch)

            throw  new HttpException('password not match!', 400);

        const accessToken = this.JwtService.sign({
            sub: user.id,
            email: user.email
        })

      return {
        accessToken
      }


    }


}
