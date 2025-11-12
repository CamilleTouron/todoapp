// Importation des modules nécessaires de NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task as TaskEntity } from './entities/task.entity';

// Définir un type pour représenter une tâche au format API
export type ApiTask = {
  id: number;
  name: string;
  description?: string;
  is_done: boolean;
};

// Ce fichier contient le service pour les tâches.
// Il gère la logique métier et les données en mémoire.
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
  ) {}

  // Méthode pour créer une nouvelle tâche
  async create(createTaskDto: CreateTaskDto): Promise<ApiTask> {
    const entity = this.repository.create({
      title: createTaskDto.name,
      description: createTaskDto.description,
      completed: false,
    });
    const saved = await this.repository.save(entity);
    return this.toApiTask(saved);
  }

  // Nouvelle méthode pour récupérer les tâches avec pagination
  async findAllPaginated(
    page = 1,
    perPage = 3,
  ): Promise<{ items: ApiTask[]; total: number; page: number; perPage: number }> {
    const [entities, total] = await this.repository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const items = entities.map((e) => this.toApiTask(e));
    return { items, total, page, perPage };
  }

  // Méthode pour récupérer une tâche spécifique par son ID
  async findOne(id: number): Promise<ApiTask> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    return this.toApiTask(entity);
  }

  // Méthode pour mettre à jour une tâche existante
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<ApiTask> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    if (updateTaskDto.name !== undefined) entity.title = updateTaskDto.name;
    if (updateTaskDto.description !== undefined) entity.description = updateTaskDto.description;
    // Si le DTO avait des champs completed/is_done, nous pourrions les mapper ; le DTO actuel ne les inclut pas
    const saved = await this.repository.save(entity);
    return this.toApiTask(saved);
  }

  // Méthode pour supprimer une tâche par son ID
  async remove(id: number): Promise<void> {
    const res = await this.repository.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
  }

  // Méthode privée pour mapper une entité TaskEntity vers le format ApiTask
  private toApiTask(entity: TaskEntity): ApiTask {
    return {
      id: entity.id,
      name: entity.title,
      description: entity.description,
      is_done: !!entity.completed,
    };
  }
}
