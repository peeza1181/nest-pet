import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePetHandler } from './commands/create/create-pet.handle';
import { SoftDeletePetHandler } from './commands/delete/soft-delete-pet.handler';
import { UpdatePetHandler } from './commands/update/update-pet.handler';
import { GetAllPetsHandler } from './queries/get-all-pets/get-all-pets.handler';
import { FindPetsByIdHandler } from './queries/find-pets-by-id/find-pets-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, CategoryEntity]), CqrsModule],
  controllers: [PetsController],
  providers: [
    CreatePetHandler,
    SoftDeletePetHandler,
    UpdatePetHandler,
    GetAllPetsHandler,
    FindPetsByIdHandler,
  ],
})
export class PetsModule {}
