import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';

export const createReport = async (title: string, creator: string, type: string, status: string, orgId: string, groupId: string) => {
  const id = uuidv4();
  const created_at = new Date();
  const result = await incidentResponseDbPool.query("INSERT INTO reports (report_id, title, creator, created_at, type, status, org_id, group_id, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [id, title, creator, created_at, type, status, orgId, groupId, created_at]);
  return result.rows;
};


export const getReports = async (userId: any) => {
  const groupsManaged = await (incidentResponseDbPool.query("select group_id from group_managers where user_id = $1", [userId]));
  console.log("Checking to see group manager status...");
  if (groupsManaged.rows.length >= 1) {
    console.log("user is a group manager")
    const result = await (incidentResponseDbPool.query("select * from reports where group_id in (select group_id from group_managers where user_id = $1)", [userId]));
    return result.rows;
  }
  else {
    const result = await (incidentResponseDbPool.query("Select * from reports where report_id in (Select report_id from report_members where user_id = $1)",
    [userId]));
    return result.rows;
  }
};

export const getSelectedReport = async (reportId: any) => {
  const result = await (incidentResponseDbPool.query("Select * FROM reports where report_id = $1",
    [reportId]));
  return result.rows;
};


    //  export const saveChanges = (name: string, incidentType: string, comment: string, description: string ) => {
    //   const id = uuidv4();
    //   const result = incidentResponseDbPool.query("INSERT INTO reports (name, incidentType, id, comment, description) VALUES ($1, $2, $3) RETURNING *",
    //    [name, incidentType, id, comment, description]);
    //   return result;
    //    };
