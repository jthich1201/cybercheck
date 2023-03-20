import { addDescription } from "../db/descriptionQueries";
import { v4 as uuidv4 } from 'uuid';

export const saveDescription = async (description: string, user_id: string) => {
  try {
    const id = uuidv4();
    // const task_id = uuidv4();
    const descriptions = await addDescription(id, description, user_id);
    return descriptions;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving comment");
  }
};
