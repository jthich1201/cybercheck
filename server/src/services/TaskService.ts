import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';
import { getTaskQuery, setTaskCompletedQuery } from "../db/taskQueries";

export const createTask = async (title: string, report_id: string, taskDescription: string) => {
  const id = uuidv4();
  const timestamp = new Date();
  const result = await incidentResponseDbPool.query("INSERT INTO tasks (task_id, title, task_description, created_at, updated_at, report, completed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, title, taskDescription, timestamp, timestamp, report_id, false]);
  return result.rows;
  
};

export const getTask = async (report_id: string ) => {
  try {
    const task = await getTaskQuery(report_id);
    return task;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting Task");
  }
};

export const setTaskCompleted = async (task_id: string, completed: string) => {
  try {
    const task = await setTaskCompletedQuery(task_id, completed);
    return task;
  } catch (error) {
    console.error(error);
    throw new Error("Error setting Task completed");
  }
};
