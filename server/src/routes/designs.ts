import express, { Request, Response } from "express";
import Design from "../models/Design";

const router = express.Router();

// GET /api/designs
router.get("/", async (req: Request, res: Response) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({
      message: "Error fetching designs",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// POST /api/designs
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, tailwindClasses, content, userId } = req.body;
    const newDesign = new Design({ title, tailwindClasses, content, userId });
    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ message: "Error saving design" });
  }
});

// PUT /api/designs/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { title, tailwindClasses, content } = req.body;
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      { title, tailwindClasses, content },
      { new: true }
    );
    if (!updatedDesign) {
      res.status(404).json({ message: "Design not found" });
      return;
    }
    res.json(updatedDesign);
  } catch (error) {
    res.status(500).json({ message: "Error updating design" });
  }
});

// DELETE /api/designs/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedDesign = await Design.findByIdAndDelete(req.params.id);
    if (!deletedDesign) {
      res.status(404).json({ message: "Design not found" });
      return;
    }
    res.json({ message: "Design deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting design" });
  }
});

export default router;
