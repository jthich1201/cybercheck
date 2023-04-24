import { orgService } from '../services'
import { Request, Response } from "express";

export const createGroup = async (req: Request, res: Response) => {
    const { groupName, orgId } = req.body;
    try {
        const groups = await orgService.createGroup(groupName, orgId);
        res.status(201).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Creating group" });
    }
}

export const createOrg = async (req: Request, res: Response) => {
    const { orgName } = req.body;
    try {
        const orgs = await orgService.createOrg(orgName);
        res.status(201).json(orgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Creating Org" });
    }
}

export const getOrgs = async (req: Request, res: Response) => {
    try {
        const orgs = await orgService.getOrgs();
        res.status(200).json(orgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting Orgs" });
    }
}

export const getGroups = async (req: Request, res: Response) => {
    const { orgId } = req.params;
    try {
        const groups = await orgService.getGroups(orgId);
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting Groups" });
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    try {
        const groups = await orgService.deleteGroup(groupId);
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting Group" });
    }
}

export const addGroupUser = async (req: Request, res: Response) => {
    const { groupId, userId } = req.body;
    try {
        const groups = await orgService.addGroupUser(groupId, userId);
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding user to group" });
    }
}

export const removeGroupUser = async (req: Request, res: Response) => {
    const { groupId, userId } = req.body;
    try {
        const groups = await orgService.removeGroupUser(groupId, userId);
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error removing user from group" });
    }
}