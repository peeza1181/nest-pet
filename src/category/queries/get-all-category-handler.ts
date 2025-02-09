import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCategoryQuery } from './get-all-category.query';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetAllCategoryQuery)
export class GetAllCategoryHandler
  implements IQueryHandler<GetAllCategoryQuery>
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  execute(_query: GetAllCategoryQuery): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ relations: ['pets'] });
  }
}
