import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePetCommand } from './create-pet.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from '../pet.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@CommandHandler(CreatePetCommand)
export class CreatePetHandler implements ICommandHandler<CreatePetCommand> {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petEntityRepository: Repository<PetEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryEntityRepository: Repository<CategoryEntity>,
  ) {}

  async execute(command: CreatePetCommand): Promise<PetEntity> {
    const { name, categoryId } = command;

    const category = await this.categoryEntityRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error(`Category with id ${category} nont found`);
    }

    const pet = this.petEntityRepository.create({ name, category });

    return this.petEntityRepository.save(pet);
  }
}
