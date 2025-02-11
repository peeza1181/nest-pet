import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './commands/create/create-category.command';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetAllCategoryQuery } from './queries/get-all-category.query';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCategoryCommand } from './commands/update/update-category.command';
import { SoftDeleteCategoryCommand } from './commands/delete/soft-delete-category.command';
import { CategoryEntity } from './entities/category.entity';
import { FindCategoryByIdQuery } from './queries/find-category-by-id/find-category-by-id.query';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto.name),
    );
  }

  @Get()
  async getAllCategory() {
    return this.queryBus.execute(new GetAllCategoryQuery());
  }

  @Post(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.commandBus.execute(
      new UpdateCategoryCommand(id, updateCategoryDto),
    );
  }

  @Delete(':id')
  async softDelete(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new SoftDeleteCategoryCommand(id));
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.queryBus.execute(new FindCategoryByIdQuery(id));
  }
}
