import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../_common/dtos/create-user.dto';
import { IMessage } from '../_common/interfaces/message.interface';
import { User } from '../_common/entities/user.entity';
import { UpdateUserDto } from '../_common/dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /*유저 생성*/
  @Post()
  @HttpCode(201)
  async create(@Body() userData: CreateUserDto): Promise<IMessage> {
    return await this.userService.create(userData);
  }
  /*유저 전체조회*/
  @Get()
  @HttpCode(200)
  async find(): Promise<User[]> {
    return await this.userService.find();
  }
  /*유저 상세조회*/
  @Get(':id')
  @HttpCode(200)
  async findUser(@Param('id') userId: number): Promise<User> {
    return await this.userService.findUser(userId);
  }
  /*유저 정보수정*/
  @Put(':id')
  @HttpCode(201)
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto): Promise<IMessage> {
    return await this.userService.update(id, updateUser);
  }
  /*유저 정보 삭제*/
  @Delete(':id')
  @HttpCode(201)
  async delete(@Param('id') id: number): Promise<IMessage> {
    return await this.userService.delete(id);
  }
}
