import { expressjwt } from "express-jwt";
import config from "../config.js";

export default () =>
  expressjwt({
    secret: config.jwt.secret,
    algorithms: ["HS256"],
  });
