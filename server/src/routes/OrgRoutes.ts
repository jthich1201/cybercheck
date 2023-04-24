import Router from 'express-promise-router';
const router = Router();

const { OrgCotnroller } = require("../controllers");

router.post("/createGroup", OrgCotnroller.createGroup);
router.post("/createOrg", OrgCotnroller.createOrg);
router.get("/orgs", OrgCotnroller.getOrgs);
router.get("/groups", OrgCotnroller.getGroups);
router.delete("/deleteGroup/:groupId", OrgCotnroller.deleteGroup);
router.post("/addGroupUser", OrgCotnroller.addGroupUser);
router.delete("/deleteGroupUser/:groupId/:userId", OrgCotnroller.deleteGroupUser);

module.exports = router;