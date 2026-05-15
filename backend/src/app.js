import express from "express";
import blogRouter from "./module/blog/blog.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", blogRouter);

app.get("/health", (req, res) => {
  res.json({ health: "ok" });
});

export default app;
