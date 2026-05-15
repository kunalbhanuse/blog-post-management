import { Router } from "express";
import * as controller from "./blog.controller.js";

const blogRouter = Router();

blogRouter.post("/blog", controller.createBlog);
blogRouter.get("/blog/:id", controller.getBlogById);
blogRouter.delete("/blog/:id", controller.deleteBlog);
blogRouter.put("/blog/:id", controller.updateBlog);

blogRouter.get("/blogs", controller.getAllBlog);
blogRouter.get("/blogs/export/csv", controller.exportBlogsToCSV);

blogRouter.post("/blogs/create-many", controller.createMany);

export default blogRouter;
