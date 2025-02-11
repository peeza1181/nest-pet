import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SoftDeleteCategoryCommand } from './soft-delete-category.command';
import { DataSource } from 'typeorm';
import { StatusEnum } from 'src/libs/enums/status.enum';

@CommandHandler(SoftDeleteCategoryCommand)
export class SoftDeleteCategoryHandler
  implements ICommandHandler<SoftDeleteCategoryCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: SoftDeleteCategoryCommand): Promise<void> {
    const { id } = command;

    await this.dataSource
      .createQueryBuilder()
      .update('category_entity')
      .set({
        status: StatusEnum.DELETED,
        deletedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('id = :id', { id })
      .andWhere('status = :status', { status: StatusEnum.ACTIVE })
      .execute();
  }
}
