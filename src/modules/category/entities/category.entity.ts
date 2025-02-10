import { BaseEntity } from 'src/libs/db/base.entity';
import { PetEntity } from 'src/modules/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category_entity')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => PetEntity, (pet) => pet.category)
  pets: PetEntity[];
}
