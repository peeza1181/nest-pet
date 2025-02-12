import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPetsByIdQuery } from './find-pets-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from '../../entities/pet.entity';
import { Repository } from 'typeorm';

@QueryHandler(FindPetsByIdQuery)
export class FindPetsByIdHandler implements IQueryHandler<FindPetsByIdQuery> {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) {}

  async execute(query: FindPetsByIdQuery): Promise<any> {
    const { id } = query;

    const pet = await this.petRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new Error(`Pet with ID ${id} not found.`);
    }

    return pet;
  }
}
