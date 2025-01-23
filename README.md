## ORDERS MICROSERVICE


# Dev 
1. Ejecutar `npm install` para instalar todas las dependencias.
2. Crear un archivo `.env.development` basado en el `.env.example`.
3. Ejecutar el comando `npx prisma init`, esto inicializa prisma.
4. Asegurate de tener una base de datos de `Docker` corriendo. Tambien puedes usar `SQLite` en un archivo local.
5. Ejecutar el comando `npm run prisma:migrate:dev` esto es un script que hace la migracion de la base de datos y le dice a prisma que elija la variable de entorno `.env.development`, de desarrollo.
6. Ejecutar el comando `npm run start:dev` para iniciar el servidor de desarrollo.
