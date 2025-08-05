import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import config from '../config/config.js' 
import env from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envName = env.NODE_ENV || 'development';
const envConfig = config[envName];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: '5432',
    dialect: envConfig.dialect,
    logging: false,
  }
);

export default sequelize;
