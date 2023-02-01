import User from "../models/user.js";
import { generateAccessToken } from "../lib/jwt-token.js";

export async function auth({ password, email }) {
  if (!password || !email)
    return {
      success: false,
      error: "The fields password and email is required!",
      status: 400,
    };

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user?.id || !(await user.validPassword(password)))
    return {
      success: false,
      error: "Invalid Credentials!",
      status: 400,
    };

  return {
    success: true,
    token: generateAccessToken(user),
    status: 200,
  };
}
