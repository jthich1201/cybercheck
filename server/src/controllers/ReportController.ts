import { reportService } from "../services/index";



export const createReport = async (req: any, res: any) => {
    const { title, creator, type, status, orgId, groupId } = req.body;
    console.log(req.body);
    const result = await reportService.createReport(title, creator, type, status, orgId, groupId);
    res.status(201).json(result);
}

export const getReports = async (req: any, res: any) => {
    console.log(req.params);
    const { userId } = req.params;
    const reportsList = await reportService.getReports(userId);
    console.log(reportsList)
    return res.json(reportsList)
}

// export const saveChanges = async (req: any, res : any) => {
//     const {name, incidentType, comment, description} = req.body;
//     const result = await reportService.saveChanges(name, incidentType, comment, description);
//     res.send(201).json(result);
// }

