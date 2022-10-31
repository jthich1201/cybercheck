const { ReturnUserList } = require("../services/UserTable");


const GetAllUsers = (req: any, res : any) => {
    const userList = ReturnUserList();
    return res.json(userList);
}

export {
    GetAllUsers
  };


