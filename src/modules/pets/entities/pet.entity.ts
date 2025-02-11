import { BaseEntity } from 'src/libs/db/base.entity';
import { StatusEnum } from 'src/libs/enums/status.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pet_entity')
export class PetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.pets)
  category: CategoryEntity;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;
}
