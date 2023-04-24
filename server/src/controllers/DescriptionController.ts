import { saveDescription, getDescription } from "../services/descriptionService";
import { Request, Response } from "express";

export const addDescriptionController = async (req: Request, res: Response) => {
    const { description, user_id, task_id } = req.body;
    try {
      const descriptions = await saveDescription(description, user_id, task_id);
      res.status(201).json(descriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving description" });
    }
  }

  export const exportDescriptionController = async (req: Request, res: Response) => {
    const task_id = req.query.task_id as string;
    try {
        const descriptions = await getDescription(task_id);
        res.status(201).json(descriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting description, we are currently in the exportDescription Controller" });
    }
}