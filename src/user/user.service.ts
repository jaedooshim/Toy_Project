import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../_common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../_common/dtos/create-user.dto';
import { IMessage } from '../_common/interfaces/message.interface';
import { UpdateUserDto } from '../_common/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  /*유저 등록*/
  async create(createUser: CreateUserDto): Promise<IMessage> {
    const existingUser = await this.userRepository.findOne({
      where: [{ name: createUser.name }],
    });
    if (existingUser) {
      throw new BadRequestException('등록된 유저입니다. 다시 한번 확인해주세요.');
    }
    await this.userRepository.save(createUser);
    return { message: '유저 등록이 완료되었습니다.' };
  }
  /*유저 전체조회*/
  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }
  /*유저 상세조회*/
  async findUser(userId: number): Promise<User> {
    const findUserData = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUserData) throw new BadRequestException('등록되지 않은 유저입니다.');
    return findUserData;
  }
  /*유저 정보 수정*/
  async update(id: number, updateUser: UpdateUserDto): Promise<IMessage> {
    const modifyUser = await this.userRepository.findOne({ where: { id } });
    if (!modifyUser) throw new HttpException('수정할 유저정보가 없습니다.', 404);
    /*유저 정보 수정하는 단계*/
    await this.userRepository.update({ id }, { email: updateUser.email, address: updateUser.address });
    return { message: '유저 정보가 수정되었습니다.' };
  }
  /*유저 정보 삭제*/
  async delete(id: number): Promise<IMessage> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) throw new HttpException('삭제할 유저의 정보가 없습니다.', 404);
    /*유저 정보 삭제하는 단계*/
    await this.userRepository.delete({ id });
    return { message: '유저를 삭제하였습니다.' };
  }
}
