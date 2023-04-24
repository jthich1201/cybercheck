import { platform } from "os";
import { userService } from "../services/index";



export const GetAllUsers = async (req: any, res: any) => {
    const userList = await userService.getUsers();
    return res.status(200).json(userList);
}
export const SaveUsers = async (req: any, res: any) => {
    const { name, email, role, platform, platformId } = req.body;
    const result = await userService.SaveUserData(name, email, role, platform, platformId);
    console.log(result);
    if (result.userExists == 'true') {
        res.status(200).json(result);
    } else res.status(201).json(result);

}




