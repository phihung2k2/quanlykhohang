import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './../../auth/guard/role.guard';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { Roles } from './../../auth/role/roles.decorator';
import { Public } from './../../auth/status/public.decorator';
import { ListProductResponse } from './dto/list-product.response';
import { QueryListProductInput } from './dto/query-list-product.input';
import { PaginateInput } from './../../../common/meta-list/meta-list.response';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => ListProductResponse, { name: 'products' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListProductInput', { nullable: true })
    queryListProductInput?: QueryListProductInput,
  ) {
    return this.productService.findAll(paginateInput, queryListProductInput);
  }

  @Query(() => Product, { name: 'product' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
