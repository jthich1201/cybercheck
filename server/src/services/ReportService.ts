import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';



  export const createReport = (name: string, incidentType: string ) => {
    const id = uuidv4();
    const result = incidentResponseDbPool.query("INSERT INTO reports (name, incidentType, id) VALUES ($1, $2, $3) RETURNING *",
     [name, incidentType, id]);
    return result;
  };

  export const getReports = async(userId: any ) => {
    const result = await(incidentResponseDbPool.query("Select report_id, title from reports where report_id in (Select report_id from report_members where user_id = $1)",
      [userId]));
    return result.rows;
  };

  
    //  export const saveChanges = (name: string, incidentType: string, comment: string, description: string ) => {
    //   const id = uuidv4();
    //   const result = incidentResponseDbPool.query("INSERT INTO reports (name, incidentType, id, comment, description) VALUES ($1, $2, $3) RETURNING *",
    //    [name, incidentType, id, comment, description]);
    //   return result;
    //    };
