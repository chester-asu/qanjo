import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: <string>process.env.POSTGRES_HOST,
  port: <number>(<any>process.env.POSTGRES_PORT),
  username: <string>process.env.POSTGRES_USER,
  password: <string>process.env.POSTGRES_PASSWORD,
  database: <string>process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migration/**/*.ts'],
  subscribers: ['./dist/subscriber/**/*.ts'],
};
