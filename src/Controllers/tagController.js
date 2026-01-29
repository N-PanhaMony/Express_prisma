import { prisma } from "../config/prisma.js"

export const getAllTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany( {include:{posts:true}} );
        res.json(tags);
        
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createTag = async (req, res) => {
    const { name } = req.body;

    try {
        const newTag = await prisma.tag.create({
            data: { name },
        });
        res.status(201).json(newTag);
    } catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}