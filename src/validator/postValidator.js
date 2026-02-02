import { z } from "zod";

export const createPostSchema = z
  .object({
    title: z.string().trim().min(5).max(100),
    content: z.string().trim().min(20),
    published: z.boolean().optional(),
    tagIds: z.array(z.string().uuid()).default([]),
  })
  .strict();
