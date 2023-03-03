import { reportService } from "../services/Index";



export const createReport = async (req: any, res : any) => {
    const {name, incidentType} = req.body;
    const result = await reportService.createReport(name, incidentType);
    res.send(201).json(result);
}