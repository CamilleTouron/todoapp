import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Ce fichier définit l'entité Task pour TypeORM.
// Il représente une tâche dans la base de données.
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;
}