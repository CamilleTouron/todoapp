import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

// Ce fichier définit l'entité Task pour TypeORM.
// Il représente une tâche dans la base de données.
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  is_done: boolean;
}