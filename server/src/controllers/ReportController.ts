import { reportService } from "../services/index";



export const createReport = async (req: any, res : any) => {
    const {name, incidentType} = req.body;
    const result = await reportService.createReport(name, incidentType);
    res.send(201).json(result);
}

export const getReports = async (req: any, res:any) => {
    console.log(req.params);
    const {userId} = req.params;
    const reportsList = await reportService.getReports(userId);
    console.log(reportsList)
    return res.json(reportsList)
}