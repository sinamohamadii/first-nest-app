import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity/flavor.entity';

@Entity()
export class Coffees {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  brand!: string;

  @Column({ default: 0 })
  recommendations!: number;

  // create a many-to-many relationship between Coffees and Flavor entities. each coffee can have multiple flavors, and each flavor can be associated with multiple coffees.
  @JoinTable()
  // Cascade; When I save this entity, also save the related entities if needed
  // ✅ Use cascade when the child entity is owned by the parent.
  // someone edits a coffee and accidentally changes:Vanilla to Banana With cascade, you've just changed the shared Vanilla flavor for every coffee that references it.
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors!: Flavor[];
}
