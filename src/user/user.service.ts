import {HttpException, Injectable} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly UserRepository :Repository<User>) {}

  create(createUserDto: UserDto) {

    return  this.UserRepository.save(createUserDto);

   }

 async findAll() {
   return await this.UserRepository.find()
  }

  async findOne(id: number) {

    return await this.UserRepository.findOne({
      where : {id:id}
    })

  }
  findByEmail(email :string){

      const user =  this.UserRepository.findOne({  where : {email:email} })

      return user;

  }

    async  update(id: number, UserDto: UpdateUserDto) {

        const user =  await this.UserRepository.findOne({  where : {id:id} })

        if (! user)
            throw  new HttpException('the user not found',404);

       return await  this.UserRepository.update(id,UserDto);

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
