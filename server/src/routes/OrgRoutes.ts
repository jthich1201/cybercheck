import Router from 'express-promise-router';
const router = Router();

import { OrgController } from "../controllers";

router.post("/createGroup", OrgController.createGroup);
router.post("/createOrg", OrgController.createOrg);
router.get("/orgs", OrgController.getOrgs);
router.get("/groups", OrgController.getGroups);
router.delete("/deleteGroup/:groupId", OrgController.deleteGroup);
router.post("/addGroupUser", OrgController.addGroupUser);
router.delete("/deleteGroupUser/:groupId/:userId", OrgController.removeGroupUser);

module.exports = router;