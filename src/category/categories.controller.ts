import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './commands/create-category.command';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto.name),
    );
  }
}
