import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePetDto } from './dto/create-pet-dto';
import { CreatePetCommand } from './commands/create/create-pet.command';
import { GetAllPetsQuery } from './queries/get-all-pets/get-all-pets.query';
import { ApiQuery } from '@nestjs/swagger';
import { SoftDeletePetCommand } from './commands/delete/soft-delete-pet.command';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UpdatePetCommand } from './commands/update/update-pet.command';
import { PetEntity } from './entities/pet.entity';
import { FindPetsByIdQuery } from './queries/find-pets-by-id/find-pets-by-id.query';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    const { name, categoryId } = createPetDto;
    return this.commandBus.execute(new CreatePetCommand(name, categoryId));
  }

  @Get('all')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getAllPets(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ): Promise<PetEntity[]> {
    return this.queryBus.execute(new GetAllPetsQuery(page, limit));
  }

  @Get(':id')
  async getPetById(@Param('id') id: number): Promise<PetEntity> {
    return this.queryBus.execute(new FindPetsByIdQuery(id));
  }

  @Delete(':id')
  async softDeletePet(@Param('id') id: number) {
    return await this.commandBus.execute(new SoftDeletePetCommand(id));
  }

  @Patch(':id')
  async updatePet(
    @Param('id') id: number, 
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return await this.commandBus.execute(
      new UpdatePetCommand(id, updatePetDto),
    );
  }
}
