import { addComment } from "../db/commentQueries";
import { v4 as uuidv4 } from 'uuid';

export const saveComment = async (comment: string, user_id: string) => {
  try {
    const id = uuidv4();
    //const task_id = "1";
    const comments = await addComment(id, comment, user_id);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving comment");
  }
};
