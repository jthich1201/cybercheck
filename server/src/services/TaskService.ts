import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';

  export const createTask = (title: string, report_id: string ) => {
    const id = uuidv4();
    const timestamp = new Date();
    const result = incidentResponseDbPool.query("INSERT INTO tasks (task_id, title, created_at, updated_at, report, completed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
     [id, title, timestamp, timestamp, report_id, false]);
    return result;
  };
  