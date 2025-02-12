import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPetsQuery } from './get-all-pets.query';
import { DataSource } from 'typeorm';

@QueryHandler(GetAllPetsQuery)
export class GetAllPetsHandler implements IQueryHandler<GetAllPetsQuery> {
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetAllPetsQuery): Promise<any> {
    const { limit, page } = query;

    const skip = (page - 1) * limit;

    const pets = await this.dataSource.query(
      `
            SELECT *
            FROM pet_entity
            ORDER BY ID
            LIMIT $1
            OFFSET $2
            `,
      [limit, skip],
    );

    const totalItems = await this.dataSource.query(
      `SELECT COUNT(*) FROM pet_entity`,
    );

    const totalPages = Math.ceil(totalItems[0].count / limit);

    return {
      data: pets,
      totalItems: totalItems[0].count,
      totalPages,
      currentPage: page,
      limit,
    };
  }
}
