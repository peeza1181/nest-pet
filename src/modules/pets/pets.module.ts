import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePetHandler } from './commands/create/create-pet.handle';
import { GetAllPetsHandler } from './queries/get-all-pets.handler';
import { GetAllPetsPaginationHandler } from './queries/get-all-pets-pagination.handler';
import { GetAllPetsRawSqlHandler } from './queries/get-all-pets-raw-sql.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, CategoryEntity]), CqrsModule],
  controllers: [PetsController],
  providers: [
    CreatePetHandler,
    GetAllPetsHandler,
    GetAllPetsPaginationHandler,
    GetAllPetsRawSqlHandler,
  ],
})
export class PetsModule {}
