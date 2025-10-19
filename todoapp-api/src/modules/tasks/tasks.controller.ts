import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

// Ce fichier contient le contrôleur pour les tâches.
// Il gère les requêtes HTTP et appelle les services appropriés pour traiter les données.

// Définir un groupe de routes pour les tâches avec Swagger
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Endpoint pour créer une nouvelle tâche
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // Appelle le service pour créer une tâche
    return this.tasksService.create(createTaskDto);
  }

  // Endpoint pour récupérer toutes les tâches
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  @Get()
  findAll() {
    // Appelle le service pour obtenir toutes les tâches
    return this.tasksService.findAll();
  }

  // Endpoint pour récupérer une tâche par son ID
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Appelle le service pour obtenir une tâche spécifique
    return this.tasksService.findOne(+id);
  }

  // Endpoint pour mettre à jour une tâche par son ID
  @ApiOperation({ summary: 'Mettre à jour une tâche par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche' })
  @ApiBody({ type: UpdateTaskDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    // Appelle le service pour mettre à jour une tâche
    return this.tasksService.update(+id, updateTaskDto);
  }

  // Endpoint pour supprimer une tâche par son ID
  @ApiOperation({ summary: 'Supprimer une tâche par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    // Appelle le service pour supprimer une tâche
    return this.tasksService.remove(+id);
  }
}
