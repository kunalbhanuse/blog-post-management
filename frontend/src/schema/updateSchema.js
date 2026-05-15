import { z } from "zod";

export const blogUpdateSchema = z.object({
  title: z.string().trim().min(2).max(100).optional(),

  authorName: z.string().trim().min(2).max(100).optional(),

  email: z.string().trim().email().optional(),

  category: z.string().trim().min(2).max(50).optional(),

  tags: z.string().optional(),

  status: z.enum(["Draft", "Published"]).optional(),

  thumbnail: z.string().trim().optional(),

  shortDescription: z.string().trim().min(10).max(300).optional(),

  content: z.string().trim().min(20).optional(),
});
