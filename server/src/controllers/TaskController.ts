import { taskService } from "../services/index";

export const createTask = async (req: any, res: any) => {
    const { title, reportId, taskDescription } = req.body;
    const result = await taskService.createTask(title, reportId, taskDescription);
    res.status(201).json(result);
}

export const getTask = async (req: any, res: any) => {
    try {
      const { report_id } = req.params;
      if (!report_id) {
        res.status(400).json({ message: "Missing report_id parameter" });
        return;
      }
      const result = await taskService.getTask(report_id);
      if (!result) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const setTaskCompleted = async (req: any, res: any) => {
    const { task_id, completed } = req.body;
    const result = await taskService.setTaskCompleted(task_id, completed);
    res.status(200).json(result);
  }


