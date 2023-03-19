import { PrismaService } from '@configs/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createCategoryInput: CreateCategoryInput) {
    return await this.prisma.category.create({ data: createCategoryInput });
  }

  async findAll() {
    const results = await this.prisma.category.findMany();
    return results;
  }

  async findOne(id: number) {
    const result = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException('Category have id ' + id + ' not found');
    }

    return result;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    await this.findOne(id);

    try {
      const result = await this.prisma.category.update({
        where: { id },
        data: { ...updateCategoryInput },
      });

      return result;
    } catch (error) {
      throw new ForbiddenException('Cannot update');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      const result = await this.prisma.category.delete({ where: { id } });
      return result;
    } catch (error) {
      throw new ForbiddenException('Cannot delete');
    }
  }
}
