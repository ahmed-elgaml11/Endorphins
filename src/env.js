import z from 'zod'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '..', 'config.env')})

const envSchema = z.object({
  PORT: z.string().min(1, "PORT is required"),
  DB_USERNAME: z.string().min(1, "DB username is required"),
  DB_PASSWORD: z.string().min(1, "DB password is required"),
  DATABASE: z.string().min(1, "DB name is required"),
  HOST: z.string().min(1, "DB host is required"),
  DIALECT: z.string().min(1, "DIALECT is required"),
  SESSION_SECRET: z.string()
});
export default envSchema.parse(process.env);
