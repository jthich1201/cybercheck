import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';

export const createTask = async (title: string, report_id: string, taskDescription: string) => {
  const id = uuidv4();
  const timestamp = new Date();
  const result = await incidentResponseDbPool.query("INSERT INTO tasks (task_id, title, task_description, created_at, updated_at, report, completed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, title, taskDescription, timestamp, timestamp, report_id, false]);
  return result.rows;
};
