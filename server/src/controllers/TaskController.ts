import { taskService } from "../services/index";

export const createTask = async (req: any, res : any) => {
    const {title, report_id} = req.body;
    const result = await taskService.createTask(title, report_id);
    res.send(201).json(result);
}

export const getTask = async(req: any, res: any) => {
    return res.json({data: "hello"})
}


