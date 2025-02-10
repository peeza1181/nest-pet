import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoryHandler } from './commands/create/create-category.handler';
import { CategoryController } from './category.controller';
import { GetAllCategoryHandler } from './queries/get-all-category-handler';
import { UpdateCategoryHandler } from './commands/update/update-category.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), CqrsModule],
  providers: [
    CreateCategoryHandler,
    GetAllCategoryHandler,
    UpdateCategoryHandler,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
