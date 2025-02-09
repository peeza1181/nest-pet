import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePetHandler } from './commands/create-pet.handle';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, CategoryEntity]), CqrsModule],
  controllers: [PetsController],
  providers: [CreatePetHandler],
})
export class PetsModule {}
