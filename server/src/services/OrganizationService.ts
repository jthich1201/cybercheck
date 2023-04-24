import incidentResponseDbPool from "../db/incidentResponseDb";
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

export const createGroup = async (groupName: string, orgId: string) => {
    const id = uuidv4();
    const result = await incidentResponseDbPool.query("INSERT INTO groups (group_id, group_name, org_id) VALUES ($1, $2, $3) RETURNING *",
        [id, groupName, orgId]);
    return result.rows;
}

export const createOrg = async (orgName: string) => {
    const id = uuidv4();
    const result = await incidentResponseDbPool.query("INSERT INTO organizations (org_id, org_name) VALUES ($1, $2) RETURNING *",
        [id, orgName]);
    return result.rows;
}

export const getOrgs = async () => {
    const result = await incidentResponseDbPool.query("SELECT * FROM organizations");
    return result.rows;
}

export const getGroups = async (orgId: string) => {
    const result = await incidentResponseDbPool.query("SELECT * FROM groups WHERE org_id = $1", [orgId]);
    return result.rows;
}

export const deleteGroup = async (groupId: string) => {
    const result = await incidentResponseDbPool.query("DELETE FROM groups WHERE group_id = $1", [groupId]);
    return result.rows;
}

export const addGroupUser = async (userId: string, groupId: string) => {
    const result = await incidentResponseDbPool.query("INSERT INTO group_user (group_id, user_id) VALUES ($1, $2) RETURNING *",
        [groupId, userId]);
    return result.rows;
}

export const removeGroupUser = async (userId: string, groupId: string) => {
    const result = await incidentResponseDbPool.query("DELETE FROM group_user WHERE group_id = $1 AND user_id = $2", [groupId, userId]);
    return result.rows;
}