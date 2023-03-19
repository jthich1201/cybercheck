
import { platform } from "os";
import { userService } from "../services/index";



export const GetAllUsers = (req: any, res : any) => {
    const userList = userService.ReturnUserList();
    return res.json(userList);
}
export const SaveUsers = async (req: any, res: any) => {
    const { userId, name, email, role, platform, platformId } = req.body;
    const result = await userService.SaveUserData(userId, name, email, role, platform, platformId);
    res.sendStatus(201).json(result);
}




