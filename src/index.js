import app from "./app.js";
import db from '../models/index.js';
import env from './env.js'
const { sequelize, Product, Category } = db;


const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(env.PORT, async() => {
      console.log(`Listening on ${env.PORT}`);
      // await sequelize.sync();
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
