import { QueryResult } from "pg";
import  pool  from '../config/dbConfigTest';

export const addComment = async (comment_id: string, comment: string, user_id: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const timestamp = new Date().getTime() / 1000;
    const insertCommentQuery = `INSERT INTO comments (comment_id, content, user_id, date_time) VALUES ($1,$2,$3,$4) RETURNING *`;
    const insertCommentResult: QueryResult = await client.query(insertCommentQuery, [comment_id, comment, user_id, timestamp]);
    await client.query("COMMIT");
    return insertCommentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};