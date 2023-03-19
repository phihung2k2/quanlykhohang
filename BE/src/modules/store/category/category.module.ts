import { PrismaModule } from '@configs/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [PrismaModule]
})
export class CategoryModule {}
