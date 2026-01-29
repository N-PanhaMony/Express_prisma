import { prisma } from "../config/prisma.js";

// GET all tags (public)
export const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({ include: { posts: true } });
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST create new tag (requires auth)
export const createTag = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Tag name is required" });

  try {
    const newTag = await prisma.tag.create({
      data: { name },
    });
    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
