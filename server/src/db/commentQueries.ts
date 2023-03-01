import { QueryResult } from "pg";
import  pool  from '../config/dbConfigTest';

export const addComment = async (comment_id: string, task_id: string, comment: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertCommentQuery = `INSERT INTO comments (comment_id, task_id, comment) VALUES ($1,$2,$3) RETURNING *`;
    const insertCommentResult: QueryResult = await client.query(insertCommentQuery, [comment_id, task_id, comment]);
    await client.query("COMMIT");
    return insertCommentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};