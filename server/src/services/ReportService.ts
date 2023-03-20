import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4 } from 'uuid';



  export const createReport = (name: string, incidentType: string ) => {
    const id = uuidv4();
    const result = incidentResponseDbPool.query("INSERT INTO reports (name, incidentType, id) VALUES ($1, $2, $3) RETURNING *",
     [name, incidentType, id]);
    return result;
     };
    //  export const saveChanges = (name: string, incidentType: string, comment: string, description: string ) => {
    //   const id = uuidv4();
    //   const result = incidentResponseDbPool.query("INSERT INTO reports (name, incidentType, id, comment, description) VALUES ($1, $2, $3) RETURNING *",
    //    [name, incidentType, id, comment, description]);
    //   return result;
    //    };
