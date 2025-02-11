import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCategoryQuery } from './get-all-category.query';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@QueryHandler(GetAllCategoryQuery)
export class GetAllCategoryHandler
  implements IQueryHandler<GetAllCategoryQuery>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetAllCategoryQuery): Promise<any> {
    const { limit, page } = query;

    const skip = (page - 1) * limit;

    const categories = await this.dataSource.query(
      `
      SELECT * 
      FROM category_entity
      ORDER BY ID
      LIMIT $1
      OFFSET $2
      `,
      [limit, skip],
    );

    const totalItems = await this.dataSource.query(
      `SELECT COUNT(*) FROM category_entity`,
    );

    const totalPages = Math.ceil(totalItems[0].count / limit);

    return {
      data: categories,
      totalItems: totalItems[0].count,
      totalPages,
      currentPage: page,
      limit,
    };
  }
}
