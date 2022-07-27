import { Sequelize } from "sequelize";
import config from "../config.js";

// const URI = `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.dbname}`;
const sequelize = new Sequelize({
  database: config.database.dbname,
  host: config.database.host,
  username: config.database.user,
  password: config.database.password,
  port: config.database.port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.sync({
  // force: false,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database");
  }
}

connect();

export const db = sequelize;
