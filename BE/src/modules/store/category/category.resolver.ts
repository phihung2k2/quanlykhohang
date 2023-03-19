import { Roles } from './../../auth/role/roles.decorator';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { RolesGuard } from './../../auth/guard/role.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from './../../auth/status/public.decorator';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
   
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  @Public()
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
   
  ) {
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(RolesGuard)
  @Roles(RoleE.Admin)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
