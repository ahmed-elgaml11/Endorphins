import app from "./app.js";
import db from '../models/index.js';
import env from './env.js'
const { sequelize } = db;


const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(env.PORT, () => {
      console.log(`Listening on ${env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
startApp();

process.on("unhandledRejection", (err) => {
  // asynchrounous code which not handled
  console.log("unhandled Rejection");
  console.log(err);
  process.exit(1);
});
