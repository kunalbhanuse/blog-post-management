import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(2).max(100),

  authorName: z.string().trim().min(2).max(100),

  email: z.string().trim().email(),

  category: z.string().trim().min(2).max(50),

  tags: z.string().optional(),

  status: z.enum(["Draft", "Published"]).default("Draft"),

  thumbnail: z.string().trim().optional(),

  shortDescription: z.string().trim().min(10).max(300),

  content: z.string().trim().min(20),
});
