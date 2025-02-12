import { UpdatePetDto } from '../../dto/update-pet.dto';

export class UpdatePetCommand {
  constructor(
    public readonly id: number,
    public readonly updatePetDto: UpdatePetDto,
  ) {}
}
