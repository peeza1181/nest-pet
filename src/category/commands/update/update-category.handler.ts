import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from './update-category.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<CategoryEntity> {
    const { id, updateCategoryDto } = command;

    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }
}
