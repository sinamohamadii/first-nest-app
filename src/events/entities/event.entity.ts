import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// Addin index here like this can get multiple indexes with different columns:
// @Index(["name, "type"])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  // Adding index
  @Index()
  @Column()
  name!: string;

  @Column()
  type!: string;

  // an object that keys are strings and the values can be anything
  @Column('json')
  payload!: Record<string, any>;
}