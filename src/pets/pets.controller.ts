import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePetDto } from './create-pet-dto';
import { CreatePetCommand } from './commands/create-pet.command';
import { GetAllPetsQuery } from './queries/get-all-pets.query';
import { GetAllPetsPaginationQuery } from './queries/get-all-pets-pagination.Query';
import { GetAllPetsRawSqlQuery } from './queries/get-all-pets-raw-sql.query';
import { ApiQuery } from '@nestjs/swagger';

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

  @Get()
  async getAllPets() {
    return this.queryBus.execute(new GetAllPetsQuery());
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
}
