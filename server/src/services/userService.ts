import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

const userData = require("../models/UserData");


export const ReturnUserList = () => {
  try {
    const result = incidentResponseDbPool.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user list");
  }
};

export const SaveUserData = async (name: string, email: string, role: string, platform: string, platformId: string) => {
  try {
    const check = await checkUser(email);
    console.log(check);
    if (check) {
      const data = await getUser(email);
      console.log(data);
      const result = {
        ...data,
        userExists: 'true'
      }
      return result;
    }
    const id = uuidv4();
    const created = new Date();
    const data = await incidentResponseDbPool.query("INSERT INTO users (user_id, name, email, role, platform, platform_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, name, email, role, platform, platformId, created, created]);
    console.log(data)
    const result = {
      ...data,
      userExists: 'false'
    }
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

const getUser = async (email: string) => {
  const result = await incidentResponseDbPool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length != 0) {
    return result.rows[0];
  }
}

export const getUsers = async () => {
  const result = await incidentResponseDbPool.query("SELECT * FROM users");
  return result.rows;
}