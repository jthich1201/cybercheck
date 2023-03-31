import { Request, Response } from 'express';
import { PromptService } from '../services';


export const createPrePrompt = async (req: Request, res: Response) => {
    const { question } = req.body;
    console.log(question);
    const result = await PromptService.createPrePrompt(question);
    res.status(201).json(result);
}

export const getPrePrompts = async (req: Request, res: Response) => {
    const result = await PromptService.getPrePrompts();
    res.status(200).json(result);
}

export const createPrePromptOptions = async (req: Request, res: Response) => {
    const { option_text, prePromptId } = req.body;
    const result = await PromptService.createPrePromptOptions(option_text, prePromptId);
    res.status(201).json(result);
}

export const getPrePromptOptions = async (req: Request, res: Response) => {
    const { prePromptId } = req.params;
    const result = await PromptService.getPrePromptOptions(prePromptId);
    res.status(200).json(result);
}

export const createIncidentResponse = async (req: Request, res: Response) => {
    const { incidentType, incidentDetails } = req.body;
    const result = await PromptService.createIncidentResponse(incidentType, incidentDetails);
    res.status(201).json(result);
}

export const getIncidentResponse = async (req: Request, res: Response) => {
    const result = await PromptService.getIncidentResponses();
    res.status(200).json(result);
}

export const createPrompt = async (req: Request, res: Response) => {
    const { severity, title, description, incidentResponseId } = req.body;
    const result = await PromptService.createPrompt(severity, title, description, incidentResponseId);
    res.status(201).json(result);
}

export const getPrompts = async (req: Request, res: Response) => {
    const { incidentResponseId } = req.params;
    const result = await PromptService.getPrompts(incidentResponseId);
    res.status(200).json(result);
}


