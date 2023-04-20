import { log } from 'console';
import pool from '../db/incidentResponseDb';

export const setTaskCompletedQuery = async (task_id: string, completed: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const updateTaskQuery = `UPDATE tasks SET completed = $1 WHERE task_id = $2 RETURNING *`;
    const updateTaskResult = await client.query(updateTaskQuery, [completed, task_id]);
    await client.query('COMMIT');
    return updateTaskResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};




export const getTaskQuery = async (report_id: string) => {
  try {
    const client = await pool.connect();
    console.log('report_id: ', report_id);
    const getTaskResult = await client.query({
      text: 'SELECT task_id, title, task_description, assignee, created_at, updated_at, report, completed FROM tasks WHERE report = $1;',
      values: [report_id],
    });
    client.release();
    console.log(getTaskResult.rows);
    return getTaskResult.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};