import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPetsPaginationQuery } from './get-all-pets-pagination.query';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from '../entities/pet.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetAllPetsPaginationQuery)
export class GetAllPetsPaginationHandler
  implements IQueryHandler<GetAllPetsPaginationQuery>
{
  constructor(
    @InjectRepository(PetEntity)
    private readonly petEntityRepository: Repository<PetEntity>,
  ) {}

  async execute(query: GetAllPetsPaginationQuery): Promise<any> {
    const { page, limit } = query;

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Fetch paginated pets with their total count
    const [data, totalCount] = await this.petEntityRepository.findAndCount({
      relations: ['category'], // Load related category

      skip: offset,
      take: limit,
    });

    return {
      totalCount, //Total number of pets
      currentPage: page, //Current page number
      totalPages: Math.ceil(totalCount / limit), // Total pages
      data, //Array of pets for the current page
    };
  }
}
