import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryByIdQuery } from './find-category-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@QueryHandler(FindCategoryByIdQuery)
export class FindCategoryByIdHandler
  implements IQueryHandler<FindCategoryByIdQuery>
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(query: FindCategoryByIdQuery): Promise<CategoryEntity> {
    const { id } = query;

    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['pets'],
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    return category;
  }
}
