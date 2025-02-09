import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPetsRawSqlQuery } from './get-all-pets-raw-sql.query';
import { DataSource } from 'typeorm';
import { PetEntity } from '../pet.entity';

@QueryHandler(GetAllPetsRawSqlQuery)
export class GetAllPetsRawSqlHandler
  implements IQueryHandler<GetAllPetsRawSqlQuery>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(_query: GetAllPetsRawSqlQuery): Promise<PetEntity[]> {
    const sqlQuery = `SELECT * FROM pet_entity`;

    return await this.dataSource.query(sqlQuery);
  }
}
