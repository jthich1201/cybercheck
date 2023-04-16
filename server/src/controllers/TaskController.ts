import { taskService } from "../services/index";

export const createTask = async (req: any, res: any) => {
    const { title, reportId, taskDescription } = req.body;
    const result = await taskService.createTask(title, reportId, taskDescription);
    res.status(201).json(result);
}

export const getTask = async (req: any, res: any) => {
    return res.json({ data: "hello" })
}


