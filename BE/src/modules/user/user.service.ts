import { CreateUserInput } from './dto/create-user.input';
import { NotFoundException, Injectable, HttpStatus } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { createPaginator } from 'prisma-pagination';
import { Prisma, User } from '@prisma/client';
import { PaginateInput } from '@common/meta-list';
import { GraphQLError } from 'graphql';
import { QueryListUserInput } from './dto/query-list-user.input';
import { filterDateFunc } from 'src/utils/filter';
import { PrismaService } from '@configs/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { hashCode } from '../../libs/hash/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const users = await this.prisma.user.findMany({
      where: {
        email: createUserInput.email,
      },
    });
    if (users.length > 0) {
      throw new ForbiddenException(
        'Email has been created, please choose another email',
      );
    }

    const { password, firstname, lastname, email, ...tData } = createUserInput;
    const hashedPassword = await hashCode().hash(password);
    const data = {
      firstname,
      lastname,
      email,
      hashedPassword,
    };
    const createdUser = await this.prisma.user.create({ data });
    return createdUser;
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListUserInput?: QueryListUserInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });

    // order by create at
    const orderCreatedAt = paginateInput.createAt;

    // filter by date create at

    const filterDateFunProps = {
      startDate: queryListUserInput.startDate,
      endDate: queryListUserInput.endDate,
    };

    const createdAt = filterDateFunc(filterDateFunProps);

    const result = await paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        where: {
          AND: [, { createdAt }],
        },
        orderBy: {
          createdAt: orderCreatedAt,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User have id ' + id + ' not found');
    } else {
      return user;
    }
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
    userPassword?: string,
    newPassword?: string,
    confirmPassword?: string,
  ) {
    try {
      const { password, ...dataUpdate } = updateUserInput;

      if (password) {
        if (newPassword !== confirmPassword) {
          throw new ForbiddenException('Confirm password is not match');
        }

        const isPasswordMatch = await hashCode().verifyCode(
          userPassword,
          password,
        );

        if (!isPasswordMatch) {
          throw new ForbiddenException('Wrong password');
        }

        if (password === newPassword) {
          throw new ForbiddenException(
            'Old password can not be same with new password',
          );
        }

        const hashedPassword = await hashCode().hash(newPassword);

        const updatedUser = await this.prisma.user.update({
          where: { id },
          data: { ...dataUpdate, hashedPassword },
        });
        return updatedUser;
      } else {
        await this.findOne(id);

        const updatedUser = await this.prisma.user.update({
          where: { id },
          data: { ...dataUpdate },
        });
        return updatedUser;
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      console.log(deletedUser);

      return deletedUser;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Do not delete user have id ' + id, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }
  }
}
