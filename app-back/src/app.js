import express from "express";
import cors from "cors";
import router from "./router.js";
import "./database/db.js";

const app = express();

app.use(express.json());
app.use(cors("*"));

app.use("/backoffice", router.adminRouter);
app.use("/api", router.publicRouter);

app.use((err, _req, res, next) => {
  if (err.name === "UnauthorizedError")
    return res.status(401).json({
      message: "Not Authorized!",
    });

  return next(err);
});

export default app;
