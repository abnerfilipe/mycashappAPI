export default {
  "type": "postgres",
  "host": process.env.POSTGRES_HOST,
  "port": process.env.POSTGRES_PORT,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "schema": process.env.POSTGRES_SCHEMA,
  "timezone": 'America/Sao_Paulo',
  "ssl": {
    "rejectUnauthorized": false
  },
  "migrations": [
    "./src/shared/database/migrations/*.ts"
  ],
  "cli": {
      "migrationsDir": "./src/shared/database/migrations"
  },
  "entities": [
    "./src/modules/**/typeorm/entities/*.ts"
  ]
};
