import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async saveUser(
    userDto: UserDTO,
  ) {
    const { id, name, email, password, role} = userDto;
    
    const user = new User();
    user.id = id !== "null" ? id : null;
    user.name = name;
    user.email = email;
    user.role = role;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    return await user.save();
  }

  public async updateUser(
    userDto: UpdateUserDTO,
  ) {
    try {
      const { id, name, email, password, role } = userDto;

      const user = new User();
      user.id = id;
      user.name = name;
      user.email = email;
      user.role = role;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      return await user.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async insertMany(values) {
    await this.createQueryBuilder('user')
      .insert()
      .values(values)
      .execute();
  }

  public async findAll() {
    return this.find();
  }

  public async truncate() {
    await this.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.query('TRUNCATE TABLE user');
    await this.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}