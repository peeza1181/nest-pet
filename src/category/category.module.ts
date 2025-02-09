import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoryHandler } from './commands/create-category.handler';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), CqrsModule],
  providers: [CreateCategoryHandler],
  controllers: [CategoriesController],
})
export class CategoryModule {}
