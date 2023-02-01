import { Sequelize } from "sequelize";
import config from "../config.js";
import { isDeveloperMode } from "../lib/mode.js";

const sequelize = new Sequelize({
  database: config.database.dbname,
  host: config.database.host,
  username: config.database.user,
  password: config.database.password,
  port: config.database.port,
  dialect: "postgres",
  dialectOptions: {
    ssl: isDeveloperMode
      ? false
      : {
          require: true,
          rejectUnauthorized: false,
        },
  },
});

sequelize.sync({});

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
