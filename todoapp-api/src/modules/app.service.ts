import { Injectable } from '@nestjs/common';

// Ce fichier contient le service principal de l'application.
// Il fournit des fonctionnalités de base pour l'application.

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
