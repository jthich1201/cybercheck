import incidentResponseDbPool from "./incidentResponseDb";



export const userTable =async () => {
    const result = await incidentResponseDbPool.query(`CREATE TABLE IF NOT EXISTS users (
id uuid,
name varchar(65535),
email varchar(65535),
platform varchar(100),
platform_id uuid,
role varchar(100),
created_at timestamp,
updated_at timestamp)`)
return result
}