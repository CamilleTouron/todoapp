import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Ce fichier contient le contrôleur principal de l'application.
// Il gère les routes générales et les réponses par défaut.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
