import jwt from "jsonwebtoken";
import config from "../config.js";

export function generateAccessToken({ id, email, userType }) {
  return jwt.sign({ id, email, userType }, config.jwt.secret, {
    expiresIn: config.jwt.expireIn,
  });
}
