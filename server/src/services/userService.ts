import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';

const userData = require("../models/UserData");


export const ReturnUserList = () => {
  return userData;
};

export const SaveUserData = (name: string, email: string, role: string) => {
  const id = uuidv4();
  const result = incidentResponseDbPool.query("INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
    [name, email, role]);
  return result;
};

