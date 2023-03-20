import { saveDescription } from "../services/descriptionService";
import { Request, Response } from "express";

export const addDescriptionController = async (req: Request, res: Response) => {
    const { description, user_id } = req.body;
    try {
      const descriptions = await saveDescription(description, user_id);
      res.status(201).json(descriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving description" });
    }
  }