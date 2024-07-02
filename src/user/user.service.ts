import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user/user.schema';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async findOne(name: string): Promise<User | undefined> {
    console.log('findOne', name);

    return this.userModel.findOne((user) => user.name === name).exec();
  }
}
