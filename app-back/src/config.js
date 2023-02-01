import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production")
  dotenv.config({
    path: path.resolve("src", ".env.dev"),
  });

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRE,
  },
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dbname: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
