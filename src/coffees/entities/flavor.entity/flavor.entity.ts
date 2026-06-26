import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffees } from '../coffees.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Coffees, (coffee) => coffee.flavors)
  coffees!: Coffees[];
}
