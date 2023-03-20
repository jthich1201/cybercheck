import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

const userData = require("../models/UserData");


export const ReturnUserList = () => {
  return userData;
};

export const SaveUserData = async (id: string, name: string, email: string, role: string, platform: string, platformId: string) => {
  try {
    const check = await checkUser(email);
    console.log(check);
    if (check) return { error: "User already exists" }
    // const id = uuidv4();
    const created = new Date();
    const result = await incidentResponseDbPool.query("INSERT INTO users (user_id, name, email, role, platform, platform_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, name, email, role, platform, platformId, created, created]);
    return result;
  }
  catch (error) {
    console.log(error);
    throw new Error("Error saving comment");
  }
};

const checkUser = async (email: string) => {
  const result = await incidentResponseDbPool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length != 0) {
    return true;
  }
  return false;
}

