import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

// Ce fichier définit le DTO pour la création d'une tâche.
// Il valide les données entrantes pour créer une nouvelle tâche.
export class CreateTaskDto {
  @ApiProperty({ description: 'The name of the task', maxLength: 50 })
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  @MaxLength(50, { message: 'Le nom ne peut dépasser 50 caractères.' })
  name: string;

  @ApiProperty({ description: 'The description of the task', maxLength: 200 })
  @IsString()
  @MaxLength(200, { message: 'La description ne peut dépasser 200 caractères.' })
  description: string;
}
