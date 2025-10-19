// Importation des modules nécessaires de NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// Définir une interface pour représenter une tâche
export interface Task {
  id: number;
  name: string;
  description: string;
  is_done: boolean;
}

// Ce fichier contient le service pour les tâches.
// Il gère la logique métier et les données en mémoire.
@Injectable()
export class TasksService {
  // Stockage temporaire des tâches en mémoire
  private tasks: Task[] = [];
  private nextId = 1;

  // Méthode pour créer une nouvelle tâche
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      ...createTaskDto,
      is_done: false, // Par défaut, une nouvelle tâche n'est pas terminée
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // Méthode pour récupérer toutes les tâches
  findAll(): Task[] {
    return this.tasks;
  }

  // Méthode pour récupérer une tâche spécifique par son ID
  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    return task;
  }

  // Méthode pour mettre à jour une tâche existante
  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto); // Met à jour les propriétés de la tâche
    return task;
  }

  // Méthode pour supprimer une tâche par son ID
  remove(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    this.tasks.splice(index, 1); // Supprime la tâche du tableau
  }
}
