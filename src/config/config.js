import env from '../env.js'
const config = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DATABASE,
    host: env.HOST,
    dialect: env.DIALECT,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
};
export default config