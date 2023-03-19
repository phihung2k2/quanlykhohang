import { NotFoundException } from '@nestjs/common/exceptions';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { Product } from './entities/product.entity';
import { filterDateFunc, filterByContainsFunc } from 'src/utils/filter';
import { QueryListProductInput } from './dto/query-list-product.input';
import { PaginateInput } from '@common/meta-list';
import { PrismaService } from '@configs/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    // data
    const data = {
      ...createProductInput,
    };

    return this.prisma.product.create({
      data,
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListProductInput?: QueryListProductInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });

    // order by create at
    const orderCreatedAt = paginateInput.createAt;

    // filter by name
    const name = filterByContainsFunc(queryListProductInput.name);

    // filter by categoryId
    const categoryId = queryListProductInput.categoryId;

    // filter by date create at
    const filterDateFunProps = {
      startDate: queryListProductInput.startDate,
      endDate: queryListProductInput.endDate,
    };

    const createdAt = filterDateFunc(filterDateFunProps);

    const results = await paginate<Product, Prisma.ProductFindManyArgs>(
      this.prisma.product,
      {
        where: {
          AND: [{ name }, { createdAt }],
        },
        orderBy: [
          {
            createdAt: orderCreatedAt || 'desc',
          },
        ],
        include: {
          category: true,
        },
      },
    );

    return results;
  }

  async findOne(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!result) {
      throw new NotFoundException('Product have id ' + id + ' not found');
    }

    return result;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    await this.findOne(id);

    try {
      const updatedproduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductInput,
        },
        include: {
          category: true,
        },
      });

      return updatedproduct;
    } catch (error) {
      throw new ForbiddenException('Cannot update');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id },
      });
      return deletedProduct;
    } catch (error) {
      throw new NotFoundException('Cannot delete');
    }
  }
}
