import './dotenv';

import { DataSource } from 'typeorm';

import { entities } from '../entities';
import { SnakeNamingStrategy } from '../strategies/snake-naming.strategy';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  entities: [...entities],
  subscribers: ['src/subscribers/*.{ts, js}'],
  migrations: ['src/migrations/*.{ts, js}'],
});
