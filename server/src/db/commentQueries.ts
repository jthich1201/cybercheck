import { QueryResult } from "pg";
import  pool  from '../config/dbConfigTest';

export const addComment = async (comment_id: string, comment: string, user_id: string, task_id: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const timestamp = new Date().toISOString();
    const insertCommentQuery = `INSERT INTO comments (comment_id, content, user_id, date_time, task_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const insertCommentResult: QueryResult = await client.query(insertCommentQuery, [comment_id, comment, user_id, timestamp, task_id]);
    await client.query("COMMIT");
    return insertCommentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};