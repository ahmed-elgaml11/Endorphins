
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import configFile from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

// dynamically import models
const files = fs.readdirSync(__dirname).filter(file =>
  file !== basename &&
  file.startsWith('.') === false &&
  file.endsWith('.js') &&
  !file.endsWith('.test.js')
);

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const module = await import(pathToFileURL(filePath).href);
  const defineModel = module.default;
  const model = defineModel(sequelize, DataTypes);
  db[model.name] = model;
}

// setup associations
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
