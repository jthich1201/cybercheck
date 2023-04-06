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

export const updatePrePrompt = async (req: Request, res: Response) => {
    const { question, id } = req.body;
    const result = await PromptService.updatePrePrompt(question, id);
    res.status(200).json(result);
}

export const deletePrePrompt = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PromptService.deletePrePrompt(id);
    res.status(200).json(result);
}

export const createPrePromptOptions = async (req: Request, res: Response) => {
    const { option_text, prePromptId, severity } = req.body;
    const result = await PromptService.createPrePromptOptions(option_text, prePromptId, severity);
    res.status(201).json(result);
}

export const getPrePromptOptions = async (req: Request, res: Response) => {
    const { prePromptId } = req.params;
    const result = await PromptService.getPrePromptOptions(prePromptId);
    res.status(200).json(result);
}

export const updatePrePromptOptions = async (req: Request, res: Response) => {
    const { optionId, optionText } = req.body;
    const result = await PromptService.updatePrePromptOptions(optionId, optionText);
    res.status(200).json(result);
}

export const deletePrePromptOptions = async (req: Request, res: Response) => {
    const { optionId } = req.params;
    const result = await PromptService.deletePrePromptOptions(optionId);
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

export const getSeverityLevel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PromptService.getSeverityLevel(id);
    res.status(200).json(result);
}

export const updateSeverityLevel = async (req: Request, res: Response) => {
    const { id, min, max } = req.body;
    const result = await PromptService.updateSeverityLevels(id, min, max);
    res.status(200).json(result);
}



