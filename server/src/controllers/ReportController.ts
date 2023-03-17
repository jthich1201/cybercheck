import { reportService } from "../services/index";



export const createReport = async (req: any, res : any) => {
    const {name, incidentType} = req.body;
    const result = await reportService.createReport(name, incidentType);
    res.send(201).json(result);
}