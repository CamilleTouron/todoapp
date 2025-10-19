import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// Ce fichier définit le DTO pour la mise à jour d'une tâche.
// Il hérite des validations du DTO de création.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
