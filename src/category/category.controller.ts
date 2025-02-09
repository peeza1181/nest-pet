import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './commands/create-category.command';
import { CreateCategoryDto } from './dto/create-category-dto';
import { GetAllCategoryQuery } from './queries/get-all-category.query';

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
}
