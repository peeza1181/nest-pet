import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SoftDeletePetCommand } from './soft-delete-pet.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from '../../entities/pet.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from 'src/libs/enums/status.enum';

@CommandHandler(SoftDeletePetCommand)
export class SoftDeletePetHandler
  implements ICommandHandler<SoftDeletePetCommand>
{
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) {}

  async execute(command: SoftDeletePetCommand): Promise<string> {
    const { id } = command;

    const pet = await this.petRepository.findOne({ where: { id } });

    if (!pet) {
      throw new Error(`Pet with ID ${id} not found.`);
    }

    await this.petRepository
      .createQueryBuilder()
      .update('pet_entity')
      .set({
        status: StatusEnum.DELETED,
        deletedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('id = :id', { id })
      .andWhere('status = :status', { status: StatusEnum.ACTIVE })
      .execute();

    //   .createQueryBuilder()
    //   .softDelete()
    //   .where('id = :id', { id })
    //   .execute();

    return `Pet with ID ${id} has been soft-deleted.`;
  }
}
