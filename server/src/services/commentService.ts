import { addComment } from "../db/commentQueries";

export const saveComment = async (taskId: number, commentText: string) => {
  try {
    const comment = await addComment(taskId, commentText);
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving comment");
  }
};
