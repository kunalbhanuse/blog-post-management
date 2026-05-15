import express from "express";
import blogRouter from "./module/blog/blog.route.js";

const app = express();
app.use(express.json());
app.use("/api", blogRouter);

app.get("/health", (req, res) => {
  res.json({ health: "ok" });
});

export default app;
