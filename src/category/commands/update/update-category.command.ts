import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

export class UpdateCategoryCommand {
  constructor(
    public readonly id: number,
    public readonly updateCategoryDto: UpdateCategoryDto,
  ) {}
}
