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
import { CreatePetDto } from './create-pet-dto';
import { CreatePetCommand } from './commands/create/create-pet.command';
import { GetAllPetsQuery } from './queries/get-all-pets/get-all-pets.query';
import { GetAllPetsPaginationQuery } from './queries/get-all-pets-pagination.query';
import { GetAllPetsRawSqlQuery } from './queries/get-all-pets-raw-sql.query';
import { ApiQuery } from '@nestjs/swagger';
import { SoftDeletePetCommand } from './commands/delete/soft-delete-pet.command';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UpdatePetCommand } from './commands/update/update-pet.command';
import { PetEntity } from './entities/pet.entity';

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

  @Get('pagination')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getAllPetsPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(new GetAllPetsPaginationQuery(page, limit));
  }

  @Get('rawSql')
  async getAllPetsRawSql() {
    return this.queryBus.execute(new GetAllPetsRawSqlQuery());
  }

  @Delete(':id')
  async softDeletePet(@Param('id') id: number) {
    return await this.commandBus.execute(new SoftDeletePetCommand(id));
  }

  @Patch(':id')
  async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return await this.commandBus.execute(
      new UpdatePetCommand(id, updatePetDto),
    );
  }
}
