import * as authService from "../services/authService.js";

export async function auth(req, res) {
  try {
    const { success, error, token, status } = await authService.auth(req.body);
    return res.status(status).json({
      success,
      error,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!", error });
  }
}
