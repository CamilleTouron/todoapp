# TodoApp

## Description
Le projet TodoApp est une application complète composée d'un backend (API) construit avec le framework NestJS et d'un frontend généré avec Loveable. Cette application permet de gérer des tâches via une interface utilisateur moderne et des endpoints RESTful.

## Prérequis
Avant de commencer, assurez-vous d'avoir les technologies suivantes installées sur votre machine :

- Node.js (version 18 ou supérieure)
- npm (généralement inclus avec Node.js)
- SQLite (pour la base de données)

## Installation

### Backend (API)

1. Accédez au répertoire de l'API :
   ```bash
   cd todoapp-api
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez la base de données SQLite :
   - Assurez-vous que le fichier `todoapp.db` est créé dans le répertoire racine de l'API.
   - Si ce n'est pas le cas, exécutez la commande suivante pour initialiser la base de données :
     ```bash
     touch todoapp.db
     ```

4. Lancez l'application :
   ```bash
   npm run start:dev
   ```

5. L'API sera disponible à l'adresse suivante :
   [http://localhost:3000](http://localhost:3000)

### Frontend (UI)

1. Accédez au répertoire du frontend :
   ```bash
   cd todoapp-ui
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez l'application :
   ```bash
   npm run dev
   ```

4. L'interface utilisateur sera disponible à l'adresse suivante :
   [http://localhost:8080](http://localhost:8080)

## Documentation Swagger

Une documentation interactive pour l'API est disponible à l'adresse suivante :
[http://localhost:3000/doc](http://localhost:3000/doc)

## Fonctionnalités principales

- **Backend** :
  - Création, lecture, mise à jour et suppression de tâches (CRUD)
  - Gestion des erreurs avec des filtres d'exceptions
  - Validation des données avec `class-validator`
  - Versionnage de l'API
  - Endpoint de vérification de la santé (`/health`)

- **Frontend** :
  - Interface utilisateur moderne et réactive
  - Formulaires pour ajouter et modifier des tâches
  - Affichage des tâches avec pagination

## Contribution

1. Forkez le projet.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b ma-nouvelle-fonctionnalite
   ```
3. Faites vos modifications et committez-les :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin ma-nouvelle-fonctionnalite
   ```
5. Ouvrez une Pull Request.

## Licence
Ce projet est sous licence MIT.