import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { UpdatePetCommand } from './update-pet.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from '../../entities/pet.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdatePetCommand)
export class UpdatePetHandler implements IQueryHandler<UpdatePetCommand> {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) {}

  async execute(command: UpdatePetCommand): Promise<any> {
    const { id, updatePetDto } = command;

    const pet = await this.petRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new Error(`Pet with ID ${id} not found.`);
    }

    await this.petRepository
      .createQueryBuilder()
      .update(PetEntity)
      .set(updatePetDto)
      .where('id = :id', { id })
      .execute();

    const updatePet = await this.petRepository.findOne({ where: { id } });
    if (!updatePet) {
      throw new Error(`Failed to update Pet with ID ${id}.`);
    }

    return updatePet;
  }
}
