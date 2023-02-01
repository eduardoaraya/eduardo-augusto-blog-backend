import Router from "express";
import jwt from "./middlewares/jwt.js";
import * as postController from "./controllers/postController.js";
import * as authController from "./controllers/authController.js";
import * as categoryController from "./controllers/categoryController.js";
// import serviceController from "./controllers/serviceController.js";
// import coreConfigDataController from "./controllers/coreConfigDataController.js";

const adminRouter = Router();
const publicRouter = Router();

// PUBLIC ROUTERS
publicRouter.get("/post/:id", postController.getPublishedById);
publicRouter.get("/post", postController.listPublishedAll);

publicRouter.get(
  "/blog/:categoryId",
  postController.listPublishedAllByCategory
);
publicRouter.get("/blog/post/:url", postController.getPublishedByUrl);
publicRouter.get("/category", categoryController.listActiveAll);
// publicRouter.get("/services", serviceController.listAll);

// ADMIN ROUTERS
adminRouter.post("/login", authController.auth);
adminRouter.post("/post/generate-url", jwt(), postController.generateUrl);
adminRouter.post("/post", jwt(), postController.create);
adminRouter.get("/posts", jwt(), postController.listAll);
adminRouter.get("/post/:id", jwt(), postController.getById);
adminRouter.put("/post/:id", jwt(), postController.update);
adminRouter.delete("/post/:id", jwt(), postController.deletePost);

adminRouter.get("/category", jwt(), categoryController.listAll);
adminRouter.post("/category", jwt(), categoryController.create);
adminRouter.put("/category/:id", jwt(), categoryController.update);
adminRouter.delete("/category/:id", jwt(), categoryController.deleteCategory);
// adminRouter.get("/config", jwt(), coreConfigDataController.getByPath);

export default {
  adminRouter,
  publicRouter,
};
