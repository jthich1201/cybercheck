import { QueryResult } from "pg";
import  pool  from '../config/dbConfigTest';

export const addComment = async (taskId: number, commentText: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertCommentQuery = `INSERT INTO comments (task_id, comment_text) VALUES ($1, $2) RETURNING *`;
    const insertCommentResult: QueryResult = await client.query(insertCommentQuery, [taskId, commentText]);
    await client.query("COMMIT");
    return insertCommentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};